import { Switch, Route } from "react-router-dom";
import React, { useState } from "react";

// Importing App Context
import { Provider } from "./context/AppContext";

// Pages
import OrganizationRepository from "./pages/OrganizationRepository.js";
import Repository from "./pages/Repository.js";

// Styles
import "./App.css";
import Search from "./components/Search/Search";
import Page404 from "./pages/404/404";
import { ORGANIZATION_NAME_STORAGE_KEY } from "./utils/CONSTANTS";

// App Component
function App() {
	// Local State

	const [repository_url, setRepoUrl] = useState("");

	// Retrieve the company name saved in local storage. This help persist company names so we are able to refresh and get the same organization repo
	const [organizationName, setOrganizationName] = useState(
		localStorage.getItem(ORGANIZATION_NAME_STORAGE_KEY) || "Netflix"
	);

	const [error, setError] = useState({
		message: "",
		errorState: false,
	});

	const updateRepositoryUrl = (data) => {
		setRepoUrl(data);
	};

	const updateOrganizationName = (data) => {
		setOrganizationName(data);
	};
	const updateErrorState = (err) => {
		console.log(err);
		setError({ ...err });
	};

	let store = {
		organization_name: organizationName,
		repository_url: repository_url,
		isLoading: false,
		error: error,
		updateRepositoryUrl,
		updateErrorState,
		updateOrganizationName,
	};

	return (
		<main className="App">
			<Provider value={store}>
				<Search />
				<Switch>
					{/** Renders all the repositories of an organization */}
					<Route
						path="/"
						exact
						component={(routeProps) => <OrganizationRepository {...routeProps} />}
					/>

					{/** Renders commits of a single repositories */}
					<Route
						path="/repo/:reponame"
						exact
						component={(routeProps) => <Repository {...routeProps} />}
					/>

					{/* Error page */}
					<Route path="*" component={Page404} />
				</Switch>
			</Provider>
		</main>
	);
}

export default App;
