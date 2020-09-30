import Axios from "axios";

/**
 *
 * @param {*} orgName Name of organisation to Fetch
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
 * @param {*} datestring String from response to parse ot ISO strig
 */
function parseDate(datestring) {
	const event = new Date(datestring);
	return `${event.getMonth()}/${event.getDate()}/${event.getFullYear()}`;
}

// Try returning just the data you need fom here
function sortData(data) {
	data = data.sort((a, b) => b.stargazers_count - a.stargazers_count);

	// Return relevant data
	data = data.map((repoInfo) => ({
		id: repoInfo.id,
		name: repoInfo.name,
		language: repoInfo.language,
		description: repoInfo.description,
		star_count: repoInfo.stargazers_count,
		fork_count: repoInfo.forks_count,
		created_at: parseDate(repoInfo.created_at),
		updated_at: parseDate(repoInfo.updated_at),
	}));
	return data;
}
