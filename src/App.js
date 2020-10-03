import { Switch, Route } from "react-router-dom";
import React, { useState } from "react";

// Importing App Context
import { Provider } from "./context/AppContext";

// Pages
import OrgRepos from "./pages/OrgRepos.js";
import Repository from "./pages/Repository.js";

// Styles
import "./App.css";
import Search from "./components/Search/Search";
import Page404 from "./pages/404/404";

// App Component
function App() {
	// Local State

	const [repository_url, setRepoUrl] = useState("");
	const [organizationName, setOrganizationName] = useState("Netflix");

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
					<Route path="/error" component={(routeProps) => <Page404 />} />

					<Route
						path="/"
						exact
						component={(routeProps) => <OrgRepos {...routeProps} />}
					/>
					<Route
						path="/repo/:reponame"
						exact
						component={(routeProps) => <Repository {...routeProps} />}
					/>
				</Switch>
			</Provider>
		</main>
	);
}

export default App;
