export type FormState = {
	kommune: string;
	year: string;
};

export type InputValueState = {
	kommune: string;
	year: string;
};

export type ApiFormStateType = {
	form: FormState;
	setForm: React.Dispatch<React.SetStateAction<FormState>>;
	inputValue: InputValueState;
	setInputValue: React.Dispatch<React.SetStateAction<InputValueState>>;
};
