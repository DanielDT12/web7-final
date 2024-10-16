"use client";

import { useEffect, useState, useRef } from "react";

import { kommuneNavnOgNummer } from "../data/kommuner";

const BASE_URL = "https://data.brreg.no/enhetsregisteret/api/enheter";
const KOMMUNE = "kommunenummer=";
const FRA_DATO = "fraStiftelsesdato=";
const TIL_DATO = "tilStiftelsesdato=";

export default function DataFetching({ form, setForm, pageNumber }: any) {
	const [bedrifter, setBedrifter] = useState({});

	const [isLoading, setIsloading] = useState(false);
	const [error, setError] = useState(null);

	const abortControllerRef = useRef<AbortController | null>(null);

	const kommuneNavnNormalisert =
		form.kommune.charAt(0).toUpperCase() + form.kommune.slice(1).toLowerCase();
	const kommuneNummer = kommuneNavnOgNummer[kommuneNavnNormalisert] || "ukjent";

	useEffect(() => {
		const fetchBedrifter = async () => {
			abortControllerRef.current?.abort();
			abortControllerRef.current = new AbortController();

			setIsloading(true);
			setError(null);

			try {
				const res = await fetch(BASE_URL, {
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
	}, []);

	const FORMATED_URL = `${BASE_URL}?${KOMMUNE}${kommuneNummer}&${FRA_DATO}${form.year}-01-01&${TIL_DATO}${form.year}-12-31&page=0`;
	console.log(FORMATED_URL);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Something went wrong.</div>;
	}

	return (
		<div className="grid grid-cols-4 gap-8 px-8">
			<p></p>
		</div>
	);
}
