"use client";

import { useState, createContext } from "react";
import { BedriftApiContextType } from "../types/bedriftApiContextType";
import { BedriftResponse } from "../types/bedrifterType";

export const BedriftDataApiContext = createContext<
	BedriftApiContextType | undefined
>(undefined);

export const BedriftDataApiProvider = ({ children }: any) => {
	const [bedrifter, setBedrifter] = useState<BedriftResponse | null>(null);
	const [currentPage, setCurrentPage] = useState<number>(0);

	return (
		<BedriftDataApiContext.Provider
			value={{
				bedrifter,
				setBedrifter,
				currentPage,
				setCurrentPage,
			}}
		>
			{children}
		</BedriftDataApiContext.Provider>
	);
};
