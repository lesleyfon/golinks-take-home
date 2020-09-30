import React, { useEffect, useContext, useState } from "react";
import { Card } from "react-bootstrap";

// Context
import AppContext from "../../context/AppContext.js";

// Utility functions
import { fetchOrganizationRepos } from "../../utils/utilityFunctions";

// Styles
import "./OrgListStyles.css";

function OrgReposList() {
	const { orgName } = useContext(AppContext);
	const [repo, setRepo] = useState([]);
	useEffect(() => {
		(async () => {
			try {
				let data = await fetchOrganizationRepos(orgName);
				setRepo(() => {
					return data;
				});
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);

	if (repo.length === 0) {
		return <h1>No Repositories in this Organization</h1>;
	} else {
		return (
			<>
				{repo.map((repoInfo) => (
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
				))}
			</>
		);
	}
}

export default OrgReposList;
