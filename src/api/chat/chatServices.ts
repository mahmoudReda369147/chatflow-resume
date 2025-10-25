import api from '../makeApiCall';

// Types
export interface Chat {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string | null;
  userId: string;
}

export interface Message {
  id: string;
  createdAt: string;
  role: 'user' | 'model';
  content: string;
  conversationId: string;
  pdfUrl?: string;
}

export interface SendMessageRequest {
  message: string;
  conversationId?: string;
}

export interface SendMessageResponse {
  success: boolean;
  message: string;
  data: {
    isGenerated: boolean;
    pdfUrl?: string;
    htmlCode?: string;
    message?: string;
    code?: string | null;
  };
}

export interface GetChatsResponse {
  success: boolean;
  message: string;
  data: Chat[];
}

export interface GetMessagesResponse {
  success: boolean;
  message: string;
  data: Message[];
}

// API Services
export const chatServices = {
  // Get all chats
  getAllChats: async (): Promise<GetChatsResponse> => {
    const response = await api.get<GetChatsResponse>('/chat');
    return response.data;
  },

  // Get messages by chat ID
  getMessagesByChatId: async (chatId: string): Promise<GetMessagesResponse> => {
    const response = await api.get<GetMessagesResponse>(`/chat/${chatId}`);
    return response.data;
  },

  // Send message
  sendMessage: async (data: SendMessageRequest): Promise<SendMessageResponse> => {
    const response = await api.post<SendMessageResponse>('/chat', data);
    return response.data;
  },
};
