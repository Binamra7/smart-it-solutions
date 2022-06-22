import React from "react";

export const Gallery = ({ data }) => {
	return (
		<div id="portfolio" className="text-center">
			<div className="container">
				<div className="section-title">
					<h2>Project Gallery</h2>
					<p>Here are few of the projects that we have created.</p>
				</div>
				<div className="row">
					<div className="portfolio-items">
						{data &&
							data.map(({ title, thumb, visit, github }, index) => (
								<div key={index} className="col-sm-6 col-md-4 col-lg-4">
									<div className="portfolio-item">
										<div className="hover-bg">
											<div className="hover-text">
												<a
													href={visit}
													target="_blank"
													rel="noreferrer noopener"
												>
													<h4>Visit</h4>
												</a>
												<a
													href={github}
													target="_blank"
													rel="noreferrer noopener"
												>
													<i
														className="fa fa-github"
														style={{ color: "black", fontSize: "25px" }}
													></i>
													&nbsp;
													<h4>Github</h4>
												</a>
											</div>
											<h3>{title}</h3>
											<img
												src={thumb}
												className="img-responsive"
												alt="Project Title"
											/>{" "}
										</div>
									</div>
								</div>
							))}
					</div>
				</div>
			</div>
		</div>
	);
};
