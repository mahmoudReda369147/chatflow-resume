import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Paperclip, Plus, MessageSquare, Menu, Loader2, FileText } from "lucide-react";
import ChatMessage from "@/components/ChatMessage";
import ResumePreview from "@/components/ResumePreview";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useGetAllChats, useGetChatMessages, useSendMessage } from "@/api/chat/chatHooks";
import { Message as ApiMessage } from "@/api/chat/chatServices";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { CHAT_QUERY_KEYS } from "@/api/chat/chatHooks";
import { useLanguage } from "@/contexts/LanguageContext";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant" | "model";
  timestamp: Date;
}

interface ChatHistory {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
}

interface GeneratedResume {
  pdfUrl?: string;
  htmlCode?: string;
}

// Simple media query hook for runtime checks (prevents mounting components on larger screens)
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia(query);
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    setMatches(mql.matches);
    mql.addEventListener?.('change', listener);
    return () => mql.removeEventListener?.('change', listener);
  }, [query]);
  return matches;
};

const Chat = () => {
  const { chatId } = useParams<{ chatId?: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [currentChatId, setCurrentChatId] = useState<string | null>(chatId || null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [generatedResume, setGeneratedResume] = useState<GeneratedResume | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isMdUp = useMediaQuery('(min-width: 768px)');

  // Sync currentChatId with URL params
  useEffect(() => {
    setCurrentChatId(chatId || null);
  }, [chatId]);

  // API hooks
  const { data: chatsData, isLoading: isLoadingChats, refetch: refetchChats } = useGetAllChats();
  const { data: messagesData, isLoading: isLoadingMessages } = useGetChatMessages(currentChatId);
  const sendMessageMutation = useSendMessage();

  const chatHistory: ChatHistory[] = chatsData?.data?.map((chat) => ({
    id: chat.id,
    title: chat.lastMessage || "New Chat",
    lastMessage: "Click to view messages",
    timestamp: new Date(chat.updatedAt),
  })) || [];

  // Scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load messages when chat is selected
  useEffect(() => {
    if (messagesData?.data) {
      const formattedMessages: Message[] = [];
      let lastPdfUrl: string | null = null;
      
      messagesData.data.forEach((msg: ApiMessage) => {
        let content = msg.content;
        const pdfUrl: string | null = msg.pdfUrl;
        
        // Parse JSON content from model messages
        if (msg.role === "model") {
          try {
            const jsonMatch = msg.content.match(/```json\n([\s\S]*?)\n```/);
            if (jsonMatch) {
              const parsed = JSON.parse(jsonMatch[1]);
              content = parsed.message || msg.content;
            }
          } catch (e) {
            // If parsing fails, use original content
            content = msg.content;
          }
        }

        // Add the main message
        formattedMessages.push({
          id: msg.id,
          content,
          role: msg.role === "model" ? "assistant" : msg.role,
          timestamp: new Date(msg.createdAt),
        });
        
        // Add PDF link message if PDF URL exists
        if (pdfUrl) {
          formattedMessages.push({
            id: `${msg.id}-pdf`,
            content: `[Download Your Resume](${pdfUrl})`,
            role: "assistant",
            timestamp: new Date(msg.createdAt),
          });
          // Keep track of the last PDF URL
          lastPdfUrl = pdfUrl;
        }
      });
      
      setMessages(formattedMessages);
      
      // Auto-load the last PDF in preview when entering chat
      if (lastPdfUrl) {
        setGeneratedResume({
          pdfUrl: lastPdfUrl,
          htmlCode: undefined,
        });
      }
    } else if (!currentChatId) {
      // Show welcome message for new chat
      setMessages([
        {
          id: "welcome",
          content: t("welcomeAssistant"),
          role: "assistant",
          timestamp: new Date(),
        },
      ]);
    }
  }, [messagesData, currentChatId, t]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || sendMessageMutation.isPending) return;

    const messageText = inputMessage;
    const isNewChat = !currentChatId; // Track if this is a new chat
    
    const userMessage: Message = {
      id: `temp-${Date.now()}`,
      content: messageText,
      role: "user",
      timestamp: new Date(),
    };

    // Add user message optimistically
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");

    try {
      const response = await sendMessageMutation.mutateAsync({
        message: messageText,
        conversationId: currentChatId || undefined,
      });

      // Handle response
      if (response.data.isGenerated) {
        // Resume was generated
        setGeneratedResume({
          pdfUrl: response.data.pdfUrl,
          htmlCode: response.data.htmlCode,
        });

        // Add success message with PDF link if available
        const successMessage: Message = {
          id: `success-${Date.now()}`,
          content: t("resumeGeneratedSuccess"),
          role: "assistant",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, successMessage]);

        // Add PDF link message if PDF URL exists
        if (response.data.pdfUrl) {
          const pdfLinkMessage: Message = {
            id: `pdf-${Date.now()}`,
            content: `[${t("downloadYourResume")}](${response.data.pdfUrl})`,
            role: "assistant",
            timestamp: new Date(),
          };
          setTimeout(() => {
            setMessages((prev) => [...prev, pdfLinkMessage]);
          }, 100);
        }
      } else {
        // Regular message response
        const aiMessage: Message = {
          id: `ai-${Date.now()}`,
          content: response.data.message || "I received your message.",
          role: "assistant",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMessage]);
      }

      // If this was a new chat, navigate to the first chat after successful response
      if (isNewChat) {
        // Refetch chats and navigate to the first one
        setTimeout(async () => {
          const { data: updatedChatsData } = await refetchChats();
          if (updatedChatsData?.data && updatedChatsData.data.length > 0) {
            // Navigate to the first chat (most recent)
            navigate(`/chat/${updatedChatsData.data[0].id}`);
          }
        }, 500);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      // Remove the optimistic user message on error
      setMessages((prev) => prev.filter((msg) => msg.id !== userMessage.id));
    }
  };

  const handleNewChat = () => {
    navigate('/chat');
    setCurrentChatId(null);
    setMessages([
      {
        id: "welcome",
        content: t("welcomeAssistant"),
        role: "assistant",
        timestamp: new Date(),
      },
    ]);
    setGeneratedResume(null);
    setSidebarOpen(false);
  };

  const handleChatSelect = (chatId: string) => {
    navigate(`/chat/${chatId}`);
    setSidebarOpen(false);
  };

  const ChatSidebar = () => (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-card border-r-2 border-border/50">
      <div className="p-4 border-b-2 border-border/50 shrink-0">
        <Button dir="ltr" className="w-full gradient-accent shadow-glow gap-2" onClick={handleNewChat}>
          <Plus className="h-5 w-5" />
          {t("newChat")}
        </Button>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-4">
          {isLoadingChats ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : chatHistory.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground text-sm">
              {t("noChatsYet")} {t("startConversation")}
            </div>
          ) : (
            <div className="space-y-2">
              {chatHistory.map((chat) => (
                <button
                  key={chat.id}
                  onClick={() => handleChatSelect(chat.id)}
                  className={`w-full text-left p-4 rounded-2xl transition-all ${
                    currentChatId === chat.id
                      ? "bg-primary text-primary-foreground shadow-medium"
                      : "bg-secondary/50 hover:bg-secondary"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <MessageSquare className="h-5 w-5 mt-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm truncate">
    {chat.title
      ? chat.title.split(" ").slice(0, 3).join(" ") +
        (chat.title.split(" ").length > 3 ? "..." : "")
      : ""}
  </h3>
                      <p className="text-xs opacity-70 truncate mt-1">{t("clickToViewMessages")}</p>
                      <p className="text-xs opacity-50 mt-1">
                        {new Date(chat.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );

  return (
    <div className="min-h-[calc(100vh-4rem)] flex bg-gradient-to-br from-background to-secondary/20">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block lg:w-1/4">
        <ChatSidebar />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="p-0 w-80">
          <ChatSidebar />
        </SheetContent>
      </Sheet>

      {/* Chat Panel */}
      <div className="flex-1 lg:w-1/2 flex flex-col h-[calc(100vh-4rem)]">
        {/* Mobile Header */}
        <div className="lg:hidden border-b-2 border-border/50 p-4 bg-card flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
            </Sheet>
            <h2 className="font-semibold">{t("resumeChat")}</h2>
          </div>
          <div>
            {!isMdUp && generatedResume?.pdfUrl && (
              <Sheet open={previewOpen} onOpenChange={setPreviewOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <FileText className="h-4 w-4" />
                    {t("preview")}
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="p-0 w-full sm:max-w-xl ">
                  <ResumePreview generatedResume={generatedResume} />
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
        
        {/* Messages Area - Scrollable */}
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-6">
            {isLoadingMessages ? (
              <div className="flex items-center justify-center h-full min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <>
                {messages.map((message) => (
                  <ChatMessage 
                    key={message.id} 
                    message={message}
                    onPdfLinkClick={(url) => {
                      setGeneratedResume({
                        pdfUrl: url,
                        htmlCode: undefined,
                      });
                      // Open preview on mobile when clicking PDF link
                      setPreviewOpen(true);
                    }}
                  />
                ))}
                {sendMessageMutation.isPending && (
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
                <div ref={messagesEndRef} />
              </>
            )}
          </div>
        </ScrollArea>

        {/* Input Area - Fixed at Bottom */}
        <div className="border-t-2 border-border/50 p-6 bg-card/80 backdrop-blur-sm shrink-0">
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
              placeholder={t("typeYourMessage")}
              className="flex-1 h-12 rounded-2xl border-2 px-5 text-base focus:border-primary"
            />
            <Button 
              onClick={handleSendMessage}
              disabled={sendMessageMutation.isPending || !inputMessage.trim()}
              className="gradient-accent shrink-0 h-12 w-12 rounded-2xl shadow-glow hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
              size="icon"
            >
              {sendMessageMutation.isPending ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Resume Preview Panel */}
      <div className="hidden md:block md:w-1/2 lg:w-1/4 border-l-2 border-border/50 bg-gradient-to-br from-card to-secondary/30 h-[calc(100vh-4rem)]">
        <div className="h-full">
          <ResumePreview generatedResume={generatedResume} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
