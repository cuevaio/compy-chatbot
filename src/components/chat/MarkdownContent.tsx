import { memo, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";
import { Button } from "../ui/button";
import { ExternalLink } from "lucide-react";

interface MarkdownContentProps {
	content: string;
}

export const MarkdownContent = memo(({ content }: MarkdownContentProps) => {
	const components = useMemo<Components>(() => ({
		img: (props: any) => (
			<img
				{...props}
				alt={props.alt ?? "Product image"}
				className="relative mx-auto my-2 max-h-[300px] rounded-md object-contain"
				loading="lazy"
			/>
		),
		table: (props: any) => (
			<table
				className="my-4 min-w-full divide-y divide-gray-300 overflow-x-auto rounded-lg border"
				{...props}
			/>
		),
		thead: (props: any) => <thead className="bg-gray-100" {...props} />,
		th: (props: any) => (
			<th
				className="px-3 py-2 text-left font-medium text-gray-700 text-xs uppercase tracking-wider"
				{...props}
			/>
		),
		td: (props: any) => (
			<td
				className="whitespace-normal border-t px-3 py-2 text-gray-500 text-sm"
				{...props}
			/>
		),
		tr: (props: any) => <tr className="even:bg-gray-50" {...props} />,
		a: (props: any) => {
			const isViewProductLink = props.href.includes("compy.pe/galeria/producto");
			if (isViewProductLink) {
				return (
					<Button variant="outline" size="sm" asChild className="mt-3 w-full">
						<a
							{...props}
							className="flex items-center justify-center gap-2"
							target="_blank"
							rel="noopener noreferrer"
						>
							{props.children}
							<ExternalLink size={14} />
						</a>
					</Button>
				);
			}
			return (
				<a
					{...props}
					className="text-blue-600 hover:underline focus:outline-none"
				/>
			);
		},
	}), []);

	return (
		<div className="prose prose-sm max-w-none overflow-x-auto">
			<ReactMarkdown
				remarkPlugins={[remarkGfm]}
				rehypePlugins={[rehypeRaw, rehypeSanitize]}
				components={components}
			>
				{content}
			</ReactMarkdown>
		</div>
	);
});

MarkdownContent.displayName = "MarkdownContent"; 