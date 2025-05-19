import { memo, useCallback } from "react";
import { Suggestion } from "./Suggestion";

export const SuggestionsList = memo(() => {
	const handleSuggestionClick = useCallback((text: string) => {
		window.dispatchEvent(new CustomEvent('suggestion-click', { detail: text }));
	}, []);

	return (
		<div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
			<Suggestion
				text="Cámara Sony Alpha A7"
				onClick={handleSuggestionClick}
			/>
			<Suggestion
				text="Televisores OLED de 55 pulgadas"
				onClick={handleSuggestionClick}
			/>
			<Suggestion
				text="Google Pixel 9"
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