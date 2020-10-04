import React, { useContext } from "react";

import BottomSection from "./BottomSection.js";
import { Link } from "react-router-dom";

import { BiBook } from "react-icons/all";

import { REPO_URL_STORAGE_KEY } from "../../utils/CONSTANTS.js";
import AppContext from "../../context/AppContext.js";

/**
 *
 * @param {object} repoInfo Object contain information about a repository
 * @description Displays information on a about a repository
 * @returns JSX
 */
function OrgRepoCard({ repoInfo }) {
	const { updateRepositoryUrl } = useContext(AppContext);

	const handleClick = () => {
		// Update context store repository_url
		let end_point = repoInfo.repo_url.split("/");

		end_point = `${end_point[end_point.length - 2]}/${end_point[end_point.length - 1]}`;
		updateRepositoryUrl(end_point);

		// Incase user refreshes a page we want to be able to persist the repo_url_endpoint
		// Try using an object so that if we leave a page and TRY TO VISIT THE page with a different url, we get a error { url: "", }
		localStorage.setItem(REPO_URL_STORAGE_KEY, end_point);
	};

	return (
		<div className="col-sm-12 repo-info">
			<div className="card">
				<div className="repo-info-top">
					<h3>
						{/* Wrap this in the link and the text in a span */}
						<BiBook />
						<Link to={`/repo/${repoInfo.name}`} onClick={handleClick}>
							{repoInfo.name}
						</Link>
					</h3>
				</div>

				<p>{repoInfo.description}</p>
				<BottomSection repoInfo={repoInfo} />
			</div>
		</div>
	);
}

export default OrgRepoCard;
