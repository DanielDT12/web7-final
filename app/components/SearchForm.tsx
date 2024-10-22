"use client";

import { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { useFormState } from "../hooks/useFormState";

import { Button } from "../UI/Button";

import { kommuneNavnOgNummer } from "@/app/data/kommuner";

export const SearchForm = () => {
	const [kommuner, setKommuner] = useState([]);
	const { setForm, inputValue, setInputValue } = useFormState();

	const debouncedKommune = useDebounce(inputValue.kommune, 200);

	useEffect(() => {
		const filterKommune: any = Object.entries(kommuneNavnOgNummer).filter(
			([name]) => name.toLowerCase().includes(debouncedKommune.toLowerCase())
		);

		setKommuner(filterKommune);
	}, [debouncedKommune]);

	const handleChange = (e: any) => {
		setInputValue({
			...inputValue,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setForm({
			kommune: inputValue.kommune,
			year: inputValue.year,
		});

		setInputValue({
			kommune: "",
			year: "",
		});
	};

	return (
		<>
			<form className="flex gap-4 relative" onSubmit={handleSubmit}>
				<input
					className="p-2 rounded-md text-black"
					type="text"
					name="kommune"
					value={inputValue.kommune}
					onChange={handleChange}
					placeholder="Søk etter kommune"
				/>
				<input
					className="p-2 rounded-md text-black"
					type="text"
					name="year"
					value={inputValue.year}
					onChange={handleChange}
					placeholder="år"
				/>
				<Button type="submit" fontSize="xl">
					Submit
				</Button>
				{inputValue.kommune && (
					<ul className="absolute top-16 left-0 flex flex-col gap-2 max-h-[40rem] w-72 overflow-y-scroll border border-solid border-white py-4 bg-black ">
						{kommuner.sort().map(([name, number]) => (
							<li className="p-4 cursor-pointer" key={name + number}>
								{name}
							</li>
						))}
					</ul>
				)}
			</form>
		</>
	);
};
