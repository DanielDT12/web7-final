"use client";

import { useState, createContext, useContext, ReactNode } from "react";
import { BedriftResponse } from "../types/bedrifterType";

// Define the types for your states
type FormState = {
	kommune: string;
	year: string;
};

type InputValueState = {
	kommune: string;
	year: string;
};

type BedriftApiContextType = {
	form: FormState;
	setForm: React.Dispatch<React.SetStateAction<FormState>>;
	inputValue: InputValueState;
	setInputValue: React.Dispatch<React.SetStateAction<InputValueState>>;
	bedrifter: BedriftResponse | null;
	setBedrifter: React.Dispatch<React.SetStateAction<BedriftResponse | null>>;
	currentPage: number;
	setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
};

// Create the context with an initial value of `undefined`
export const BedriftDataApiContext = createContext<
	BedriftApiContextType | undefined
>(undefined);

// Create the provider component with explicit props
export const BedriftDataApiProvider = ({ children }: any) => {
	const [form, setForm] = useState<FormState>({ kommune: "", year: "" });
	const [inputValue, setInputValue] = useState({
		kommune: "",
		year: "",
	});
	const [bedrifter, setBedrifter] = useState<BedriftResponse | null>(null);
	const [currentPage, setCurrentPage] = useState<number>(0);

	return (
		<BedriftDataApiContext.Provider
			value={{
				form,
				setForm,
				inputValue,
				setInputValue,
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
