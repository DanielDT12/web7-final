"use client";

import { useEffect, useState, useRef } from "react";

import { kommuneNavnOgNummer } from "../data/kommuner";

const BASE_URL = "https://data.brreg.no/enhetsregisteret/api/enheter";
const KOMMUNE = "kommunenummer=";
const FRA_DATO = "fraStiftelsesdato=";
const TIL_DATO = "tilStiftelsesdato=";

export default function DataFetching({ form, setForm, pageNumber = 0 }: any) {
	const [bedrifter, setBedrifter] = useState({});

	const [isLoading, setIsloading] = useState(false);
	const [error, setError] = useState(null);

	const abortControllerRef = useRef<AbortController | null>(null); // abortcontroller referanse for og håndtere race conditions

	const kommuneNavnNormalisert =
		form?.kommune.charAt(0).toUpperCase() +
		form?.kommune.slice(1).toLowerCase(); // normalisering av string input fra form

	const kommuneNummer = kommuneNavnOgNummer[kommuneNavnNormalisert] || "ukjent"; // setter string til kommune nr for.eks bergen til 4601

	useEffect(() => {
		if (!form || !form.kommune || !form.year) return;

		const fetchBedrifter = async () => {
			const FORMATED_URL = `${BASE_URL}?${KOMMUNE}${kommuneNummer}&${FRA_DATO}${form.year}-01-01&${TIL_DATO}${form.year}-12-31&page=${pageNumber}`;

			abortControllerRef.current?.abort(); // sjekker om det er en activ abortcontroller, hvis det finnes så kjører den abort
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
	}, [form]);

	console.log(bedrifter);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Something went wrong.</div>;
	}

	return (
		<div className="grid grid-cols-4 gap-8 px-8">
			{bedrifter && Object.keys(bedrifter).length > 0 ? (
				<p>Data Fetching OK</p>
			) : (
				<p>No data</p>
			)}
		</div>
	);
}
