import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { StateStorage } from 'zustand/middleware';

const KEYS = {
    AUTH: 'auth-secure-storage',
    REMEMBERED_EMAIL: 'remembered-email',
} as const;

/**
 * Secure Storage for sensitive data (tokens, credentials)
 * Uses expo-secure-store on native, falls back to in-memory on web
 */
export const secureStorage: StateStorage = {
    getItem: async (name: string): Promise<string | null> => {
        if (Platform.OS === 'web') {
            // Web fallback - use localStorage (less secure but functional)
            return localStorage.getItem(name);
        }
        return await SecureStore.getItemAsync(name);
    },

    setItem: async (name: string, value: string): Promise<void> => {
        if (Platform.OS === 'web') {
            localStorage.setItem(name, value);
            return;
        }
        await SecureStore.setItemAsync(name, value);
    },

    removeItem: async (name: string): Promise<void> => {
        if (Platform.OS === 'web') {
            localStorage.removeItem(name);
            return;
        }
        await SecureStore.deleteItemAsync(name);
    },
};

/**
 * JWT Token utilities
 */
export const jwtUtils = {
    /**
     * Decode JWT payload without verification
     */
    decode: (token: string): { exp?: number; iat?: number; id?: string } | null => {
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                    .join('')
            );
            return JSON.parse(jsonPayload);
        } catch {
            return null;
        }
    },

    /**
     * Check if token is expired
     */
    isExpired: (token: string): boolean => {
        const payload = jwtUtils.decode(token);
        if (!payload?.exp) return false;

        const now = Math.floor(Date.now() / 1000);
        return payload.exp < now;
    },

    /**
     * Get time until expiration in seconds
     */
    getExpiresIn: (token: string): number | null => {
        const payload = jwtUtils.decode(token);
        if (!payload?.exp) return null;

        const now = Math.floor(Date.now() / 1000);
        return Math.max(0, payload.exp - now);
    },
};
