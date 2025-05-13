import { memo } from "react";
import { MarkdownContent } from "./MarkdownContent";
import type { Message as UIMessage } from "@ai-sdk/react";

interface ChatMessage extends UIMessage {
	toolResults?: Array<{
		result: {
			products: Product[];
		};
	}>;
}

interface Product {
	id: string;
	title: string;
	brand: string;
	model: string;
	price: number | string;
	category: string;
	product_url: string;
	image_url?: string;
	color?: string;
	capacity?: string;
	memory?: string;
	screen_size?: string;
	weight?: string;
	power?: string;
	features_markdown?: string;
	specifications_markdown?: string;
	view_product_link?: string;
}

interface MessageProps {
	message: ChatMessage;
}

export const Message = memo(({ message }: MessageProps) => {
	return (
		<div
			className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
		>
			<div
				className={`max-w-[85%] rounded-lg p-4 shadow-sm ${
					message.role === "user"
						? "bg-blue-600 text-white"
						: "bg-white text-black"
				}`}
			>
				{message.content ? (
					<MarkdownContent content={message.content} />
				) : (
					<div className="text-sm italic opacity-70">
						Buscando productos...
					</div>
				)}
			</div>
		</div>
	);
});

Message.displayName = "Message"; 