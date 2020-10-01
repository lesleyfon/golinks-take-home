import React from "react";

function BottomSectionLI({ svg, text_data }) {
	return (
		<li>
			<span>
				{" "}
				{svg} {text_data}
			</span>
		</li>
	);
}

export default BottomSectionLI;
