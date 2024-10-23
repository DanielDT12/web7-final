export default function capitalizeKommuneName(name: string): string {
	// ignorerer disse ordene, ellers omformer den string til stor bokstav for eks. "aurskog-høland" - "Aurskog-Høland";
	const exclusions = [
		"og",
		"i",
		"for",
		"til",
		"av",
		"med",
		"som",
		"på",
		"en",
		"et",
		"å",
		"da",
		"de",
		"her",
		"hvor",
		"når",
	];

	return name
		.split(/[\s-]+/)
		.map((word) => {
			if (!exclusions.includes(word.toLowerCase())) {
				return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
			}
			return word.toLowerCase();
		})
		.join(" ");
}
