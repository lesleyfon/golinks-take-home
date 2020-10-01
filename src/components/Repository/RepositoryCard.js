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
				<hr></hr>
			</div>
			{repoData.commit_data.map((commit_data, i) => (
				<div key={i}>
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
