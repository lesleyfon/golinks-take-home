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

// App Component
function App() {
	// Local State
	const [repo_ulr, setRepoUrl] = useState("Netflix");
	const [error, setError] = useState({
		message: "",
		errorState: false,
	});

	const updateRepoUrl = (data) => {
		setRepoUrl(data);
	};

	const updateErrorState = (err) => {
		console.log(err);
		setError({ ...err });
	};

	let store = {
		repository_url: repo_ulr,
		isLoading: false,
		error: error,
		updateRepoUrl,
		updateErrorState,
	};

	return (
		<main className="App">
			<Provider value={store}>
				<Search />
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
