const fs = require("fs-extra");
const { promisify } = require("util");

async function init() {
	await promisify(fs.remove)("./build");
	await promisify(fs.move)("./build", "./build");
}

// init();
