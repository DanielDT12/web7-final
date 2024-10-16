"use client";

import { useEffect, useState, useRef } from "react";

const BASE_URL = "https://data.brreg.no/enhetsregisteret/api/enheter";

export default function DataFetching() {
	const [bedrifter, setBedrifter] = useState({});

	const [isLoading, setIsloading] = useState(false);
	const [error, setError] = useState(null);

	const abortControllerRef = useRef<AbortController | null>(null);

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
