import { AntigravityBackground } from '@/components/ui/AntigravityBackground';
import { useTheme } from '@/hooks/useTheme';
import { useAuthStore } from '@/stores/auth.store';
import { useRouter } from 'expo-router';
import { PropsWithChildren, useEffect, useState } from 'react';
import { View } from 'react-native';

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
    const router = useRouter();
    const token = useAuthStore((state) => state.token);
    const { theme } = useTheme();
    const [isHydrated, setIsHydrated] = useState(useAuthStore.persist.hasHydrated());

    useEffect(() => {
        // Listen for hydration completion
        const unsubFinishHydration = useAuthStore.persist.onFinishHydration(() => {
            console.log('Auth store hydrated, token:', useAuthStore.getState().token);
            setIsHydrated(true);
        });

        // If already hydrated, set immediately
        if (useAuthStore.persist.hasHydrated()) {
            console.log('Already hydrated, token:', token);
            setIsHydrated(true);
        }

        return () => unsubFinishHydration();
    }, []);

    useEffect(() => {
        if (!isHydrated) return;

        console.log('ProtectedRoute check - token:', token);
        if (!token) {
            router.replace('/(auth)/welcome');
        }
    }, [isHydrated, token]);

    // Show loading screen while hydrating
    if (!isHydrated) {
        return (
            <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
                <AntigravityBackground
                    colors={theme.dark ? ["#040415ff", "#0606dfff"] : ["#E6F3FF", "#51a0e6ff"]}
                />
            </View>
        );
    }

    // Don't render children if not authenticated
    if (!token) {
        return null;
    }

    return <>{children}</>;
};
