import { BedriftResponse } from "../types/bedrifterType";

interface DataTableProps {
	data: BedriftResponse;
}

export default function DataTable({ data }: DataTableProps) {
	return (
		<table className="border border-solid border-red-600 w-[100%]">
			<thead>
				<tr>
					<th>Navn</th>
					<th>Org.Nr</th>
					<th>Stiftelsesdato</th>
				</tr>
			</thead>
			<tbody>
				{data._embedded?.enheter?.map((bedrift) => (
					<tr key={bedrift.organisasjonsnummer}>
						<td>{bedrift.navn}</td>
						<td>{bedrift.organisasjonsnummer}</td>
						<td>{bedrift.stiftelsesdato}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
