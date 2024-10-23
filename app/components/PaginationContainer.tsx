import { Button } from "../UI/Button";

type PaginationFunctionType = {
	currentPage: number;
	totalPages: number;
	goToNextPage: () => void;
	goToPreviousPage: () => void;
};

export const PaginationContainer = ({
	currentPage,
	totalPages,
	goToNextPage,
	goToPreviousPage,
}: PaginationFunctionType) => {
	if (!totalPages) {
		return <div>Loading...</div>;
	}

	return (
		<div className="flex justify-between max-w-[65rem] py-8">
			<Button onClick={goToPreviousPage} disabled={currentPage === 0}>
				&larr;
			</Button>
			<Button onClick={goToNextPage} disabled={currentPage === totalPages - 1}>
				&rarr;
			</Button>
		</div>
	);
};
