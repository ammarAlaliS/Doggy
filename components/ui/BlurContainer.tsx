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
        <View style={[
            styles.outerContainer,
            {
                borderColor: theme.colors.border,
                borderRadius: theme.spacing.m,
                width: '100%',
            },
            style // Apply external style here too for positioning if needed
        ]}>
            <BlurView
                intensity={60}
                tint={theme.dark ? 'dark' : 'light'}
                style={[
                    styles.content,
                    { backgroundColor: theme.colors.whiteOpacity },
                    style // Merge style here so flexDirection etc. works on children
                ]}
            >
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
        width: '100%',
    }
});

export default BlurContainer;
