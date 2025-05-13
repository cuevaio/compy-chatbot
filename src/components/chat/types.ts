import type { Message as UIMessage } from "@ai-sdk/react";

export interface Product {
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

export interface ChatMessage extends UIMessage {
	toolResults?: Array<{
		result: {
			products: Product[];
		};
	}>;
} 