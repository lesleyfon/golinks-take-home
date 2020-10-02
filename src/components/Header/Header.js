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
	const { organization_name } = useContext(AppContext);

	const [orgDetails, setOrgDetails] = useState({});
	const [err, setErr] = useState({
		message: "",
		isErr: false,
	});
	useEffect(() => {
		(async () => {
			try {
				const data = await fetchOrgDetails(organization_name);

				setErr({
					message: "",
					isErr: false,
				});
				setOrgDetails(data);
			} catch (err) {
				setErr({
					message: err.message,
					isErr: true,
				});
			}
		})();
	}, [organization_name]);
	return (
		<header className="org-header col-lg-4 col-md-12 col-sm-12">
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
				<>{err.isErr ? <h3>{""}</h3> : <h3>Fetching Data For Organisation</h3>}</>
			)}
		</header>
	);
}

export default Header;
