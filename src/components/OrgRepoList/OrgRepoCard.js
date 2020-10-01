import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { BiBook, BiGitRepoForked, FiStar, GoFileCode, MdDateRange } from "react-icons/all";
// BiGitRepoForked
// Context
import AppContext from "./../../context/AppContext.js";
import { REPO_URL_STORAGE_KEY } from "../../utils/CONSTANTS.js";

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
				<div className="bottom-row">
					<li className="language">
						<span>
							{" "}
							<GoFileCode /> {repoInfo.language}
						</span>
					</li>
					<li className="star-count">
						<FiStar /> <span>{repoInfo.star_count}</span>
					</li>
					<li className="fork-count">
						<BiGitRepoForked />
						<span>{repoInfo.fork_count}</span>
					</li>
					<li className="date">
						<MdDateRange />
						<span>{repoInfo.created_at}</span>
					</li>
				</div>
			</Card>
		</ul>
	);
}

export default OrgRepoCard;
