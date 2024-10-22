"use client";

import { useEffect, useState, useRef } from "react";
import { useFormState } from "../hooks/useFormState";
import { useBedriftApiState } from "../hooks/useBedriftApiState";

import { kommuneNavnOgNummer } from "../data/kommuner";

import DataTable from "./DataTable";
import { Button } from "../UI/Button";

const BASE_URL = "https://data.brreg.no/enhetsregisteret/api/enheter";
const KOMMUNE = "kommunenummer=";
const FRA_DATO = "fraStiftelsesdato=";
const TIL_DATO = "tilStiftelsesdato=";
const SIZE = 10; // mengden bedrifter som rendrer i data tabelen

export default function DataFetching() {
	const { form } = useFormState();
	const { bedrifter, setBedrifter, currentPage, setCurrentPage } =
		useBedriftApiState();

	const [isLoading, setIsloading] = useState(false);
	const [error, setError] = useState(null);

	const totalPages: number = bedrifter?.page.totalPages as number; // as number gjør at jeg forteller typescript compileren at dette alltid er et nummer

	const abortControllerRef = useRef<AbortController | null>(null); // abortcontroller referanse for og håndtere race conditions

	const kommuneNavnNormalisert =
		form?.kommune.charAt(0).toUpperCase() +
		form?.kommune.slice(1).toLowerCase(); // normalisering av string input fra form

	const kommuneNummer = kommuneNavnOgNummer[kommuneNavnNormalisert] || "ukjent"; // setter string til kommune nr for.eks bergen til 4601

	useEffect(() => {
		if (!form || !form.kommune || !form.year) return;

		const fetchBedrifter = async () => {
			const FORMATED_URL = `${BASE_URL}?${KOMMUNE}${kommuneNummer}&${FRA_DATO}${form.year}-01-01&${TIL_DATO}${form.year}-12-31&page=${currentPage}&size=${SIZE}`;

			abortControllerRef.current?.abort(); // sjekker om det er en activ abortcontroller, hvis det finnes så kjører den abort
			abortControllerRef.current = new AbortController(); // lager ny abortcontroller

			setCurrentPage(currentPage);
			setIsloading(true);
			setError(null);

			try {
				const res = await fetch(FORMATED_URL, {
					signal: abortControllerRef.current?.signal,
				});

				if (!res.ok) {
					throw new Error(`HTTP error, status: ${res.status}`);
				}

				const data = await res.json();
				setBedrifter(data);
			} catch (e: any) {
				if (e.name !== "AbortError") {
					setError(e);
					console.error(e);
				}
			} finally {
				setIsloading(false);
			}
		};

		fetchBedrifter();
	}, [form, currentPage]);

	const goToPreviousPage = () => {
		if (currentPage === 0) {
			return;
		} else {
			setCurrentPage(currentPage - 1);
		}
	};

	const goToNextPage = () => {
		if (currentPage === totalPages) {
			return;
		} else {
			setCurrentPage(currentPage + 1);
		}
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Something went wrong.</div>;
	}

	return (
		<main>
			{bedrifter && <DataTable data={bedrifter} />}
			{bedrifter && (
				<div className="flex justify-between w-[100%] py-8">
					<Button onClick={goToPreviousPage}>&larr;</Button>
					<Button onClick={goToNextPage}>&rarr;</Button>
				</div>
			)}
		</main>
	);
}
