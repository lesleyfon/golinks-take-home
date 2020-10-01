import React from "react";

import { BiGitRepoForked, FiStar, GoFileCode, MdDateRange } from "react-icons/all";
import BottomSectionLI from "./BottomSectionLI.js";

function BottomSection({ repoInfo }) {
	return (
		<div className="bottom-section ">
			<BottomSectionLI
				className="language"
				svg={<GoFileCode />}
				text_data={repoInfo.language}
			/>
			<BottomSectionLI
				className="star-count"
				svg={<FiStar />}
				text_data={repoInfo.star_count}
			/>

			<BottomSectionLI
				className="fork-count"
				svg={<BiGitRepoForked />}
				text_data={repoInfo.fork_count}
			/>

			<BottomSectionLI
				className="date"
				svg={<MdDateRange />}
				text_data={repoInfo.created_at}
			/>
		</div>
	);
}

export default BottomSection;
