import React from "react";
import { BiBook } from "react-icons/bi";
import { FiStar } from "react-icons/fi";
import { GiForklift } from "react-icons/gi";
import { parseDate } from "./../../utils/utilityFunctions.js";
function RepositoryCard({ repoData }) {
	return (
		<>
			<div className="repository-card-header">
				<h3>
					{" "}
					<BiBook /> <span>{repoData.repo_name} </span>
				</h3>
				<p>{repoData.description}</p>

				<div className="bottom-row">
					<p>
						{" "}
						<FiStar /> <span>{repoData.star_count}</span>
					</p>
					<p>
						{" "}
						<GiForklift /> <span>{repoData.star_count}</span>
					</p>
				</div>
				{/* <hr></hr> */}
			</div>

			<section className="commit-section">
				{repoData.commit_data.map((commit_data, i) => {
					const hash = {
						shortenHash: commit_data.sha.substring(0, 8),
						fullHash: commit_data.sha,
					};
					let url = null;

					if (commit_data.committer) {
						url = commit_data.committer.avatar_url;
					}

					return (
						<div key={i} className="commit-card">
							<div className="left col-md-9 col-sm-12">
								<h5>{commit_data.commit.message}</h5>
								<div className="commit-card-bottom">
									<div className="committer-avatar">
										<img
											src={
												url ||
												"https://avatars3.githubusercontent.com/u/19864447?v=4"
											}
											alt="commiter avatar"
										/>
									</div>
									<p> by {commit_data.commit.author.name}</p>
									<p> committed on {parseDate(commit_data.commit.author.date)}</p>
								</div>
							</div>
							{/* <>{console.log(commit_data.commit.message)}</> */}
							<div className="right col-md-3 col-sm-12">
								<p>Hash: {hash.shortenHash}</p>
							</div>
						</div>
					);
				})}
			</section>
		</>
	);
}

export default RepositoryCard;
