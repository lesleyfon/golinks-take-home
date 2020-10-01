import React from "react";

import BottomSection from "./BottomSection.js";
import { Link } from "react-router-dom";

import { BiBook } from "react-icons/all";

import { REPO_URL_STORAGE_KEY } from "../../utils/CONSTANTS.js";

function OrgRepoCard({ repoInfo, repository_url }) {
	return (
		<div className="col-sm-12 repo-info">
			<div className="card">
				<div className="repo-info-top">
					<h3>
						<BiBook />
						<Link
							to={`/repo/${repoInfo.name}`}
							onClick={() => {
								// Update context store repository_url
								let end_point = repoInfo.repo_url.split("/");

								end_point = `${end_point[end_point.length - 2]}/${
									end_point[end_point.length - 1]
								}`;

								// Incase user refreshes a page we want to be able to persist the repo_url_endpoint
								// Try using an object so that if we leave a page and TRY TO VISIT THE page with a different url, we get a error { url: "", }
								localStorage.setItem(REPO_URL_STORAGE_KEY, end_point);
							}}
						>
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
