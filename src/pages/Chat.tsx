import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Paperclip, Plus, MessageSquare, Menu } from "lucide-react";
import ChatMessage from "@/components/ChatMessage";
import ResumePreview from "@/components/ResumePreview";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

interface ChatHistory {
  id: string;
  title: string;
  lastMessage: string;
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
  const [chatHistory] = useState<ChatHistory[]>([
    { id: "1", title: "Software Engineer Resume", lastMessage: "Great! Now, what is...", timestamp: new Date(Date.now() - 86400000) },
    { id: "2", title: "Product Manager CV", lastMessage: "Let's add your education...", timestamp: new Date(Date.now() - 172800000) },
    { id: "3", title: "UX Designer Portfolio", lastMessage: "Your resume is ready!", timestamp: new Date(Date.now() - 259200000) },
  ]);
  const [currentChatId, setCurrentChatId] = useState("current");
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  const ChatSidebar = () => (
    <div className="h-full flex flex-col bg-card border-r-2 border-border/50">
      <div className="p-4 border-b-2 border-border/50">
        <Button className="w-full gradient-accent shadow-glow gap-2" onClick={() => setCurrentChatId("new-" + Date.now())}>
          <Plus className="h-5 w-5" />
          New Chat
        </Button>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-2">
          {chatHistory.map((chat) => (
            <button
              key={chat.id}
              onClick={() => {
                setCurrentChatId(chat.id);
                setSidebarOpen(false);
              }}
              className={`w-full text-left p-4 rounded-2xl transition-all ${
                currentChatId === chat.id
                  ? "bg-primary text-primary-foreground shadow-medium"
                  : "bg-secondary/50 hover:bg-secondary"
              }`}
            >
              <div className="flex items-start gap-3">
                <MessageSquare className="h-5 w-5 mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm truncate">{chat.title}</h3>
                  <p className="text-xs opacity-70 truncate mt-1">{chat.lastMessage}</p>
                  <p className="text-xs opacity-50 mt-1">
                    {new Date(chat.timestamp).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );

  return (
    <div className="min-h-[calc(100vh-4rem)] flex bg-gradient-to-br from-background to-secondary/20">
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-80">
        <ChatSidebar />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="p-0 w-80">
          <ChatSidebar />
        </SheetContent>
      </Sheet>

      {/* Chat Panel */}
      <div className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <div className="md:hidden border-b-2 border-border/50 p-4 bg-card flex items-center gap-3">
          <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
          </Sheet>
          <h2 className="font-semibold">Resume Chat</h2>
        </div>
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
