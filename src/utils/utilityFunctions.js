import Axios from "axios";

/**
 *
 * @param {*} orgName Name of organisation to Fetch
 * @returns An ordered List of all repositories in an organization
 */
export async function fetchOrganizationRepos(orgName) {
	try {
		const response = await Axios(`https://api.github.com/orgs/${orgName}/repos`);

		return sortData(response.data);
	} catch (error) {
		return error;
	}
}

/**
 *
 * @param {*} dateString String from response to parse ot ISO strig
 * @returns String representation of the date mm/dd/yyyy
 */
function parseDate(dateString) {
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
		const response = await Axios(`${languageUrl}`);
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
			let all_languages = await fetchLanguages(repoInfo.languages_url);
			all_languages = all_languages.data;
			return {
				id: repoInfo.id,
				name: repoInfo.name,
				language: repoInfo.language,
				all_languages,
				description: repoInfo.description,
				star_count: repoInfo.stargazers_count,
				fork_count: repoInfo.forks_count,
				created_at: parseDate(repoInfo.created_at),
				repo_url: repoInfo.url,
				updated_at: parseDate(repoInfo.updated_at),
			};
		})
	);
	console.log(data);
	return data;
}
