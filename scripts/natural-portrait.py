"""Natural upscale for small portraits: keep the photo, add resolution, don't redraw the person.

usage: natural.py <in.png> <out.png> [--stretch-x 1.5] [--crop x,y,size] [--face-mix 0.35] [--esr-mix 0.55] [--size 720]

1. Upscale x4 with Real-ESRGAN, blended with a Lanczos upscale so real texture survives
   (ESRGAN alone smooths skin into a painted look).
2. Restore the face with CodeFormer at maximum fidelity (w=1.0) and blend it in only partly,
   through a soft oval mask, so features stay the person's own.
3. Light unsharp mask, then fine luminance grain so the result reads as a photo.
The background is the real one; nothing is cut out or replaced. Runs on CPU; nothing is uploaded.

Setup (outside the repo):
    uv venv -p 3.12 .venv && uv pip install numpy opencv-python-headless onnxruntime
    models/yunet.onnx           face_detection_yunet_2023mar.onnx from opencv_zoo
    models/codeformer.onnx      github.com/facefusion/facefusion-assets, release models-3.0.0
    models/real_esrgan_x4.onnx  same release

How public/team/*.webp were made (originals are 240x240, in git history under public/img/team/):
    natural-portrait.py 1.png n1.png --crop 4,4,232      (trims a dark edge strip)
    natural-portrait.py 2.png n2.png --crop 4,4,232
    natural-portrait.py 3.png n3.png
    natural-portrait.py 4.png n4.png --stretch-x 1.5 --crop 76,40,200   (the original was squashed 3:2 -> 1:1)
    magick nN.png -quality 84 public/team/N.webp
"""
import argparse, sys
import numpy as np, cv2, onnxruntime as ort

ap = argparse.ArgumentParser()
ap.add_argument('src'); ap.add_argument('out')
ap.add_argument('--models', default='models/')
ap.add_argument('--stretch-x', type=float, default=1.0)
ap.add_argument('--crop', default=None, help='x,y,size square crop in source pixels (after stretch)')
ap.add_argument('--face-mix', type=float, default=0.35)
ap.add_argument('--esr-mix', type=float, default=0.55)
ap.add_argument('--grain', type=float, default=2.2)
ap.add_argument('--size', type=int, default=720)
a = ap.parse_args()
M, CPU = a.models, ['CPUExecutionProvider']
FFHQ_512 = np.array([[0.37691676, 0.46864664], [0.62285697, 0.46912813], [0.50123859, 0.61331904],
                     [0.39308822, 0.72541100], [0.61150205, 0.72490465]], np.float32) * 512

src = cv2.imread(a.src)
if a.stretch_x != 1.0:
    src = cv2.resize(src, (round(src.shape[1] * a.stretch_x), src.shape[0]), interpolation=cv2.INTER_CUBIC)
if a.crop:
    x, y, s = map(int, a.crop.split(','))
    src = src[y:y + s, x:x + s]
h, w = src.shape[:2]

# 1. Upscale: ESRGAN for edges, Lanczos for honest texture.
esr = ort.InferenceSession(M + 'real_esrgan_x4.onnx', providers=CPU)
y4 = esr.run(None, {'input': (src[:, :, ::-1].astype(np.float32) / 255).transpose(2, 0, 1)[None]})[0][0]
esr_up = np.clip(y4, 0, 1).transpose(1, 2, 0)[:, :, ::-1].astype(np.float32)
lan_up = cv2.resize(src, (w * 4, h * 4), interpolation=cv2.INTER_LANCZOS4).astype(np.float32) / 255
up = esr_up * a.esr_mix + lan_up * (1 - a.esr_mix)
H, W = up.shape[:2]
up8 = (up * 255).round().astype(np.uint8)

# 2. Face: CodeFormer at full fidelity, partly blended through a soft oval.
det = cv2.FaceDetectorYN.create(M + 'yunet.onnx', '', (W, H), 0.5, 0.3, 50)
_, faces = det.detect(up8)
if faces is not None and a.face_mix > 0:
    face = max(faces, key=lambda f: f[2] * f[3])
    lm = face[4:14].reshape(5, 2).astype(np.float32)
    aff, _ = cv2.estimateAffinePartial2D(lm, FFHQ_512, method=cv2.LMEDS)
    crop = cv2.warpAffine(up8, aff, (512, 512), borderMode=cv2.BORDER_REPLICATE, flags=cv2.INTER_AREA)
    cf = ort.InferenceSession(M + 'codeformer.onnx', providers=CPU)
    inp = ((crop[:, :, ::-1].astype(np.float32) / 255 - 0.5) / 0.5).transpose(2, 0, 1)[None]
    out = cf.run(None, {'input': inp, 'weight': np.array(1.0, dtype=np.float64)})[0][0]
    restored = ((np.clip(out, -1, 1) + 1) / 2).transpose(1, 2, 0)[:, :, ::-1].astype(np.float32)
    mask = np.zeros((512, 512), np.float32)
    cv2.ellipse(mask, (256, 280), (170, 215), 0, 0, 360, 1, -1)
    mask = cv2.GaussianBlur(mask, (0, 0), 30)
    inv = cv2.invertAffineTransform(aff)
    back = cv2.warpAffine(restored, inv, (W, H), flags=cv2.INTER_CUBIC)
    m = cv2.warpAffine(mask, inv, (W, H))[:, :, None] * a.face_mix
    up = back * m + up * (1 - m)
else:
    print('no face found; upscale only', file=sys.stderr)

# 3. Resize to target, gentle unsharp, fine grain.
img = cv2.resize(up, (a.size, a.size), interpolation=cv2.INTER_AREA)
blur = cv2.GaussianBlur(img, (0, 0), 1.2)
img = np.clip(img + (img - blur) * 0.35, 0, 1)
rng = np.random.default_rng(7)
grain = cv2.GaussianBlur(rng.normal(0, 1, img.shape[:2]).astype(np.float32), (0, 0), 0.6)
img = np.clip(img + grain[:, :, None] * (a.grain / 255), 0, 1)
cv2.imwrite(a.out, (img * 255).round().astype(np.uint8))
print('ok', a.out)
