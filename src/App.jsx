import { useState, useEffect } from "react";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import { Features } from "./components/features";
import { About } from "./components/about";
import { Services } from "./components/services";
import { Team } from "./components/Team";
import { Gallery } from "./components/gallery";
import { Testimonials } from "./components/testimonials";
import { Contact } from "./components/contact";
import { Footer } from "./components/footer";
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";

export const scroll = new SmoothScroll('a[href*="#"]', {
	speed: 1000,
	speedAsDuration: true,
});

const App = () => {
	const [landingPageData, setLandingPageData] = useState({});
	useEffect(() => {
		setLandingPageData(JsonData);
	}, []);

	return (
		<div>
			<Navigation />
			<Header data={landingPageData.Header} />
			<Features data={landingPageData.Features} />
			<hr />
			<About data={landingPageData.About} />
			<hr />
			<Services data={landingPageData.Services} />
			<hr />
			<Team data={landingPageData.Team} />
			<hr />
			<Gallery data={landingPageData.ProjectGallery} />
			<hr />
			<Testimonials data={landingPageData.Testimonials} />
			<hr />
			<Contact data={landingPageData.Contact} />
			<hr />
			<Footer />
		</div>
	);
};

export default App;
