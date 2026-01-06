import { AntigravityBackground } from '@/components/ui/AntigravityBackground';
import { useTheme } from '@/hooks/useTheme';
import { useAuthStore } from '@/stores/auth.store';
import { useRouter } from 'expo-router';
import { PropsWithChildren, useEffect, useState } from 'react';
import { View } from 'react-native';

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
    const router = useRouter();
    const token = useAuthStore((state) => state.token);
    const isTokenValid = useAuthStore((state) => state.isTokenValid);
    const logout = useAuthStore((state) => state.logout);
    const { theme } = useTheme();
    const [isHydrated, setIsHydrated] = useState(useAuthStore.persist.hasHydrated());

    useEffect(() => {
        const unsubFinishHydration = useAuthStore.persist.onFinishHydration(() => {
            setIsHydrated(true);
        });

        if (useAuthStore.persist.hasHydrated()) {
            setIsHydrated(true);
        }

        return () => unsubFinishHydration();
    }, []);

    useEffect(() => {
        if (!isHydrated) return;

        // Check if token exists and is still valid
        if (!token || !isTokenValid()) {
            if (token) {
                // Token expired, clean up
                logout();
            }
            router.replace('/(auth)/welcome');
        }
    }, [isHydrated, token]);

    if (!isHydrated) {
        return (
            <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
                <AntigravityBackground
                    colors={theme.dark ? ["#040415ff", "#0606dfff"] : ["#E6F3FF", "#51a0e6ff"]}
                />
            </View>
        );
    }

    if (!token || !isTokenValid()) {
        return null;
    }

    return <>{children}</>;
};
