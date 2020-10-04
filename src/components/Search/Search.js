import React, { useState, useContext } from "react";

import { Link, withRouter } from "react-router-dom";
import AppContext from "./../../context/AppContext";

// Icons
import { GoHome, GoSearch } from "react-icons/go";

// Styles
import "./SearchStyles.css";

function Search({ history }) {
	const { updateOrganizationName } = useContext(AppContext);

	const [orgName, setOrgName] = useState("Netflix");

	const handleSubmit = (event) => {
		event.preventDefault();

		if (orgName.length > 0) {
			updateOrganizationName(orgName);
			// Redirect to the home page if we happen to search something and we are not on the home page
			history.push("/");
		}
	};
	return (
		<section className="search-container">
			<div className="nav-home">
				<Link to="/">
					<GoHome size={40} />
				</Link>
			</div>
			<form onSubmit={handleSubmit} className="search-form">
				<input
					type="text"
					placeholder={orgName}
					value={orgName}
					onChange={(e) => setOrgName(e.target.value)}
				/>
				<button className="submit-button" aria-label="Submit Search">
					<GoSearch size={35} color="#878992" />
				</button>
			</form>
		</section>
	);
}

export default withRouter(Search);
