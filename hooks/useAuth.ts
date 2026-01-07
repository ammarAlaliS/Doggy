import { useRouter } from 'expo-router';
import { useState } from 'react';
import Toast from 'react-native-toast-message';
import { API_CONFIG, getApiUrl } from '../config/api.config';
import { AuthUser, useAuthStore } from '../stores/auth.store';
import { secureStorage } from '../utils/secure-storage';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const login = async (values: { email: string; password: string }, { resetForm, setSubmitting }: any, remember: boolean) => {
    try {
      setIsLoading(true);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT_MS);

      const response = await fetch(getApiUrl('LOGIN'), {
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

      let data;
      try {
        data = JSON.parse(rawText);
      } catch {
        throw new Error(rawText || `Error del servidor (${response.status})`);
      }

      if (!response.ok) {
        throw new Error(data.message || 'Credenciales incorrectas');
      }

      const user: AuthUser = {
        id: data.id,
        email: values.email,
        firstName: data.first_name,
        lastName: data.last_name,
        profileImgUrl: data.profile_img_url,
        isActive: data.isActive,
      };

      setAuth(user, data.token);

      // Handle Remember Me
      if (remember) {
        await secureStorage.setItem('remembered-email', values.email);
      } else {
        await secureStorage.removeItem('remembered-email');
      }

      resetForm();
      router.replace('/(tabs)');

    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: error.name === 'AbortError' ? 'Tiempo de espera agotado' : error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    useAuthStore.getState().logout();
    router.replace('/(auth)/welcome');
  };

  const getRememberedEmail = async () => {
    return await secureStorage.getItem('remembered-email');
  };

  return { login, logout, getRememberedEmail, isLoading };
};
