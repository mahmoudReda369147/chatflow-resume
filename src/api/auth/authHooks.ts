import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authServices, LoginData, RegisterData, User } from './authServices';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

// Hook for user registration
export const useRegister = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: RegisterData) => authServices.register(data),
    onSuccess: (response) => {
      // Save token to local storage
      authServices.saveToken(response.data.token);
      // Save user to local storage
      authServices.saveUser(response.data.user);
      
      // Show success message
      toast.success(response.message || 'Registration successful');
      
      // Invalidate queries to refetch user data
      queryClient.setQueryData(['user'], response.data.user as User);
      
      // Navigate to home page
      navigate('/');
    },
  });
};

// Hook to get current user from storage/cache
export const useCurrentUser = () => {
  return useQuery<User | null>({
    queryKey: ['user'],
    queryFn: () => Promise.resolve(authServices.getUser()),
    staleTime: Infinity,
    gcTime: Infinity,
  });
};

// Hook for user login
export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: LoginData) => authServices.login(data),
    onSuccess: (response) => {
      // Save token to local storage
      authServices.saveToken(response.data.token);
      // Save user to local storage
      authServices.saveUser(response.data.user);
      
      // Show success message
      toast.success(response.message || 'Login successful');
      
      // Invalidate queries to refetch user data
      queryClient.setQueryData(['user'], response.data.user as User);
      
      // Navigate to home page
      navigate('/');
    },
  });
};

// Hook for user logout
export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return () => {
    // Remove token from local storage
    authServices.removeToken();
    authServices.removeUser();
    
    // Reset user data in cache
    queryClient.setQueryData(['user'], null);
    
    // Show success message
    toast.success('Logged out successfully');
    
    // Navigate to login page
    navigate('/auth');
  };
};