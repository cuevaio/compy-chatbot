import { memo, useCallback } from "react";
import { Suggestion } from "./Suggestion";

export const SuggestionsList = memo(() => {
	const handleSuggestionClick = useCallback((text: string) => {
		window.dispatchEvent(new CustomEvent('suggestion-click', { detail: text }));
	}, []);

	return (
		<div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
			<Suggestion
				text="Smartphones de gama media por menos de 800 soles"
				onClick={handleSuggestionClick}
			/>
			<Suggestion
				text="Televisores LG de 60 pulgadas"
				onClick={handleSuggestionClick}
			/>
			<Suggestion
				text="Televisores OLED de 55 pulgadas"
				onClick={handleSuggestionClick}
			/>
			<Suggestion
				text="iPhone 12 o 13 por menos de 2000 soles"
				onClick={handleSuggestionClick}
			/>
		</div>
	);
});

SuggestionsList.displayName = "SuggestionsList"; 