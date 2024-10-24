import { FC, ButtonHTMLAttributes } from "react";

// FC = React Functional Component type

type FontSize =
	| "xs"
	| "sm"
	| "md"
	| "lg"
	| "xl"
	| "2xl"
	| "3xl"
	| "4xl"
	| "5xl"
	| "6xl"
	| "7xl"
	| "8xl"
	| "9xl";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	// interface for og legge til props til default HTML ATTRIBUTES
	className?: string;
	fontSize?: FontSize;
}

// Record<KEY, VALUE> type setter typen til tailwindFontSizes til type FontSize, som har en value som er string.
const tailwindFontSizes: Record<FontSize, string> = {
	xs: "text-xs", // 0.75rem (12px)
	sm: "text-sm", // 0.875rem (14px)
	md: "text-md", // 1rem (16px)
	lg: "text-lg", // 1.125rem (18px)
	xl: "text-xl", // 1.25rem (20px)
	"2xl": "text-2xl", // 1.5rem (24px)
	"3xl": "text-3xl", // 1.875rem (30px)
	"4xl": "text-4xl", // 2.25rem (36px)
	"5xl": "text-5xl", // 3rem (48px)
	"6xl": "text-6xl", // 3.75rem (60px)
	"7xl": "text-7xl", // 4.5rem (72px)
	"8xl": "text-8xl", // 6rem (96px)
	"9xl": "text-9xl", // 8rem (128px)
};

export const Button: FC<ButtonProps> = ({
	children,
	fontSize = "md", // sett fontsize til default md tailwind class
	className = "", // clasname for og legge til eventuell custom styling
	...props
}) => {
	// spread opperator for og spre default html attrbiutes til custom button component
	const fontSizeClass = tailwindFontSizes[fontSize];

	return (
		<button
			className={`border border-solid border-white px-[1em] py-[.5em] rounded-xl hover:bg-gray-800 ${fontSizeClass} ${className}`}
			{...props}
		>
			{children}
		</button>
	);
};
