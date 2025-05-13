"use client";

import { useChat } from "@ai-sdk/react";
import { useCallback, useEffect, useMemo } from "react";
import { ChatInput } from "./components/chat/ChatInput";
import { LoadingIndicator } from "./components/chat/LoadingIndicator";
import { Message } from "./components/chat/Message";
import { SuggestionsList } from "./components/chat/SuggestionsList";
import { WelcomeMessage } from "./components/chat/WelcomeMessage";
import type { ChatMessage } from "./components/chat/types";

export default function ChatPage() {
	const {
		messages,
		input,
		handleInputChange,
		handleSubmit,
		status,
		stop,
		error,
	} = useChat({
		maxSteps: 3,
		api: import.meta.env.VITE_API_URL,
	});

	// Handle suggestion clicks
	const handleSuggestionClick = useCallback((text: string) => {
		handleInputChange({
			target: { value: text },
		} as React.ChangeEvent<HTMLInputElement>);
	}, [handleInputChange]);

	// Add event listener for suggestion clicks
	useEffect(() => {
		const handleSuggestionEvent = (e: CustomEvent) => {
			handleSuggestionClick(e.detail);
		};

		window.addEventListener('suggestion-click', handleSuggestionEvent as EventListener);
		return () => {
			window.removeEventListener('suggestion-click', handleSuggestionEvent as EventListener);
		};
	}, [handleSuggestionClick]);

	// Check if the error is a rate limit error
	const isRateLimitError = useMemo(() => 
		error && /429|too many requests/i.test(String(error.message || "")),
		[error]
	);

	// Get retry time from error response
	const getRetrySeconds = useCallback(() => {
		if (!error) return 60;

		try {
			if (typeof error.message === "string" && error.message.includes("resetSeconds")) {
				const match = RegExp(/"resetSeconds":(\d+)/).exec(error.message);
				if (match?.[1]) {
					return Number.parseInt(match[1], 10);
				}
			}

			if (typeof error.message === "string" && error.message.includes("reset")) {
				const match = RegExp(/"reset":"([^"]+)"/).exec(error.message);
				if (match?.[1]) {
					const resetTime = new Date(match[1]).getTime();
					const now = Date.now();
					return Math.max(1, Math.ceil((resetTime - now) / 1000));
				}
			}
		} catch (e) {
			console.error(e);
		}

		return 60;
	}, [error]);

	// Format the wait time message
	const formatRateLimitMessage = useCallback(() => {
		const seconds = getRetrySeconds();
		return `Please try again in ${seconds} second${seconds !== 1 ? "s" : ""}.`;
	}, [getRetrySeconds]);

	return (
		<div className="mx-auto flex h-[90vh] w-full max-w-5xl flex-col p-6">
			<h1 className="mb-6 font-bold text-2xl">Compy AI</h1>

			<div className="mb-6 flex-1 space-y-4 overflow-y-auto rounded-lg border bg-gray-50 p-6 shadow-sm">
				{messages.length === 0 ? (
					<WelcomeMessage />
				) : (
					messages.map((message: ChatMessage) => (
						<Message key={message.id} message={message} />
					))
				)}

				{status === "streaming" &&
					messages[messages.length - 1]?.role !== "assistant" && (
						<LoadingIndicator />
					)}
			</div>

			<div className="space-y-4">
				{messages.length === 0 && <SuggestionsList />}

				<ChatInput
					input={input}
					onInputChange={handleInputChange}
					onSubmit={handleSubmit}
					status={status}
					onStop={stop}
				/>

				{isRateLimitError && (
					<div className="mt-2 rounded-md bg-red-50 p-3 text-red-600 shadow-sm">
						<div className="flex items-center gap-2 font-medium">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								aria-hidden="true"
							>
								<circle cx="12" cy="12" r="10" />
								<line x1="12" y1="8" x2="12" y2="12" />
								<line x1="12" y1="16" x2="12.01" y2="16" />
							</svg>
							Rate limit exceeded
						</div>
						<p className="mt-1 text-sm">
							You've reached the maximum number of requests allowed.{" "}
							{formatRateLimitMessage()}
						</p>
					</div>
				)}
			</div>
		</div>
	);
}