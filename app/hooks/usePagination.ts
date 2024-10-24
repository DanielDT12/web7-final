import { useState, useCallback } from "react";

type PaginationPros = {
	totalPages: number;
	initialPage?: number;
};

export const usePagination = ({
	totalPages,
	initialPage = 0,
}: PaginationPros) => {
	const [currentPage, setCurrentPage] = useState<number>(0);

	const goToPreviousPage = useCallback(() => {
		setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
	}, []);

	const goToNextPage = useCallback(() => {
		setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
	}, [totalPages]);

	const reset = useCallback(() => {
		setCurrentPage(initialPage);
	}, [initialPage]);

	return { currentPage, goToNextPage, goToPreviousPage, reset };
};
