import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { BiBook } from "react-icons/all";
// BiGitRepoForked
// Context
import AppContext from "./../../context/AppContext.js";
import { REPO_URL_STORAGE_KEY } from "../../utils/CONSTANTS.js";
import BottomSection from "./BottomSection.js";

function OrgRepoCard({ repoInfo }) {
	const { updateRepoUrl } = useContext(AppContext);

	return (
		<ul className="col-sm-12">
			<Card>
				<li>
					<h3>
						<BiBook />
						<Link
							to={`/repo/${repoInfo.name}`}
							onClick={() => {
								// Update context store repository_url
								updateRepoUrl(repoInfo.repo_url);
								// Incase user refreshes a page we want to be able to persist the repo_url_endpoint
								// Try using an object so that if we leave a page and TRY TO VISIT THE page with a different url, we get a error { url: "", }
								localStorage.setItem(REPO_URL_STORAGE_KEY, repoInfo.repo_url);
							}}
						>
							{repoInfo.name}
						</Link>
					</h3>
				</li>

				<li>{repoInfo.description}</li>
				<BottomSection repoInfo={repoInfo} />
			</Card>
		</ul>
	);
}

export default OrgRepoCard;
