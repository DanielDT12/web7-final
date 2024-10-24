import { ArrowLeft, ArrowRight, X } from "lucide-react";
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
				{currentPage === 0 ? <X /> : <ArrowLeft />}
			</Button>
			<Button onClick={goToNextPage} disabled={currentPage === totalPages - 1}>
				{currentPage === totalPages - 1 ? <X /> : <ArrowRight />}
			</Button>
		</div>
	);
};
