import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';
import { createAppStyles } from '@/theme/styles';
import { loginSchema } from '@/utils/login.schema';
import { Formik } from 'formik';
import { useMemo } from 'react';
import { ActivityIndicator, Text, TextInput, TouchableOpacity, View } from 'react-native';


export default function LoginForm() {
    const { login, isLoading } = useAuth();
    const { theme } = useTheme();
    const styles = useMemo(() => createAppStyles(theme), [theme]);

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={loginSchema}
            onSubmit={login}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid }: any) => (
                <View style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    gap: theme.spacing.l,
                }}>
                    {/* Email */}
                    <View style={styles.formik.input}>
                        <Text style={[styles.typography.sub,]}>Email</Text>
                        <TextInput
                            placeholder="Email"
                            placeholderTextColor={theme.colors.textSecondary}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            style={errors.email && touched.email ? styles.formik.inputError : styles.formik.username}
                        />
                    </View>
                    {errors.email && touched.email && <Text style={styles.formik.error}>{errors.email}</Text>}

                    {/* Password */}
                    <View style={styles.formik.input}>
                        <Text style={[styles.typography.sub,]}>Contraseña</Text>
                        <TextInput
                            placeholder="Contraseña"
                            placeholderTextColor={theme.colors.textSecondary}
                            secureTextEntry={true}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            style={errors.password && touched.password ? styles.formik.inputError : styles.formik.username}
                        />
                    </View>
                    {errors.password && touched.password && <Text style={styles.formik.error}>{errors.password}</Text>}

                    {/* Botón */}
                    <TouchableOpacity
                        onPress={() => {
                            console.log('Button pressed, isValid:', isValid, 'isLoading:', isLoading, 'values:', values, 'errors:', errors);
                            handleSubmit();
                        }}
                        disabled={isLoading}
                        style={[styles.components.btn, (!isValid || isLoading) && { opacity: 0.6 }]}
                    >
                        {isLoading ? (
                            <ActivityIndicator color={theme.colors.primaryForeground} />
                        ) : (
                            <Text style={styles.components.btnTxt}>Iniciar Sesión</Text>
                        )}
                    </TouchableOpacity>

                </View>
            )}
        </Formik>
    );
}
