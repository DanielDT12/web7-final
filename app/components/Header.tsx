import { SearchForm } from "./SearchForm";

export const Header = ({ form, setForm }: any) => {
	return (
		<header className="flex justify-between p-8">
			<h1 className="text-2xl">Web 7 Final</h1>
			<SearchForm form={form} setForm={setForm} />
		</header>
	);
};
