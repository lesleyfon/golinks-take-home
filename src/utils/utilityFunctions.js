import Axios from "axios";
export async function fetchOrganizationRepos(orgName) {
	try {
		const response = await Axios(`https://api.github.com/orgs/${orgName}/repos`);

		return sortData(response.data);
	} catch (error) {
		return error;
	}
}

// Try returning just the data you need fom here
function sortData(data) {
	data = data.sort((a, b) => b.stargazers_count - a.stargazers_count);

	// Return relevant data
	data = data.map((repoInfo) => ({
		id: repoInfo.id,
		name: repoInfo.name,
		language: repoInfo.language,
		star_count: repoInfo.stargazers_count,
		fork_count: repoInfo.forks_count,
	}));
	return data;
}
