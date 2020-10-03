import React, { useEffect, useContext, useState } from "react";

// Context
import AppContext from "../../context/AppContext.js";

// Utility functions
import { fetchOrganizationRepos } from "../../utils/utilityFunctions";

// Styles
import "./OrgListStyles.css";

import OrgRepoCard from "./OrgRepoCard.js";

function OrgReposList() {
	// Get the current Organisation name from the context store
	const { organization_name } = useContext(AppContext);

	const [repo, setRepo] = useState([]);

	const [allRepo, setAllRepo] = useState([]);

	const [page, setPage] = useState({
		start: 0,
		end: 10,
	});
	const [err, setErr] = useState({
		message: "",
		isErr: false,
	});
	// UseEffect for fetching data when component mounts
	useEffect(() => {
		(async () => {
			try {
				let data = await fetchOrganizationRepos(organization_name);

				setRepo(data);
				setAllRepo(data);
				setErr({
					message: "",
					isErr: false,
				});
			} catch (err) {
				setErr({
					message: err.message,
					isErr: true,
				});
				console.log(err);
			}
		})();
	}, [organization_name]);

	const nextPage = () => {
		if (page.end <= allRepo.length) {
			setPage({
				start: page.end + 1,
				end: page.end + 11,
			});
		}
	};
	const prevPage = () => {
		if (page.start >= 11) {
			setPage({
				start: page.start - 11,
				end: page.end - 10,
			});
		}
	};
	return (
		<section className="section-container col-lg-7 col-md-12 col-sm-12">
			{repo.length > 0 ? (
				<>
					{allRepo.slice(page.start, page.end).map((repoInfo) => (
						<OrgRepoCard key={repoInfo.id} repoInfo={repoInfo} />
					))}
					<div className="page-buttons">
						{/* Extract this to its own component */}
						<button
							type="button"
							className="btn btn-dark"
							onClick={prevPage}
							disabled={page.start <= 0 ? true : false}
						>
							Previous Page
						</button>
						<button
							type="button"
							className="btn btn-dark"
							onClick={nextPage}
							disabled={page.end >= allRepo.length ? true : false}
						>
							Next Page
						</button>
					</div>
				</>
			) : (
				<>
					{err.isErr ? (
						<h3
							style={{
								textAlign: "left",
							}}
						>
							Error: Double Check the organization name if it is spelled right
						</h3>
					) : (
						<h1>No Repositories in this Organization</h1>
					)}
				</>
			)}
		</section>
	);
}

export default OrgReposList;
