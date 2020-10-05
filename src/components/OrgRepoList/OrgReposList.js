import React, { useEffect, useContext, useState } from "react";

import OrgRepoCard from "./OrgRepoCard.js";

// Context
import AppContext from "../../context/AppContext.js";

// Utility functions
import { fetchOrganizationRepos } from "../../utils/utilityFunctions";

// Styles
import "./OrgListStyles.css";
import NextPrevButtons from "./NextPrevButtons.js";
import Spinner from "./../Spinner/Spinner.js";
import { ORGANIZATION_NAME_STORAGE_KEY } from "../../utils/CONSTANTS.js";

/**
 * @description Displays cards of all repository in an organization
 * @returns JSX
 */
function OrganizationRepositoryList() {
	// Get the current Organization name from the context store
	const { organization_name } = useContext(AppContext);

	const [isFetching, setIsFetching] = useState(false);
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
				setIsFetching(true);

				let data = await fetchOrganizationRepos(organization_name);
				localStorage.setItem(ORGANIZATION_NAME_STORAGE_KEY, organization_name);

				setAllRepositories(data);
				setIsFetching(false);
				setErr({
					message: "",
					isErr: false,
				});
			} catch (err) {
				setErr({
					message: err.message,
					isErr: true,
				});
				setIsFetching(false);
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

	if (allRepositories.length > 0) {
		return (
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
		);
	} else if (err.isErr) {
		//

		return (
			<h3 className="error-h3">
				Error: Double Check the organization name if it is spelled right
			</h3>
		);
	} else if (isFetching) {
		// Loading Spinner
		return <Spinner />;
	} else {
		return <h1>No Repositories in this Organization</h1>;
	}
}

export default OrganizationRepositoryList;
