import { BedriftResponse } from "../types/bedrifterType";

interface DataTableProps {
	data: BedriftResponse;
}

export default function DataTable({ data }: DataTableProps) {
	return (
		<table className=" w-[100%] max-w-[65rem] m-auto border border-solid">
			<thead>
				<tr>
					<th className="border-t border border-white p-2 text-left bg-gray-900">
						Navn
					</th>
					<th className="border-t border border-white p-2 text-left bg-gray-900">
						Org.Nr
					</th>
					<th className="border-t border border-white p-2 text-left bg-gray-900">
						Stiftelsesdato
					</th>
				</tr>
			</thead>
			<tbody>
				{data._embedded?.enheter?.map((bedrift) => (
					<tr
						key={bedrift.organisasjonsnummer}
						className={`${
							bedrift.konkurs ? "bg-red-500 bg-opacity-30" : "bg-black"
						}`}
					>
						<td className="p-2 border-t border border-white">{bedrift.navn}</td>
						<td className="p-2 border-t border border-white">
							{bedrift.organisasjonsnummer}
						</td>
						<td className="p-2 border-t border border-white">
							{bedrift.stiftelsesdato}
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
