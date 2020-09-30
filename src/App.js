import { Switch, Route } from "react-router-dom";
import React, { useState } from "react";

// Importing App Context
import { Provider } from "./context/AppContext";

// Pages
import OrgRepos from "./pages/OrgRepos.js";
import Repository from "./pages/Repository.js";

// Styles
import "./App.css";

// App Component
function App() {
	// Local State
	const [repo_ulr, setRepoUrl] = useState("");

	const updateRepoUrl = (data) => {
		setRepoUrl(data);
	};

	let store = {
		orgName: "Netflix",
		repository_url: repo_ulr,
		isLoading: false,
		error: {
			message: "",
			errorState: false,
		},
		updateRepoUrl,
	};

	return (
		<main className="App">
			<Provider value={store}>
				<Switch>
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
