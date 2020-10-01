import React, { useState, useContext } from "react";
import AppContext from "./../../context/AppContext";

function Search() {
	const { updateRepoUrl } = useContext(AppContext);

	const [orgName, setOrgName] = useState("Netflix");

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();

				updateRepoUrl(orgName);
			}}
		>
			<button></button>
			<input type="text" placeholder={orgName} onChange={(e) => setOrgName(e.target.value)} />
		</form>
	);
}

export default Search;
