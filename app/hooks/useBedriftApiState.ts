import { useContext } from "react";
import { BedriftDataApiContext } from "../context/bedriftApiContext";

export const useBedriftApiState = () => {
	const context = useContext(BedriftDataApiContext);

	if (!context) {
		throw new Error(
			"useBedriftApiState must be used within a BedriftDataApiProvider"
		);
	}

	return context;
};
