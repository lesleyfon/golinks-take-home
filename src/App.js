import { Switch, Route } from "react-router-dom";
import React from "react";

// Importing App Context
import { Provider } from "./context/AppContext";

// Pages
import OrgRepos from "./pages/OrgRepos.js";
import Repository from "./pages/Repository.js";

// Styles
import "./App.css";

function App() {
	let store = {
		orgName: "Netflix",
		orgRepo: [],
		isLoading: false,
		error: {
			message: "",
			errorState: false,
		},
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
