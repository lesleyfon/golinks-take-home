import React, { useEffect, useContext, useState } from "react";
import { fetchOrgDetails } from "../../utils/utilityFunctions";
import AppContext from "../../context/AppContext.js";
import "./HeaderStyle.css";
import { RiGitRepositoryCommitsLine } from "react-icons/ri";

function Header() {
	const { orgName } = useContext(AppContext);

	const [orgDetails, setOrgDetails] = useState({});

	useEffect(() => {
		(async () => {
			try {
				const data = await fetchOrgDetails(orgName);
				setOrgDetails(data);
			} catch (err) {
				console.log(err);
			}
		})();
	}, [orgName]);
	return (
		<header
			style={{
				height: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
			className="col-lg-4 col-md-12 col-sm-12"
		>
			{console.log(orgDetails)}
			{orgDetails.fetchComplete ? (
				<div className="org-details-container">
					<div className="org-avatar">
						<img src={`${orgDetails.avatar_url}`} alt="Thumbnail for an organization" />
					</div>
					<div className="org-details">
						<h3>{orgDetails.name}</h3>
						<h6>{orgDetails.description}</h6>
						<p>{orgDetails.location}</p>
						<span className="repo-count">
							{" "}
							<RiGitRepositoryCommitsLine size={20} />
							{orgDetails.repo_count}
						</span>
						{orgDetails.twitter ? <span>{orgDetails.twitter}</span> : null}
					</div>
				</div>
			) : (
				<h3>Fetching Data For Organisation</h3>
			)}
		</header>
	);
}

export default Header;
