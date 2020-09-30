import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

// Context
import AppContext from "./../../context/AppContext.js";
import { REPO_URL_STORAGE_KEY } from "../../utils/CONSTANTS.js";

function OrgRepoCard({ repoInfo }) {
	const { updateRepoUrl } = useContext(AppContext);

	return (
		<ul>
			<Card
				style={{
					textAlign: "left",
					paddingLeft: "10px",
					margin: "10px 10px",
					position: "relative",
					display: "flex",
					flexDirection: "column",
					minWidth: "0",
					wordWrap: "break-word",
					backgroundColor: "#fff",
					backgroundClip: "border-box",
					border: " 1px solid rgba(0,0,0,.125)",
					borderRadius: ".25rem",
				}}
			>
				<li>
					<h3>
						<Link
							to={`/repo/${repoInfo.name}`}
							onClick={() => {
								// Update context store repository_url
								updateRepoUrl(repoInfo.repo_url);
								// Incase user refreshes a page we want to be able to persist the repo_url_endpoint
								localStorage.setItem(REPO_URL_STORAGE_KEY, repoInfo.repo_url);
							}}
						>
							{repoInfo.name}
						</Link>
					</h3>
				</li>

				<li>
					<h5>{repoInfo.language}</h5>
				</li>
				<li>{repoInfo.description}</li>
				<li>{repoInfo.star_count}</li>
				<li>{repoInfo.fork_count}</li>
				<li>
					created_at: <span>{repoInfo.created_at}</span>
				</li>
				<li>
					Last Update: <span> {repoInfo.updated_at} </span>
				</li>
			</Card>
		</ul>
	);
}

export default OrgRepoCard;
