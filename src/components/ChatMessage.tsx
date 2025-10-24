import { Bot, User } from "lucide-react";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === "user";

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
        <p className="text-base leading-relaxed">{message.content}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
