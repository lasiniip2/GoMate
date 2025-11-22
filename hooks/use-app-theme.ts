/**
 * Hook for accessing theme colors throughout the app
 * Provides easy access to commonly used theme colors
 */

import { useThemeColor } from './use-theme-color';

export function useAppTheme() {
  // Base colors
  const text = useThemeColor({}, 'text');
  const textSecondary = useThemeColor({}, 'textSecondary');
  const textTertiary = useThemeColor({}, 'textTertiary');
  const background = useThemeColor({}, 'background');
  const backgroundSecondary = useThemeColor({}, 'backgroundSecondary');
  const backgroundTertiary = useThemeColor({}, 'backgroundTertiary');
  
  // Theme colors
  const tint = useThemeColor({}, 'tint');
  const primary = useThemeColor({}, 'primary');
  const secondary = useThemeColor({}, 'secondary');
  const success = useThemeColor({}, 'success');
  const warning = useThemeColor({}, 'warning');
  const error = useThemeColor({}, 'error');
  const info = useThemeColor({}, 'info');
  
  // UI elements
  const border = useThemeColor({}, 'border');
  const borderLight = useThemeColor({}, 'borderLight');
  const card = useThemeColor({}, 'card');
  const cardSecondary = useThemeColor({}, 'cardSecondary');
  const shadow = useThemeColor({}, 'shadow');
  
  // Icons
  const icon = useThemeColor({}, 'icon');
  const iconSecondary = useThemeColor({}, 'iconSecondary');
  const tabIconDefault = useThemeColor({}, 'tabIconDefault');
  const tabIconSelected = useThemeColor({}, 'tabIconSelected');
  
  // Input fields
  const input = useThemeColor({}, 'input');
  const inputBorder = useThemeColor({}, 'inputBorder');
  const inputPlaceholder = useThemeColor({}, 'inputPlaceholder');
  
  // Overlay and modal
  const overlay = useThemeColor({}, 'overlay');
  const modalBackground = useThemeColor({}, 'modalBackground');

  return {
    text,
    textSecondary,
    textTertiary,
    background,
    backgroundSecondary,
    backgroundTertiary,
    tint,
    primary,
    secondary,
    success,
    warning,
    error,
    info,
    border,
    borderLight,
    card,
    cardSecondary,
    shadow,
    icon,
    iconSecondary,
    tabIconDefault,
    tabIconSelected,
    input,
    inputBorder,
    inputPlaceholder,
    overlay,
    modalBackground,
  };
}
