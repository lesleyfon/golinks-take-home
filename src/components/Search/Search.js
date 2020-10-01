import React, { useState, useContext } from "react";

import { Link } from "react-router-dom";
import AppContext from "./../../context/AppContext";

// Icons
import { GoHome } from "react-icons/go";

function Search() {
	const { updateOrganizationName } = useContext(AppContext);

	const [orgName, setOrgName] = useState("Netflix");

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();

				updateOrganizationName(orgName);
			}}
		>
			<Link to="/">
				<GoHome />
			</Link>
			<input type="text" placeholder={orgName} onChange={(e) => setOrgName(e.target.value)} />
		</form>
	);
}

export default Search;
