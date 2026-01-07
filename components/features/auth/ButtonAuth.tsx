import { useTheme } from '@/hooks/useTheme';
import { createAppStyles } from '@/theme/styles';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useMemo } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import BlurContainer from '../../ui/BlurContainer';

interface ButtonAuthProps {
    icon?: keyof typeof FontAwesome.glyphMap;
    label: string;
    onPress: () => void;
}

const ButtonAuth = ({ icon, label, onPress }: ButtonAuthProps) => {
    const { theme } = useTheme();
    const styles = useMemo(() => createAppStyles(theme), [theme]);

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            style={{ width: '100%' }}
        >
            <BlurContainer
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: theme.spacing.m,
                }}
            >
                {icon && (
                    <FontAwesome
                        name={icon}
                        size={24}
                        color={theme.colors.text}
                    />
                )}
                <Text style={[styles.typography.h5, { color: theme.colors.text }]}>
                    {label}
                </Text>
            </BlurContainer>

        </TouchableOpacity>
    );
};

export default ButtonAuth;