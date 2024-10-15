import { Button } from "../UI/Button";

export const SearchForm = () => {
	return (
		<form className="flex gap-4">
			<input
				type="text"
				name="kommune"
				id="kommune"
				placeholder="Søk etter kommune"
			/>
			<input type="text" name="år" id="år" placeholder="år" />
			<Button type="submit" text="Submit" fontSize="xl">
				Submit
			</Button>
		</form>
	);
};
