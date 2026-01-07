import { StyleSheet } from "react-native";
import { AppTheme } from "../themes";

export const createLayoutStyles = (theme: AppTheme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.whiteOpacity,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: theme.spacing.m,
  },
  containerBlur: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: "center",
    padding: theme.spacing.m,
  },
  row: {
    flexDirection: 'row',
  },
  blur: {
    backgroundColor: theme.colors.whiteOpacity,
    flex: 1,
    justifyContent: 'center',
    padding: theme.spacing.m,
    borderRadius: theme.borderRadius.l,
    borderWidth: 1,
    borderColor: theme.colors.border,
    width: '100%',
    height: '100%',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  flex: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  borderRadius: {
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.colors.whiteOpacity,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.m,
    width: 250,
    height: 250,
  }
});
