import { Bot, User } from "lucide-react";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant" | "model";
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
  onPdfLinkClick?: (url: string) => void;
}

const ChatMessage = ({ message, onPdfLinkClick }: ChatMessageProps) => {
  const isUser = message.role === "user";
  const isAssistant = message.role === "assistant" || message.role === "model";

  // Parse markdown links [text](url)
  const renderContent = (content: string) => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(content)) !== null) {
      // Add text before the link
      if (match.index > lastIndex) {
        parts.push(
          <span key={`text-${lastIndex}`}>
            {content.substring(lastIndex, match.index)}
          </span>
        );
      }
      
      const url = match[2];
      const linkText = match[1];
      
      // Add the link
      parts.push(
        <a
          key={`link-${match.index}`}
          href={url}
          onClick={(e) => {
            // If it's a PDF link and we have a handler, update preview instead of opening new tab
            if (onPdfLinkClick && (url.includes('.pdf') || linkText.toLowerCase().includes('resume'))) {
              e.preventDefault();
              onPdfLinkClick(url);
            }
          }}
          target="_blank"
          rel="noopener noreferrer"
          className={`underline font-semibold hover:opacity-80 transition-opacity ${
            isUser ? "text-white" : "text-primary"
          }`}
        >
          {linkText}
        </a>
      );
      
      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < content.length) {
      parts.push(
        <span key={`text-${lastIndex}`}>
          {content.substring(lastIndex)}
        </span>
      );
    }

    return parts.length > 0 ? parts : content;
  };

  return (
    <div className={`flex gap-4 ${isUser ? "flex-row-reverse" : "flex-row"} items-start animate-fade-in`}>
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl shadow-medium ${
        isUser ? "gradient-accent" : "bg-card border-2 border-primary"
      }`}>
        {isUser ? (
          <User className="h-5 w-5 text-white" />
        ) : (
          <Bot className="h-5 w-5 text-primary" />
        )}
      </div>
      
      <div className={`rounded-3xl px-6 py-4 max-w-[75%] ${
        isUser 
          ? "gradient-accent text-white rounded-tr-md shadow-glow" 
          : "bg-card border-2 border-primary/20 text-foreground rounded-tl-md shadow-soft"
      }`}>
        <p className="text-base leading-relaxed">{renderContent(message.content)}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
