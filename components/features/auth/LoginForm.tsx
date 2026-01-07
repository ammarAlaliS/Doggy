import { AntigravityBackground } from '@/components/ui/AntigravityBackground';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import { createAppStyles } from '@/theme/styles';
import { loginSchema } from '@/utils/login.schema';
import Checkbox from 'expo-checkbox';
import { Formik } from 'formik';
import { useMemo, useState } from 'react';
import { ActivityIndicator, Dimensions, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginForm() {
    const { login, getRememberedEmail, isLoading } = useAuth();
    const { theme } = useTheme();
    const [remember, setRemember] = useState(false)
    const styles = useMemo(() => createAppStyles(theme), [theme]);

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={loginSchema}
            onSubmit={(values, formikHelpers) => login(values, formikHelpers, remember)}
        >
            {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched, isValid }) => {
                // Pre-fill email on mount
                useMemo(() => {
                    const loadRememberedEmail = async () => {
                        const email = await getRememberedEmail();
                        if (email) {
                            setFieldValue('email', email);
                            setRemember(true);
                        }
                    };
                    loadRememberedEmail();
                }, []);

                return (
                    <View style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        marginTop: theme.spacing.xl
                    }}>
                        {/* Email */}
                        <View style={styles.formik.input}>
                            <Text style={styles.typography.h5}>Email</Text>
                            <TextInput
                                placeholder="Correo Electronico"
                                placeholderTextColor={theme.colors.textSecondary}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                style={errors.email && touched.email ? styles.formik.inputError : styles.formik.username}
                            />
                            {errors.email && touched.email && <Text style={styles.formik.error}>{errors.email}</Text>}
                        </View>

                        {/* Password */}
                        <View style={[styles.formik.input, { marginTop: theme.spacing.s }]}>
                            <Text style={styles.typography.h5}>Contraseña</Text>
                            <TextInput
                                placeholder="Ingresa tu contraseña"
                                placeholderTextColor={theme.colors.textSecondary}
                                secureTextEntry={true}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                                style={errors.password && touched.password ? styles.formik.inputError : styles.formik.username}
                            />
                            {errors.password && touched.password && <Text style={styles.formik.error}>{errors.password}</Text>}
                        </View>


                        <View style={[{
                            display: 'flex',
                            flexDirection: 'row',
                            gap: theme.spacing.s,
                            justifyContent: 'space-between',
                            marginTop: theme.spacing.s,
                        }]}>
                            <View style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: theme.spacing.s
                            }}>
                                <Checkbox
                                    value={remember}
                                    onValueChange={setRemember}
                                    color={remember ? '#7C3AED' : undefined}
                                    style={{
                                        borderColor: theme.colors.border,
                                        backgroundColor: theme.colors.whiteOpacity,
                                        width: theme.spacing.l,
                                        height: theme.spacing.l,
                                    }}
                                />
                                <Text style={styles.typography.h5}>Recordarme</Text>
                            </View>
                            <TouchableOpacity>
                                <Text style={styles.typography.h5}>¿Olvidaste tu contraseña?</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{
                            marginTop: theme.spacing.xxl

                        }}>
                            {/* Button */}
                            <TouchableOpacity
                                onPress={() => handleSubmit()}
                                disabled={isLoading}
                                style={[
                                    styles.components.btn,
                                    {
                                        overflow: 'hidden',
                                        position: 'relative',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: 56,
                                    },
                                    (!isValid || isLoading) && { opacity: 0.6 }
                                ]}
                            >
                                <AntigravityBackground
                                    colors={
                                        theme.dark
                                            ? ["#0d0d0dff", "#20010887", "#040415ff", "#4343f403", "#040415ff"]
                                            : ["#0d0d0dff", "#010120ff", "#040415ff", "#010120ff", "#040415ff"]
                                    }
                                    blurIntensity={40}
                                    containerWidth={Dimensions.get('window').width}
                                    containerHeight={56}
                                />
                                {isLoading ? (
                                    <ActivityIndicator color={theme.colors.primaryForeground} />
                                ) : (
                                    <Text style={[styles.components.btnTxt, { zIndex: 1 }]}>Iniciar Sesión</Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </View>
                );
            }}
        </Formik >
    );
}
