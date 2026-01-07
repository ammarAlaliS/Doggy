import { StyleSheet } from "react-native";
import { AppTheme } from "../themes";

export const createComponentStyles = (theme: AppTheme) => StyleSheet.create({
  btnGrp: {
    flexDirection: 'row',
    gap: theme.spacing.m,
    marginBottom: theme.spacing.xl,
  },
  btn: {
    backgroundColor: theme.colors.gray900,
    paddingVertical: theme.spacing.m,
    paddingHorizontal: theme.spacing.l,
    borderRadius: theme.borderRadius.l,
  },
  btnTxt: {
    color: theme.colors.primaryForeground,
    fontWeight: theme.typography.fontWeights.medium as any,
    fontSize: theme.typography.fontSizes.l,
    textAlign: 'center',
  },
  input: {
    backgroundColor: theme.colors.backgroundSecondary,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.m,
    borderRadius: theme.borderRadius.m,
    color: theme.colors.text,
    fontSize: theme.typography.fontSizes.m,
  },
  card: {
    backgroundColor: theme.colors.card,
    padding: theme.spacing.l,
    borderRadius: theme.borderRadius.l,
  }
});
