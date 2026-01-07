export const tokens = {
  colors: {
    // Base Palette
    white: '#FFFFFF',
    whiteOpacity: '#ffffff2c',
    black: '#000000',
    blackOpaciity: '#00000012',


    // Grayscale
    gray50: '#F9FAFB',
    gray100: '#d6e3ffff',
    gray200: '#7272722b',
    gray300: '#D1D5DB',
    gray400: '#9CA3AF',
    gray500: '#6B7280',
    gray600: '#4B5563',
    gray700: '#0525583a',
    gray800: '#1F2937',
    gray900: '#111827',

    // Primary Brand
    primary50: '#EFF6FF',
    primary100: '#DBEAFE',
    primary500: '#3B82F6',
    primary600: '#2563EB',
    primary700: '#1D4ED8',
    primary900: '#1E3A8A',
    primary1000: '#0606dfff',

    // Semantic Status
    success: '#10B981',
    error: '#ef44441b',
    danger: '#ef44440e',
    warning: '#F59E0B',
    info: '#3B82F6',
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    s: 4,
    m: 8,
    l: 12,
    full: 9999,
  },
  typography: {
    fontSizes: {
      xs: 12,
      s: 14,
      m: 16,
      l: 20,
      xl: 24,
      xxl: 32,
      xxxl: 48,
      xxxxl: 64,
    },
    fontWeights: {
      regular: '400',
      medium: '500',
      bold: '700',
    },
  },
} as const;

export type Tokens = typeof tokens;
