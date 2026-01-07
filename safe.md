import { AntigravityBackground } from '@/components/ui/AntigravityBackground';
import { useFontsLoader } from '@/utils/useFontsLoader';
import { useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { createAppStyles } from '../../theme/styles';

export default function WelcomeScreen() {
const router = useRouter();
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

      <View style={styles.layout.flex}>
        <View style={styles.layout.borderRadius}>
          <Image
            source={require('../../assets/images/welcome-logo.png')}
            style={{
              width: 200,
              height: 200,
              resizeMode: 'contain',
              marginBottom: theme.spacing.xl,
            }}
          />
        </View>

        <Text style={styles.typography.h1}>Bienvenido</Text>
        <Text style={styles.typography.subLg}>
          Encuentra tu compañero perfecto
        </Text>

        <TouchableOpacity
          style={styles.components.btn}
          onPress={() => router.replace('/(auth)/login')}
        >
          <Text style={styles.components.btnTxt}>Continuar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.layout.center}>
        <Text
          style={[
            styles.typography.h1,
            { fontFamily: 'ShadowsIntoLight_400Regular' },
          ]}
        >
          Doggy
        </Text>
      </View>
    </View>

);
}
