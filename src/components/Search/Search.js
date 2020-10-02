import React, { useState, useContext } from "react";

import { Link } from "react-router-dom";
import AppContext from "./../../context/AppContext";

// Icons
import { GoHome } from "react-icons/go";

// Styles
import "./SearchStyles.css";

function Search() {
	const { updateOrganizationName } = useContext(AppContext);

	const [orgName, setOrgName] = useState("Netflix");

	return (
		<section className="search-container">
			<form
				onSubmit={(e) => {
					e.preventDefault();

					updateOrganizationName(orgName);
				}}
			>
				<Link to="/">
					<GoHome />
				</Link>
				<input
					type="text"
					placeholder={orgName}
					onChange={(e) => setOrgName(e.target.value)}
				/>
			</form>
		</section>
	);
}

export default Search;
