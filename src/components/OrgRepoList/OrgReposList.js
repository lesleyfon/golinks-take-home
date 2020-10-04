import React, { useEffect, useContext, useState } from "react";

import OrgRepoCard from "./OrgRepoCard.js";

// Context
import AppContext from "../../context/AppContext.js";

// Utility functions
import { fetchOrganizationRepos } from "../../utils/utilityFunctions";

// Styles
import "./OrgListStyles.css";
import NextPrevButtons from "./NextPrevButtons.js";

/**
 * @description Displays cards of all repository in an organization
 * @returns JSX
 */
function OrganizationRepositoryList() {
	// Get the current Organization name from the context store
	const { organization_name } = useContext(AppContext);

	const [allRepositories, setAllRepositories] = useState([]);

	// Used to keep track of the current repositories being rendered
	const [page, setPage] = useState({
		start: 0,
		end: 10,
	});

	// Error state
	const [err, setErr] = useState({
		message: "",
		isErr: false,
	});

	// UseEffect for fetching data when component mounts
	useEffect(() => {
		// IIFE to run when the component mounts
		(async () => {
			try {
				let data = await fetchOrganizationRepos(organization_name);

				setAllRepositories(data);
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

	// Function to move to the next next 10 repositories in an organization stored in the allRepository state
	const nextPage = () => {
		if (page.end <= allRepositories.length) {
			// only go forward when end is less than the length of the allRepositories state
			setPage({
				start: page.end + 1,
				end: page.end + 11,
			});
		}
	};
	// Function to move to the prev 10 repositories in an organization stored in the allRepository state
	const prevPage = () => {
		if (page.start >= 11) {
			// only go back when start is greater than 10
			setPage({
				start: page.start - 11,
				end: page.end - 10,
			});
		}
	};
	return (
		<section className="section-container col-lg-7 col-md-12 col-sm-12">
			{allRepositories.length > 0 ? (
				<>
					{allRepositories.slice(page.start, page.end).map((repoInfo) => (
						<OrgRepoCard key={repoInfo.id} repoInfo={repoInfo} />
					))}

					<NextPrevButtons
						prevPage={prevPage}
						nextPage={nextPage}
						page={page}
						allRepositories={allRepositories}
					/>
				</>
			) : (
				<>
					{err.isErr ? (
						<h3
							// Move styles for the CSS file
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

export default OrganizationRepositoryList;
