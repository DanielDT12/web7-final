import { BedriftResponse } from "./bedrifterType";

export type BedriftApiContextType = {
	bedrifter: BedriftResponse | null;
	setBedrifter: React.Dispatch<React.SetStateAction<BedriftResponse | null>>;
	currentPage: number;
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};
