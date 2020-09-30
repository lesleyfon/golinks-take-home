import React from "react";
import ReactDOM from "react-dom";

// React router for routing
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";

import * as serviceWorker from "./serviceWorker";

// Styles
import "bootstrap/dist/css/bootstrap.min.css"; // Required by react-bootstrap to be to able to bootstrap styles
import "./index.css";
import "./normalize.css";

ReactDOM.render(
	<React.StrictMode>
		{/* Wrap the whole application with the Router components to enable routing */}
		<Router>
			<App />
		</Router>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
