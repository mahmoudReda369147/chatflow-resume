// Chat API endpoints
export const CHAT_ENDPOINTS = {
  GET_ALL_CHATS: '/chat',
  GET_CHAT_MESSAGES: (chatId: string) => `/chat/${chatId}`,
  SEND_MESSAGE: '/chat',
} as const;
