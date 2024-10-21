"use client";

import DataFetching from "./components/getDataList";
import { Header } from "./components/Header";
import { BedriftDataApiProvider } from "./context/bedriftApiContext";

export default function Home() {
	return (
		<BedriftDataApiProvider>
			<div className="flex flex-col px-4 font-[family-name:var(--font-geist-sans)]">
				<Header />
				<DataFetching />
			</div>
		</BedriftDataApiProvider>
	);
}
