import { BlurView } from 'expo-blur';
import React, { PropsWithChildren } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

interface BlurContainerProps extends PropsWithChildren {
    style?: ViewStyle;
}

const BlurContainer = ({ children, style }: BlurContainerProps) => {
    const { theme } = useTheme();

    return (
        <View style={[styles.outerContainer, style, {
            borderColor: theme.colors.border,
            borderRadius: theme.spacing.m,
        }]}>
            <BlurView intensity={60} tint={theme.dark ? 'dark' : 'light'} style={styles.content}>
                {children}
            </BlurView>
        </View>
    );
};

const styles = StyleSheet.create({
    outerContainer: {
        overflow: 'hidden',
        borderWidth: 1,
    },
    content: {
        padding: 16,
        gap: 16,
    }
});

export default BlurContainer;

