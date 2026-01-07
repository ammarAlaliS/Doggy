import { AntigravityBackground } from '@/components/ui/AntigravityBackground';
import { useFontsLoader } from '@/utils/useFontsLoader';
import { useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
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

      <View style={[styles.layout.flex, { paddingHorizontal: theme.spacing.xl, justifyContent: 'center' }]}>

        {/* Top Section - Logo */}
        <Animated.View
          entering={FadeInDown.delay(200).duration(1000).springify()}
          style={{ alignItems: 'center' }}
        >
          <Image
            source={require('../../assets/images/welcome-logo.png')}
            style={{
              width: 250,
              height: 250,
              resizeMode: 'contain',
              marginBottom: theme.spacing.m,
            }}
          />
        </Animated.View>

        {/* Middle Section - Text */}
        <Animated.View
          entering={FadeInDown.delay(400).duration(1000).springify()}
          style={{ alignItems: 'center', marginBottom: 40 }}
        >
          <Text style={[styles.typography.h1, {
            textAlign: 'center',
            fontFamily: 'ShadowsIntoLight_400Regular',
            fontSize: 70,
            color: theme.colors.text,
            lineHeight: 80,
          }]}>
            Doggy
          </Text>
          <Text style={[styles.typography.subLg, {
            textAlign: 'center',
            opacity: 0.9,
            color: theme.colors.text,
            marginTop: 10,
            fontWeight: '600'
          }]}>
            Tu comunidad canina favorita
          </Text>
        </Animated.View>

        {/* Bottom Section - Action */}
        <Animated.View
          entering={FadeInUp.delay(600).duration(1000).springify()}
          style={{ width: '100%', alignItems: 'center' }}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            style={[styles.components.btn, {
              paddingHorizontal: 40,
              minWidth: 240,
              backgroundColor: theme.colors.whiteOpacity,
              borderRadius: 30,
              height: 60,
              justifyContent: 'center',
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 10,
              elevation: 8,
              overflow: 'hidden',
              position: 'relative',
              alignItems: 'center',

            }]}
            onPress={() => router.push('/(auth)/login')}
          >
            <AntigravityBackground
              colors={
                theme.dark
                  ? ["#000000ff", "#20010887", "#040415ff", "#4343f403", "#040415ff"]
                  : ["#0d0d0dff", "#010120ff", "#040415ff", "#010120ff", "#040415ff"]
              }
              blurIntensity={40}
              containerWidth={340}
              containerHeight={56}
            />
            <Text style={[styles.components.btnTxt, { fontSize: 18, fontWeight: '700' }]}>
              Empezar ahora
            </Text>
          </TouchableOpacity>
        </Animated.View>

      </View>


    </View>
  );
}
