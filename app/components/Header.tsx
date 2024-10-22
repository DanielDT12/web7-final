import { SearchForm } from "./SearchForm";

export const Header = () => {
	return (
		<header className="flex flex-col justify-between items-center gap-4 p-8 max-w-[65rem] m-auto">
			<h1 className="text-2xl leading-none">Web 7 Final</h1>
			<SearchForm />
		</header>
	);
};
