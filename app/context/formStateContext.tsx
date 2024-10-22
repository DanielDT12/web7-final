import { useState, createContext } from "react";
import {
	ApiFormStateType,
	FormState,
	InputValueState,
} from "../types/apiFormStateType";

export const FormStateContext = createContext<ApiFormStateType | undefined>(
	undefined
);

export const FormStateContextProvider = ({ children }: any) => {
	const [form, setForm] = useState<FormState>({ kommune: "", year: "" });
	const [inputValue, setInputValue] = useState<InputValueState>({
		kommune: "",
		year: "",
	});

	return (
		<FormStateContext.Provider
			value={{
				form,
				setForm,
				inputValue,
				setInputValue,
			}}
		>
			{children}
		</FormStateContext.Provider>
	);
};
