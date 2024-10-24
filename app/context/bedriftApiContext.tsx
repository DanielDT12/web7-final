"use client";

import { useState, createContext } from "react";
import { BedriftApiContextType } from "../types/bedriftApiContextType";
import { BedriftResponse } from "../types/bedrifterType";

export const BedriftDataApiContext = createContext<
	BedriftApiContextType | undefined
>(undefined);

export const BedriftDataApiProvider = ({ children }: any) => {
	const [bedrifter, setBedrifter] = useState<BedriftResponse | null>(null);

	return (
		<BedriftDataApiContext.Provider
			value={{
				bedrifter,
				setBedrifter,
			}}
		>
			{children}
		</BedriftDataApiContext.Provider>
	);
};
