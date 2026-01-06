import { AntigravityBackground } from '@/components/ui/AntigravityBackground';
import { useTheme } from '@/hooks/useTheme';
import { useAuthStore } from '@/stores/auth.store';
import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

export default function Index() {
  const token = useAuthStore((state) => state.token);
  const isTokenValid = useAuthStore((state) => state.isTokenValid);
  const { theme } = useTheme();
  const [isHydrated, setIsHydrated] = useState(useAuthStore.persist.hasHydrated());

  useEffect(() => {
    const unsubFinish = useAuthStore.persist.onFinishHydration(() => {
      setIsHydrated(true);
    });

    if (useAuthStore.persist.hasHydrated()) {
      setIsHydrated(true);
    }

    return () => unsubFinish();
  }, []);

  if (!isHydrated) {
    return (
      <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <AntigravityBackground colors={theme.dark ? ["#040415ff", "#0606dfff"] : ["#E6F3FF", "#51a0e6ff"]} />
      </View>
    );
  }

  // Check if token exists AND is valid (not expired)
  if (token && isTokenValid()) {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/(auth)/welcome" />;
}
