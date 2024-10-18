"use client";

import DataFetching from "./components/getDataList";
import { Header } from "./components/Header";
import { useState } from "react";

export default function Home() {
	const [form, setForm] = useState({
		kommune: "",
		year: "",
	});
	return (
		<div className="flex flex-col px-4 font-[family-name:var(--font-geist-sans)]">
			<Header form={form} setForm={setForm} />
			<DataFetching form={form} setForm={setForm} />
		</div>
	);
}
