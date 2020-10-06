import React, { useState } from "react";

import { parseDate } from "./../../utils/utilityFunctions.js";

/**
 *
 * @param {object} commit_data commit data about a single repository
 * @returns JSX
 */
function RepositoryCard({ commit_data }) {
	const hash = {
		shortenHash: commit_data.sha.substring(0, 8),
		fullHash: commit_data.sha,
	};
	const [isFull, setIsFull] = useState(false);
	let avatar_url = null;

	if (commit_data.committer) {
		// Avatar url
		avatar_url = commit_data.committer.avatar_url;
	}

	return (
		<>
			<div className="commit-card">
				<div className="left col-md-10 col-sm-12">
					<h5>{commit_data.commit.message}</h5>
					<div className="commit-card-bottom">
						<div className="committer-avatar">
							<img
								src={
									avatar_url ||
									"https://avatars3.githubusercontent.com/u/19864447?v=4"
								}
								alt="committer avatar"
							/>
						</div>
						<p> by {commit_data.commit.author.name}</p>
						<p> committed on {parseDate(commit_data.commit.author.date)}</p>
					</div>
				</div>

				<div className="right col-md-2 col-sm-12">
					{/* <p>Hash: {hash.shortenHash}</p> */}
					{isFull ? (
						<p>
							{hash.fullHash}{" "}
							<span className="more-less" onClick={() => setIsFull(!isFull)}>
								less
							</span>
						</p>
					) : (
						<p>
							{hash.shortenHash}
							<span className="more-less" onClick={() => setIsFull(!isFull)}>
								{" "}
								more
							</span>
						</p>
					)}
				</div>
			</div>
		</>
	);
}

export default RepositoryCard;
