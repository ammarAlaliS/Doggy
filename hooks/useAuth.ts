import { useRouter } from 'expo-router';
import { useState } from 'react';
import Toast from 'react-native-toast-message';
import { useAuthStore } from '../stores/auth.store';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const login = async (values: { email: string; password: string }, { resetForm }: any) => {
    try {
      setIsLoading(true);
      console.log('Starting login request...');
      
      // Timeout controller
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout
      
      const response = await fetch('https://obbaramarket-backend.onrender.com/api/ObbaraMarket/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      
      const rawText = await response.text();
      console.log('Raw Response Status:', response.status);
      console.log('Raw Response Body:', rawText);
      
      // Try to parse as JSON
      let data;
      try {
        data = JSON.parse(rawText);
      } catch {
        throw new Error(rawText || `Error del servidor (${response.status})`);
      }
      
      console.log('Login Response:', data);

      if (!response.ok) {
        throw new Error(data.message || 'Credenciales incorrectas');
      }

      
      const user = { id: data.id || data.user?.id, email: data.email || data.user?.email, name: data.name || data.user?.name };
      const token = data.token || data.accessToken;
      
      setAuth(user, token);

      Toast.show({
        type: 'success',
        text1: 'Inicio de sesión exitoso',
      });

      resetForm();
      router.replace('/(tabs)');

    } catch (error: any) {
      console.log('Login Error:', error.message);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.name === 'AbortError' ? 'Tiempo de espera agotado' : error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };


  const logout = () => {
    useAuthStore.getState().logout();
    router.replace('/(auth)/welcome');
  };

  return { login, logout, isLoading };
};

