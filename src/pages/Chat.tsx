import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Paperclip } from "lucide-react";
import ChatMessage from "@/components/ChatMessage";
import ResumePreview from "@/components/ResumePreview";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your AI resume assistant. I'll help you create a professional resume by asking you a few questions. Let's start with your name. What should I call you?",
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      role: "user",
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Great! Now, what is your current job title or the position you're applying for?",
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex bg-gradient-to-br from-background to-secondary/20">
      {/* Chat Panel */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isTyping && (
            <div className="flex gap-3 items-start animate-fade-in">
              <div className="bg-card border-2 border-primary/20 rounded-3xl rounded-tl-md px-6 py-4 max-w-[80%] shadow-soft">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-primary animate-bounce"></div>
                  <div className="h-2.5 w-2.5 rounded-full bg-primary animate-bounce [animation-delay:0.2s]"></div>
                  <div className="h-2.5 w-2.5 rounded-full bg-primary animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t-2 border-border/50 p-6 bg-card/80 backdrop-blur-sm">
          <div className="flex gap-3 max-w-4xl mx-auto">
            <Button 
              variant="outline" 
              size="icon" 
              className="shrink-0 h-12 w-12 rounded-2xl border-2 hover:border-primary hover:bg-primary/10"
            >
              <Paperclip className="h-5 w-5" />
            </Button>
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1 h-12 rounded-2xl border-2 px-5 text-base focus:border-primary"
            />
            <Button 
              onClick={handleSendMessage}
              className="gradient-accent shrink-0 h-12 w-12 rounded-2xl shadow-glow hover:scale-105 transition-transform"
              size="icon"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Resume Preview Panel */}
      <div className="hidden lg:block w-[500px] border-l-2 border-border/50 bg-gradient-to-br from-card to-secondary/30">
        <ResumePreview />
      </div>
    </div>
  );
};

export default Chat;
