"use client";

import { useEffect, useState, useRef } from "react";
import { useFormState } from "../hooks/useFormState";
import { usePagination } from "../hooks/usePagination";
import { useBedriftApiState } from "../hooks/useBedriftApiState";

import normalizeStringInput from "@/app/utilities/normalizeStringInput"; // string normalize function

import DataTable from "./DataTable";
import { PaginationContainer } from "./PaginationContainer";

import { kommuneNavnOgNummer } from "../data/kommuner";
import { BedriftResponse } from "../types/bedrifterType";

const BASE_URL = "https://data.brreg.no/enhetsregisteret/api/enheter";
const SIZE = 10; // Antall bedrifter som vises i data tabelen

export default function DataFetching() {
	const { form } = useFormState();
	const { bedrifter, setBedrifter } = useBedriftApiState();

	const [totalPages, setTotalPages] = useState<number>(0);
	const [isLoading, setIsloading] = useState<boolean>(false);
	const [error, setError] = useState<Error | null>(null);
	const abortControllerRef = useRef<AbortController | null>(null); // Referanse til AbortController for å håndtere race conditions ved fetch-forespørselen

	const { currentPage, goToNextPage, goToPreviousPage, reset } = usePagination({
		totalPages,
		initialPage: 0,
	});

	const kommuneNavn = normalizeStringInput(form.kommune);
	const kommuneNummer = kommuneNavnOgNummer[kommuneNavn] || "ukjent";

	useEffect(() => {
		if (!form || !form.kommune || !form.year) return; // Forhindrer useEffect i å kjøre hvis nødvendige verdier fra form mangler

		const fetchBedrifter = async () => {
			const FORMATED_URL = `${BASE_URL}?kommunenummer=${kommuneNummer}&fraStiftelsesdato=${form.year}-01-01&tilStiftelsesdato=${form.year}-12-31&page=${currentPage}&size=${SIZE}`;

			abortControllerRef.current?.abort(); // Sjekker om det er en activ abortcontroller, hvis det finnes så kjører den abort
			abortControllerRef.current = new AbortController(); // lager ny abortcontroller

			setIsloading(true);
			setError(null);

			try {
				const res = await fetch(FORMATED_URL, {
					signal: abortControllerRef.current?.signal,
				});

				if (!res.ok) {
					throw new Error(`HTTP error, status: ${res.status}`);
				}

				const data: BedriftResponse = await res.json();
				setBedrifter(data);
				setTotalPages(data.page.totalPages);
			} catch (err: unknown) {
				if (err instanceof Error && err.name !== "AbortError") {
					// sjekker etter error som ikke er AbortError
					setError(err);
					console.error(err);
				}
			} finally {
				setIsloading(false);
			}
		};

		fetchBedrifter();
	}, [form, currentPage]);

	useEffect(() => {
		// rester page til 0 når form blir sumbited på nytt, sånn at page ikke persister igjennom ny form search.
		reset();
	}, [form]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Something went wrong.</div>;
	}

	return (
		<section>
			<h2 className="text-center p-4">
				Bedrifter merket med rød er konkurs...
			</h2>
			{bedrifter && (
				<>
					<DataTable data={bedrifter} />
					<PaginationContainer
						currentPage={currentPage}
						totalPages={totalPages}
						goToNextPage={goToNextPage}
						goToPreviousPage={goToPreviousPage}
					/>
				</>
			)}
		</section>
	);
}
