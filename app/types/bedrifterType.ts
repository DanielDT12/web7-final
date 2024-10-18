interface BedriftData {
	organisasjonsnummer: string;
	navn: string;
	stiftelsesdato: string;
	konkurs: boolean;
}

export interface BedriftResponse {
	_embedded: {
		enheter: BedriftData[];
	};
}
