// React Integration (e.g. inside App.tsx or index.html)
import { useEffect } from "react";

export function SimpleAIChatWidget() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://simple-ai-agent-frontend.vercel.app/widget/chat-widget.js";
    script.setAttribute("data-agent-id", "agent_4c764b2cac30");
    script.setAttribute("data-api-base", "https://simple-ai-agent-frontend.vercel.app");
    script.setAttribute("data-position", "bottom-right");
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
}