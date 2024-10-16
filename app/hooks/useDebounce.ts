import { useEffect, useState } from "react";

export const useDebounce = <T>(value: T, delay = 500) => {
	const [debouncedValue, setDebouncedValue] = useState<T>(value);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => clearTimeout(timeout);
	}, [value, delay]);

	return debouncedValue;
};

/**
 * Debounce hook
 *
 * Tar input og delayer signalet slik at man kan velge selv hvilken oppdaterings syklus man vil ha
 * Default vaule er 500ms,
 *
 * <T> er typescript generic type, betyr at typescript kan selv referere ut hvilken type som kommer inn.
 * kan vere greit hvis man vil bruke denne hooken til forskjellige datatyper.
 */
