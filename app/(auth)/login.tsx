import ButtonAuth from '@/components/features/auth/ButtonAuth';
import LoginForm from '@/components/features/auth/LoginForm';
import { AntigravityBackground } from '@/components/ui/AntigravityBackground';
import SingInOption from '@/components/ui/SingInOption';
import { useFontsLoader } from '@/utils/useFontsLoader';
import { useMemo } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../hooks/useTheme';
import { createAppStyles } from '../../theme/styles';

export default function LoginScreen() {
  const { theme } = useTheme();
  const styles = useMemo(() => createAppStyles(theme), [theme]);
  const fontsLoaded = useFontsLoader();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.layout.container}>
      <AntigravityBackground
        colors={
          theme.dark
            ? ["#0606dfff", "#040427", "#040415ff", "#0606dfff", "#101064"]
            : ["#51a0e6ff", "#E6F3FF", "#D6EBFF", "#C2E0FF", "#B3D9FF"]
        }
        blurIntensity={100}
        shapeColor={theme.colors.background}
      />
      <SafeAreaView style={{
        flex: 1,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing.s,

      }}>

        <Text style={[styles.typography.h3,]}>Ingresar</Text>
        <Text style={[styles.typography.label,]}>Te damos la bienvenida nuevamente</Text>
        <LoginForm />
        <SingInOption />
        <View style={{
          gap: theme.spacing.m,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          flex: 1
        }}>
          <ButtonAuth
            icon="google"
            label="Google"
            onPress={() => console.log('Google login')}
          />
          <ButtonAuth
            icon="apple"
            label="Apple"
            onPress={() => console.log('Apple login')}
          />
        </View>
        <View>
          <Text style={[styles.typography.h1, { fontFamily: 'ShadowsIntoLight_400Regular', textAlign: 'center' }]}>Doggy</Text>
        </View>
      </SafeAreaView>
    </View>
  );
}
