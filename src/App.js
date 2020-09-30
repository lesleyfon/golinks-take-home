import React from "react";
import { Switch, Route } from "react-router-dom";

// Pages
import OrgRepos from "./pages/OrgRepos.js";
import Repository from "./pages/Repository.js";

// Styles
import "./App.css";

function App() {
	return (
		<main className="App">
			<Switch>
				<Route path="/" exact component={() => <OrgRepos />} />
				<Route path="/repo/:reponame" exact component={() => <Repository />} />
			</Switch>
		</main>
	);
}

export default App;
