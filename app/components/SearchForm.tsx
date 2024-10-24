"use client";

import { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { useFormState } from "../hooks/useFormState";

import { kommuneNavnOgNummer } from "@/app/data/kommuner";

import capitalizeName from "@/app/utilities/capitalizeKommuneName";

import { Button } from "../UI/Button";

type KommuneArray = [string, string];

export const SearchForm = () => {
	const [kommuner, setKommuner] = useState<KommuneArray[]>([]); // array for ul liste, conditional rendering nederst i tsx.
	const [isSelected, setIsSelected] = useState<boolean>(false); // flag for og vise og hjemme liste basert på om kommune matcher en kommune i kommune listen over,
	const { setForm, inputValue, setInputValue } = useFormState(); // useContext cusetom hook

	const debouncedKommune = useDebounce(inputValue.kommune, 200); // lagger oppdatering av input field kommune liste.

	useEffect(() => {
		// useEffect for filtrering av liste, Object.entries lagger ett array av kommuneNavnOgNummer objectet.
		if (!isSelected && debouncedKommune) {
			const filterKommune: KommuneArray[] = Object.entries(
				kommuneNavnOgNummer
			).filter(([name]) =>
				name.toLowerCase().includes(debouncedKommune.toLowerCase())
			);
			setKommuner(filterKommune);
			console.log(filterKommune);
		} else {
			setKommuner([]);
		}
	}, [isSelected, debouncedKommune]);

	const handleKommuneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setIsSelected(false);
		setInputValue({
			...inputValue,
			[e.target.name]: e.target.value,
		});
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue({
			...inputValue,
			[e.target.name]: e.target.value,
		});
	};

	const handleSelectedKommune = (name: string) => {
		setInputValue({
			...inputValue,
			kommune: name,
		});

		setIsSelected(true); // flagg for å sjekke om man har klikket en kommune
		setKommuner([]); // fjerner alle elementer i arrayet, bruker en sjekk i tsx som spør om det er innhold i denne listen, hvis ikke rendrer den ikke ut en ul.
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

		setKommuner([]); // redundancy når man submitter form, gjør det samme som den over.
	};

	interface EnterKeyPressFunctionType {
		e: React.KeyboardEvent;
		name: string;
	}

	const onEnterKeyPressConfirm = ({
		e,
		name,
	}: EnterKeyPressFunctionType): void => {
		if (e.key === "Enter") {
			handleSelectedKommune(name);
		}
	};

	return (
		<>
			<form
				className="flex flex-col gap-4 relative sm:flex-row"
				onSubmit={handleSubmit}
			>
				<input
					className="p-2 rounded-md text-black w-[100%]"
					type="text"
					name="kommune"
					value={inputValue.kommune}
					onChange={handleKommuneChange}
					placeholder="Søk etter kommune"
				/>
				{inputValue.kommune && kommuner.length > 0 && (
					<ul className="absolute top-44 left-0 flex flex-col max-h-[40rem] w-[100%] max-w-[14rem] my-4 border border-solid border-white bg-black overflow-y-scroll sm:top-12">
						{kommuner.sort().map(([name, number]) => (
							<li
								className={`p-2 cursor-pointer ${
									kommuner.length > 1 ? "border-t border-b" : ""
								} border-white`}
								key={name + number}
								onClick={() => handleSelectedKommune(name)}
								onKeyDown={(e) => onEnterKeyPressConfirm({ e, name })}
								tabIndex={0} // lar bruker tabbe igjennom liste.
							>
								{capitalizeName(name)}
							</li>
						))}
					</ul>
				)}
				<input
					className="p-2 rounded-md text-black w-[100%]"
					type="text"
					name="year"
					value={inputValue.year}
					onChange={handleInputChange}
					placeholder="år"
				/>
				<Button type="submit" fontSize="xl">
					Submit
				</Button>
			</form>
		</>
	);
};
