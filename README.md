# [Go/Links Software Engineer - Frontend](https://golinks-take-home.netlify.app/) 🔗 :

This is a Frontend React web application that allows users to search for organizations repositories on GitHub and click repositories to see the latest commits made to that repositories.

![NYT-Scraper](./src/assets/screenrecording.gif)

## Getting Started :

[The application is deployed on Netlify here](https://golinks-take-home.netlify.app/)

You can open up the deployed link and explore the website. Enter a valid GitHub organization name to search their repositories and explore their latest commits for every repository.

### Prerequisites :

You will need both `node` and `yarn` installed on your computer in order to run this app. You can find out more about `yarn` at their [official site.](https://yarnpkg.com/lang/en/docs/install/)

### Installation :

Inside your terminal or command prompt, navigate to the location of the unzipped folder. Install the necessary dependencies by running either -

```
npm i
```

or

```
yarn install
```

After the installation process is done, you can run one of the commands below, depending on which package manager you decided to use to install all the dependencies

### Note:

The current max request that can be made in an hour to GitHub API is 60. To increase the capacity of the request to be made to the GitHub API to 5000, you need to be authorized. And to do so, you need an [Authorization token](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token). After creating one, all you need to do then is to create a `.env` file in the root directory of the app and add an environmental variable with the name `REACT_APP_AUTH_TOKEN` and assign your token to it.

```
yarn start
```

or

```
npm start
```

to initialize the app. It will launch the application at `http://localhost:3000` and you are now ready to see organization repositories as well as latest commits for that repository.

### Creating and running Production build

1. Run the command `npm run build`. This command creates a build folder in the directory with a production build for the app.
2. Because we already have `serve` npm package installed as a `dev dependency` all we need to do at this point is to run the command `npx serve -s build` to run the production build.

## Built With :

-   HTML5 & CSS3
-   [Bootstrap](https://getbootstrap.com/) - CSS framework
-   [Javascript](https://www.javascript.com/) - programming language
-   [React.js](https://reactjs.org/) - user interface library

### NPM Packages

-   [axios](https://www.npmjs.com/package/axios) - Promise based HTTP client
-   [dotenx](https://www.npmjs.com/package/dotenv) - Dotenv is a zero-dependency module that loads environment variables from a .env
-   [react-router-dom](https://www.npmjs.com/package/react-router-dom) - Routing library for React with DOM bindings
-   [react-icons](https://www.npmjs.com/package/react-icons) - Provides svg icons for react applications
-   [serve](https://www.npmjs.com/package/serve) - Package for serving static pages on a local environment
