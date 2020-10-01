import Axios from "axios";

/**
 *
 * @param {*} orgName Name of organisation to Fetch
 * @returns An ordered List of all repositories in an organization
 */

export async function fetchOrganizationRepos(orgName) {
	try {
		const response = await Axios.get(`https://api.github.com/orgs/${orgName}/repos`);
		console.log(response);
		return sortData(response.data);
	} catch (error) {
		console.log("Hereee", error.message);
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
 */
async function fetchLanguages(languageUrl) {
	try {
		const response = await Axios.get(`${languageUrl}`, {
			auth: {
				Username: "lesleyfon",
				Password: "619419Val@",
			},
		});
		return response;
	} catch (error) {
		return error;
	}
}

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
 * @param {*} repoUrl api for fetching a single repo information
 *
 */
export async function fetchSingleRepoData(repoUrl) {
	try {
		let { data } = await Axios.get(repoUrl, {
			auth: {
				Username: "lesleyfon",
				Password: "619419Val@",
			},
		});
		let commitUrl = data.commits_url.split("{")[0];

		let commitData = await fetchCommitData(commitUrl);

		return {
			repo_name: data.name,
			description: data.description || "",
			star_count: data.stargazers_count,
			commit_data: commitData,
		};
	} catch (error) {
		return error;
	}
}

async function fetchCommitData(commitUrl) {
	try {
		const { data } = await Axios.get(commitUrl, {
			auth: {
				Username: "lesleyfon",
				Password: "619419Val@",
			},
		});
		return data;
	} catch (error) {
		return error;
	}
}
