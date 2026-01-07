import { useTheme } from '@/hooks/useTheme';
import { createAppStyles } from '@/theme/styles';
import React, { useMemo } from 'react';
import { Text, View } from 'react-native';

const SingInOption = () => {
    const { theme } = useTheme();
    const styles = useMemo(() => createAppStyles(theme), [theme]);

    return (
        <View
            style={{
                flexDirection: 'row',
                marginVertical: theme.spacing.xl,
                paddingHorizontal: theme.spacing.m,
                marginTop: 40,
            }}
        >
            <View
                style={{
                    flex: 1,
                    height: 1,
                    backgroundColor: theme.colors.textSecondary,
                    opacity: 0.3,
                }}
            />
            <Text
                style={[
                    styles.typography.h3,
                    {
                        marginHorizontal: theme.spacing.m,
                        color: theme.colors.textSecondary,

                    },
                ]}
            >
                O
            </Text>
            <View
                style={{
                    flex: 1,
                    height: 1,
                    backgroundColor: theme.colors.textSecondary,
                    opacity: 0.3,
                }}
            />
        </View>
    );
};

export default SingInOption;
