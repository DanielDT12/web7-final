import { useContext } from "react";
import { FormStateContext } from "../context/formStateContext";

export const useFormState = () => {
	const context = useContext(FormStateContext);

	if (!context) {
		throw new Error(
			"useFormState must be used within a FormStateContextProvider"
		);
	}

	return context;
};
