import React from "react";

// Icons/Svg's
import { BiBook, BiGitRepoForked } from "react-icons/bi";
import { FiStar } from "react-icons/fi";

/**
 *
 * @param {*} param0 Props
 */
function RepositoryHeader({ repoData }) {
	return (
		<div className="repository-card-header">
			<h3>
				<BiBook /> <span>{repoData.repo_name} </span>
			</h3>
			<p>{repoData.description}</p>

			<div className="bottom-row">
				<p>
					<FiStar /> <span>{repoData.star_count}</span>
				</p>
				<p>
					<BiGitRepoForked /> <span>{repoData.star_count}</span>
				</p>
			</div>
		</div>
	);
}

export default RepositoryHeader;
