import React from "react";
import { Card } from "react-bootstrap";

function OrgRepoCard({ repoInfo }) {
	return (
		<ul key={repoInfo.id}>
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
					<h3>{repoInfo.name}</h3>
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
