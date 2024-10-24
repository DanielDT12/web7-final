import { useState } from "react";

type PaginationPros = {
	totalPages: number;
	initialPage?: number;
};

export const usePagination = ({
	totalPages,
	initialPage = 0,
}: PaginationPros) => {
	const [currentPage, setCurrentPage] = useState<number>(0);

	const goToPreviousPage = () => {
		setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
	};

	const goToNextPage = () => {
		setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
	};

	const reset = () => {
		setCurrentPage(0);
	};

	return { currentPage, goToNextPage, goToPreviousPage, reset };
};
