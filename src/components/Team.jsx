export const Team = (props) => {
	return (
		<div id="team" className="text-center">
			<div className="container">
				<div className="col-md-8 col-md-offset-2 section-title">
					<h2>Meet the Team</h2>
					<p>
						The professional team that is responsible for the development of the
						your project.
					</p>
				</div>
				<div id="row">
					{props.data
						? props.data.map((d, i) => (
								<div
									key={`${d.name}-${i}`}
									className="col-md-3 col-sm-6 team team_mem cursor"
								>
									<div className="thumbnail">
										{" "}
										<img
											src={d.img}
											alt="binamra khadka"
											className="team-img"
										/>
										<div className="caption">
											<h4>{d.name}</h4>
											<p>{d.job}</p>
										</div>
										<hr style={{ position: "relative", top: "50px" }} />
										<div
											id="contact"
											className="team_social social_team"
											style={{ background: "transparent" }}
										>
											<div className="social social_team">
												<ul>
													<li>
														<a
															href={d.facebook}
															target="_blank"
															rel="noreferrer noopener"
														>
															<i className="fa fa-facebook"></i>
														</a>
													</li>
													<li>
														<a
															href={d.linkedin}
															target="_blank"
															rel="noreferrer noopener"
														>
															<i className="fa fa-linkedin"></i>
														</a>
													</li>
													<li>
														<a
															href={d.github}
															target="_blank"
															rel="noreferrer noopener"
														>
															<i className="fa fa-github"></i>
														</a>
													</li>
												</ul>
											</div>
										</div>
									</div>
								</div>
						  ))
						: "loading"}
				</div>
			</div>
		</div>
	);
};
