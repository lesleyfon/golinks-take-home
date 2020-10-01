import React from "react";

import { parseDate } from "./../../utils/utilityFunctions.js";

/**
 * 
 * @param {*} repoData Props passed data down  

 */
function RepositoryCard({ commit_data }) {
	const hash = {
		shortenHash: commit_data.sha.substring(0, 8),
		fullHash: commit_data.sha,
	};
	let url = null;

	if (commit_data.committer) {
		url = commit_data.committer.avatar_url;
	}
	return (
		<>
			<div className="commit-card">
				<div className="left col-md-10 col-sm-12">
					<h5>{commit_data.commit.message}</h5>
					<div className="commit-card-bottom">
						<div className="committer-avatar">
							<img
								src={url || "https://avatars3.githubusercontent.com/u/19864447?v=4"}
								alt="committer avatar"
							/>
						</div>
						<p> by {commit_data.commit.author.name}</p>
						<p> committed on {parseDate(commit_data.commit.author.date)}</p>
					</div>
				</div>

				<div className="right col-md-2 col-sm-12">
					<p>Hash: {hash.shortenHash}</p>
				</div>
			</div>
		</>
	);
}

export default RepositoryCard;
