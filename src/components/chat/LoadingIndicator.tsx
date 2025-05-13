import { memo } from "react";

export const LoadingIndicator = memo(() => (
	<div className="flex justify-start">
		<div className="max-w-[80%] rounded-lg bg-white p-4 shadow-sm">
			<div className="flex animate-pulse space-x-2">
				<div className="h-2 w-2 rounded-full bg-gray-500" />
				<div className="h-2 w-2 rounded-full bg-gray-500" />
				<div className="h-2 w-2 rounded-full bg-gray-500" />
			</div>
		</div>
	</div>
));

LoadingIndicator.displayName = "LoadingIndicator"; 