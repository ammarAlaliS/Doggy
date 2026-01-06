import { AntigravityBackground } from '@/components/ui/AntigravityBackground';
import { useTheme } from '@/hooks/useTheme';
import { useAuthStore } from '@/stores/auth.store';
import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

export default function Index() {
  const token = useAuthStore((state) => state.token);
  const { theme } = useTheme();
  const [isHydrated, setIsHydrated] = useState(useAuthStore.persist.hasHydrated());

  useEffect(() => {
    const unsubFinish = useAuthStore.persist.onFinishHydration(() => {
      console.log('Index hydrated, token:', useAuthStore.getState().token);
      setIsHydrated(true);
    });

    if (useAuthStore.persist.hasHydrated()) {
      setIsHydrated(true);
    }

    return () => unsubFinish();
  }, []);

  // Wait for hydration
  if (!isHydrated) {
    return (
      <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <AntigravityBackground colors={theme.dark ? ["#040415ff", "#0606dfff"] : ["#E6F3FF", "#51a0e6ff"]} />
      </View>
    );
  }

  // Redirect based on auth state
  if (token) {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/(auth)/welcome" />;
}
