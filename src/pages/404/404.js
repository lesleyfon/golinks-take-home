import React from "react";
import { Link } from "react-router-dom";
import "./404styles.css";

function Page404() {
	return (
		<section className="error-section">
			<div className="error-details">
				<h2>404</h2>
				<h3>Page Not Found</h3>
				<h4>Sorry!</h4>
				<p>The page you are looking for was not found</p>
				<p>
					You may find what you are looking for on the <Link to="/"> homepage</Link>
				</p>
			</div>
			<div className="bg-img"></div>
		</section>
	);
}

export default Page404;
