import { memo, useCallback } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Send, Square } from "lucide-react";

interface ChatInputProps {
	input: string;
	onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	onSubmit: (e: React.FormEvent) => void;
	status: string;
	onStop: () => void;
}

export const ChatInput = memo(({ 
	input, 
	onInputChange, 
	onSubmit, 
	status, 
	onStop 
}: ChatInputProps) => {
	const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			onSubmit(e as unknown as React.FormEvent);
		}
	}, [onSubmit]);

	return (
		<form onSubmit={onSubmit} className="relative">
			<Textarea
				value={input}
				onChange={onInputChange}
				placeholder="Pregunta sobre productos..."
				className="max-h-[120px] min-h-[50px] flex-1 resize-none rounded-lg pr-12"
				onKeyDown={handleKeyDown}
			/>
			<div className="absolute right-2 bottom-2">
				{status === "streaming" ? (
					<Button
						type="button"
						size="icon"
						variant="ghost"
						onClick={onStop}
						className="h-8 w-8 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
					>
						<Square className="h-4 w-4" />
					</Button>
				) : (
					<Button
						type="submit"
						size="icon"
						disabled={!input.trim()}
						className="h-8 w-8 rounded-full bg-blue-600 text-white hover:bg-blue-700"
					>
						<Send className="h-4 w-4" />
					</Button>
				)}
			</div>
		</form>
	);
});

ChatInput.displayName = "ChatInput"; 