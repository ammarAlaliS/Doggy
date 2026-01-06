import { tokens } from './tokens';

// Define the shape of our semantic theme
export interface AppTheme {
  colors: {
    background: string;
    backgroundSecondary: string;
    text: string;
    textSecondary: string;
    textInverse: string;
    primary: string;
    primaryForeground: string;
    border: string;
    card: string;
    notification: string;
    error: string;
    success: string;
    whiteOpacity: string;
    gray900: string;
    dangerOpacity: string;
  };
  spacing: typeof tokens.spacing;
  borderRadius: typeof tokens.borderRadius;
  typography: typeof tokens.typography;
  dark: boolean;
}

export const lightTheme: AppTheme = {
  colors: {
    background: tokens.colors.white,
    backgroundSecondary: tokens.colors.gray50,
    text: tokens.colors.gray900,
    textSecondary: tokens.colors.gray600,
    textInverse: tokens.colors.white,
    primary: tokens.colors.primary600,
    primaryForeground: tokens.colors.white,
    border: tokens.colors.gray200,
    card: tokens.colors.white,
    notification: tokens.colors.error,
    error: tokens.colors.error,
    gray900: tokens.colors.gray900,
    whiteOpacity: tokens.colors.whiteOpacity,
    dangerOpacity: tokens.colors.danger,
    success: tokens.colors.success,

  },
  spacing: tokens.spacing,
  borderRadius: tokens.borderRadius,
  typography: tokens.typography,
  dark: false,
};

export const darkTheme: AppTheme = {
  colors: {
    background: tokens.colors.gray900,
    backgroundSecondary: tokens.colors.gray800,
    text: tokens.colors.gray100,
    textSecondary: tokens.colors.gray400,
    textInverse: tokens.colors.gray900,
    primary: tokens.colors.primary500,
    primaryForeground: tokens.colors.white,
    border: tokens.colors.gray700,
    card: tokens.colors.gray800,
    notification: tokens.colors.error,
    error: tokens.colors.error,
    gray900: tokens.colors.primary1000,
    whiteOpacity: tokens.colors.blackOpaciity,
    dangerOpacity: tokens.colors.danger,
    success: tokens.colors.success,
  },
  spacing: tokens.spacing,
  borderRadius: tokens.borderRadius,
  typography: tokens.typography,
  dark: true,
};
