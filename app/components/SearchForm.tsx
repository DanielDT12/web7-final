"use client";

import { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";

import { Button } from "../UI/Button";

import { kommuneNavnOgNummer } from "@/app/data/kommuner";

export const SearchForm = () => {
	const [form, setForm] = useState({
		kommune: "",
		year: "",
	});

	const [inputValue, setInputValue] = useState({
		kommune: "",
		year: "",
	});

	const debouncedKommune = useDebounce(inputValue.kommune, 200);
	const debouncedYear = useDebounce(inputValue.year, 200);

	const [kommuner, setKommuner] = useState([]);

	useEffect(() => {
		setForm((prevForm) => ({
			...prevForm,
			kommune: debouncedKommune,
			year: debouncedYear,
		}));
	}, [debouncedKommune, debouncedYear]);

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

		const queryString = `?kommune=${form.kommune}&year=${form.year}`;
		console.log("Form submitted with query:", queryString);
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
				<Button type="submit" text="Submit" fontSize="xl">
					Submit
				</Button>
				<div className="absolute top-16 left-0 flex flex-col gap-2 max-h-[40rem] w-72 overflow-y-scroll border border-solid border-white py-4">
					{inputValue.kommune ? (
						kommuner.map(([name, number]) => (
							<p className="p-4" key={number}>
								{name}
							</p>
						))
					) : (
						<div className="border-0"></div>
					)}
				</div>
			</form>
		</>
	);
};