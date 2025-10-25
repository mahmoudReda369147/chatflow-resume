import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { chatServices, SendMessageRequest } from './chatServices';
import { toast } from 'sonner';

// Query keys
export const CHAT_QUERY_KEYS = {
  ALL_CHATS: ['chats'],
  CHAT_MESSAGES: (chatId: string) => ['chat-messages', chatId],
} as const;

// Hook to get all chats
export const useGetAllChats = () => {
  return useQuery({
    queryKey: CHAT_QUERY_KEYS.ALL_CHATS,
    queryFn: chatServices.getAllChats,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Hook to get messages by chat ID
export const useGetChatMessages = (chatId: string | null) => {
  return useQuery({
    queryKey: CHAT_QUERY_KEYS.CHAT_MESSAGES(chatId || ''),
    queryFn: () => chatServices.getMessagesByChatId(chatId!),
    enabled: !!chatId, // Only fetch if chatId exists
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Hook to send message
export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SendMessageRequest) => chatServices.sendMessage(data),
    onSuccess: (response, variables) => {
      // Invalidate and refetch chats
      queryClient.invalidateQueries({ queryKey: CHAT_QUERY_KEYS.ALL_CHATS });
      
      // If conversationId exists, invalidate that chat's messages
      if (variables.conversationId) {
        queryClient.invalidateQueries({ 
          queryKey: CHAT_QUERY_KEYS.CHAT_MESSAGES(variables.conversationId) 
        });
      }

      // Show success message if resume is generated
      if (response.data.isGenerated) {
        toast.success('Resume generated successfully!');
      }
    },
    onError: (error: unknown) => {
      const errorMessage = (error as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Failed to send message';
      toast.error(errorMessage);
    },
  });
};
