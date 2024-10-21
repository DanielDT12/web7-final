interface BedriftData {
	organisasjonsnummer: string;
	navn: string;
	stiftelsesdato: string;
	konkurs: boolean;
}

interface PageNumberInfo {
	sizeOfElementsIncluded: number;
	totalElements: number;
	totalPages: number;
	pageNumber: number;
}

export interface BedriftResponse {
	_embedded: {
		enheter: BedriftData[];
	};
	page: PageNumberInfo;
}
