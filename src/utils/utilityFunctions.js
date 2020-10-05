import Axios from "axios";
import { REACT_APP_AUTH_TOKEN } from "./CONSTANTS";

const configHeader = {
	headers: {
		Authorization: `token ${REACT_APP_AUTH_TOKEN}`,
	},
};

/**
 *
 * @param {*} orgName Name of organisation to Fetch
 * @returns An ordered List of all repositories in an organization
 */

export async function fetchOrganizationRepos(orgName) {
	// Pagination Implement this to fetch more than 30 repos
	// https://docs.github.com/en/free-pro-team@latest/rest/overview/resources-in-the-rest-api#pagination
	try {
		const response = await Axios.get(
			`https://api.github.com/orgs/${orgName}/repos?page=1&per_page=100`,
			configHeader
		);
		return sortData(response.data);
	} catch (error) {
		console.log("Auth error", error);
		throw new Error(error);
	}
}

/**å
 *
 * @param {*} orgName Name of the organization to fetch details
 * @returns Data to render on the page
 */
export async function fetchOrgDetails(orgName) {
	try {
		const response = await Axios.get(`https://api.github.com/orgs/${orgName}`, configHeader);

		return {
			avatar_url: response.data.avatar_url,
			description: response.data.description,
			location: response.data.location,
			name: response.data.name,
			repo_count: response.data.public_repos,
			twitter: response.data.twitter_username,
			fetchComplete: true,
		};
	} catch (error) {
		throw new Error(error);
	}
}

/**
 *
 * @param {*} dateString String from response to parse ot ISO strig
 * @returns String representation of the date mm/dd/yyyy
 */
export function parseDate(dateString) {
	const event = new Date(dateString);
	return `${event.getMonth()}/${event.getDate()}/${event.getFullYear()}`;
}

/**
	 *
	 * @param {*} languageUrl api endpoint for fetching all languages used in a repository
	 * @returns An object of all the languages used in the repo
	 async function fetchLanguages(languageUrl) {
		 try {
			 const response = await Axios.get(`${languageUrl}`, {
				 auth: {
				},
			});
			return response;
		} catch (error) {
			return error;
		}
	}
	*/

/**
 *
 * @param {*} data list of github organization repositories
 * @returns List of sorted repositories based on the star count
 */
async function sortData(data) {
	data = data.sort((a, b) => b.stargazers_count - a.stargazers_count);

	// Return relevant data
	// Resolve the promise from fetching all languages
	data = await Promise.all(
		data.map(async (repoInfo) => {
			// Look for ways to Optimize this call.
			// let all_languages = await fetchLanguages(repoInfo.languages_url);
			// all_languages = all_languages.data;
			return {
				id: repoInfo.id,
				name: repoInfo.name,
				language: repoInfo.language,
				// all_languages,
				description: repoInfo.description,
				star_count: repoInfo.stargazers_count,
				fork_count: repoInfo.forks_count,
				created_at: parseDate(repoInfo.created_at),
				repo_url: repoInfo.url,
				updated_at: parseDate(repoInfo.updated_at),
			};
		})
	);

	return data;
}

/**
 *
 * @param {*} repoEndpoint api for fetching a single repo information
 *
 */
export async function fetchSingleRepoData(repoEndpoint) {
	if (repoEndpoint === undefined) {
		throw new Error("Can't fetch data of undefined");
	}
	try {
		let { data } = await Axios.get(
			`https://api.github.com/repos/${repoEndpoint}`,
			configHeader
		);

		let commitUrl = data.commits_url.split("{")[0];
		let commitData = await fetchCommitData(commitUrl);

		return {
			repo_name: data.name,
			description: data.description || "",
			star_count: data.stargazers_count,
			commit_data: commitData,
		};
	} catch (error) {
		throw new Error(error);
	}
}

async function fetchCommitData(commitUrl) {
	try {
		const { data } = await Axios.get(commitUrl, configHeader);
		return data;
	} catch (error) {
		return error;
	}
}
