import DataFetching from "./components/getDataList";
import { Header } from "./components/Header";

export default function Home() {
	return (
		<main className="flex flex-col px-4 font-[family-name:var(--font-geist-sans)]">
			<Header />
			<DataFetching />
		</main>
	);
}
