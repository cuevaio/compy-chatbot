import { memo } from "react";
import { Sparkles } from "lucide-react";

export const WelcomeMessage = memo(() => (
	<div className="flex h-full flex-col items-center justify-center gap-3">
		<div className="flex items-center gap-2 text-gray-400">
			<Sparkles className="h-8 w-8" />
			<span className="text-2xl">Compy AI</span>
		</div>
	</div>
));

WelcomeMessage.displayName = "WelcomeMessage"; 