import { memo, useCallback } from "react";
import { ChevronRight } from "lucide-react";

interface SuggestionProps {
	text: string;
	onClick: (text: string) => void;
}

export const Suggestion = memo(({ text, onClick }: Readonly<SuggestionProps>) => {
	const handleClick = useCallback(() => onClick(text), [onClick, text]);
	
	return (
		<button
			type="button"
			onClick={handleClick}
			className="flex w-full items-center rounded-lg border bg-background p-3 text-left text-sm shadow-sm transition-colors hover:bg-muted/50"
		>
			<span className="flex-1">{text}</span>
			<ChevronRight className="h-4 w-4 text-muted-foreground" />
		</button>
	);
});

Suggestion.displayName = "Suggestion"; 