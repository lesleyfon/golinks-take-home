import React, { useEffect, useContext, useState } from "react";

// Utility Functions
import { fetchOrgDetails } from "../../utils/utilityFunctions";

// Context
import AppContext from "../../context/AppContext.js";

// Icons/SVG's
import { RiGitRepositoryCommitsLine } from "react-icons/ri";
import { FaTwitter } from "react-icons/fa";

import "./HeaderStyle.css";

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
		<header className="org-header col-lg-4 col-md-12 col-sm-12">
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
						<div>
							{orgDetails.twitter ? (
								<span>
									<FaTwitter /> {orgDetails.twitter}
								</span>
							) : null}
						</div>
					</div>
				</div>
			) : (
				<h3>Fetching Data For Organisation</h3>
			)}
		</header>
	);
}

export default Header;
