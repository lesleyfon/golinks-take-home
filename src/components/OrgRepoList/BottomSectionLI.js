import React from "react";

/**
 *
 * @param {ReactElement} svg SVG element
 * @param {string} text_data String text
 * @description Component displaying card information (language, star count, fork count, date)
 * @returns JSX
 */
function BottomSectionLI({ svg, text_data }) {
	return (
		<div>
			<span>
				{" "}
				{svg} {text_data}
			</span>
		</div>
	);
}

export default BottomSectionLI;
