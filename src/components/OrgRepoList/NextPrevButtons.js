import React from "react";

function NextPrevButtons({ prevPage, page, nextPage, allRepositories }) {
	return (
		<div className="page-buttons">
			{/* Extract this to its own component */}
			<button
				type="button"
				className="btn btn-dark"
				onClick={prevPage}
				disabled={page.start <= 0 ? true : false}
			>
				Previous Page
			</button>
			<button
				type="button"
				className="btn btn-dark"
				onClick={nextPage}
				disabled={page.end >= allRepositories.length ? true : false}
			>
				Next Page
			</button>
		</div>
	);
}

export default NextPrevButtons;
