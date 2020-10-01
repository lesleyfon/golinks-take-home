import React from "react";
import { parseDate } from "./../../utils/utilityFunctions.js";
function RepositoryCard({ repoData }) {
	return (
		<>
			<h3>{repoData.repo_name}</h3>
			<p>{repoData.description}</p>
			<p>{repoData.star_count}</p>

			{repoData.commit_data.map((commit_data, i) => (
				<div key={i}>
					<>{console.log(commit_data)}</>
					{/* <>{console.log(commit_data.commit.message)}</> */}
					<h5>Title: </h5>
					<h5>User Name: {commit_data.commit.author.name}</h5>
					<p>Hash: {commit_data.sha}</p>
					<p>Date {parseDate(commit_data.commit.author.date)}</p>
				</div>
			))}
		</>
	);
}

export default RepositoryCard;
