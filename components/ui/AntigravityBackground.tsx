import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withRepeat,
    withSequence,
    withTiming,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

type AntigravityBackgroundProps = {
    colors: readonly [string, string, ...string[]];
    secondaryColors?: readonly [string, string, ...string[]];
    blurIntensity?: number;
    shapeColor?: string; // Unused now, but kept for props compatibility
    heightRatio?: number; // Unused
    containerWidth?: number;
    containerHeight?: number;
};

// Internal Blob Component
const AnimatedBlob = ({ color, delay = 0, size = width * 1.5 }: { color: string; delay?: number, size?: number }) => {
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const scale = useSharedValue(1);

    useEffect(() => {
        // Increase movement range for better coverage
        const durationX = 8000 + Math.random() * 5000;
        const durationY = 9000 + Math.random() * 5000;
        const durationScale = 10000 + Math.random() * 5000;

        translateX.value = withDelay(
            delay,
            withRepeat(
                withSequence(
                    withTiming(Math.random() * 200 - 100, { duration: durationX, easing: Easing.inOut(Easing.ease) }),
                    withTiming(Math.random() * -200 + 100, { duration: durationX, easing: Easing.inOut(Easing.ease) }),
                    withTiming(0, { duration: durationX, easing: Easing.inOut(Easing.ease) })
                ),
                -1,
                true
            )
        );

        translateY.value = withDelay(
            delay,
            withRepeat(
                withSequence(
                    withTiming(Math.random() * 200 - 100, { duration: durationY, easing: Easing.inOut(Easing.ease) }),
                    withTiming(Math.random() * -200 + 100, { duration: durationY, easing: Easing.inOut(Easing.ease) }),
                    withTiming(0, { duration: durationY, easing: Easing.inOut(Easing.ease) })
                ),
                -1,
                true
            )
        );

        scale.value = withDelay(
            delay,
            withRepeat(
                withSequence(
                    withTiming(1.5, { duration: durationScale, easing: Easing.inOut(Easing.ease) }), // Scale up more
                    withTiming(0.8, { duration: durationScale, easing: Easing.inOut(Easing.ease) }),
                    withTiming(1, { duration: durationScale, easing: Easing.inOut(Easing.ease) })
                ),
                -1,
                true
            )
        );
    }, []);

    const style = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: translateX.value },
                { translateY: translateY.value },
                { scale: scale.value },
            ],
        };
    });

    return (
        <Animated.View
            style={[
                {
                    position: "absolute",
                    width: size,
                    height: size,
                    borderRadius: size / 2,
                    backgroundColor: color,
                    opacity: 0.6,
                },
                style,
            ]}
        />
    );
};

export const AntigravityBackground = ({
    colors,
    secondaryColors = ["rgba(255,255,255,0.4)", "rgba(12, 10, 10, 0)"] as const,
    blurIntensity = 60,
    containerWidth = width,
    containerHeight = height,
}: AntigravityBackgroundProps) => {

    const blobColors = colors.slice(0, 5);

    return (
        <View style={styles.container}>
            {/* Base Background - Solid Fill to prevent white gaps */}
            <View style={StyleSheet.absoluteFill}>
                <LinearGradient
                    colors={colors} // Use the main vibrant colors for the base
                    style={StyleSheet.absoluteFill}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                />
            </View>

            {/* Floating Blobs Container */}
            <View style={[StyleSheet.absoluteFill, { alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }]}>
                {blobColors.map((color, index) => {
                    // Spread across full screen
                    const topPos = Math.random() * containerHeight * 0.8 - (containerHeight * 0.2);
                    const leftPos = Math.random() * containerWidth * 0.8 - (containerWidth * 0.2);

                    return (
                        <View key={index} style={{ position: 'absolute', top: topPos, left: leftPos }}>
                            <AnimatedBlob color={color} delay={index * 1000} size={containerWidth * 1.5} />
                        </View>
                    )
                })}
            </View>

            {/* Blur Layer - Merges the blobs */}
            <BlurView intensity={blurIntensity} style={StyleSheet.absoluteFill} tint="default" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 0,
        margin: 0,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: "hidden",
        backgroundColor: 'transparent',
    },
});
