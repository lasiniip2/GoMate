/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#007AFF';
const tintColorDark = '#0A84FF';

export const Colors = {
  light: {
    // Base colors
    text: '#11181C',
    textSecondary: '#687076',
    textTertiary: '#8E8E93',
    background: '#FFFFFF',
    backgroundSecondary: '#F2F2F7',
    backgroundTertiary: '#E5E5EA',
    
    // Theme colors
    tint: tintColorLight,
    primary: '#007AFF',
    secondary: '#5856D6',
    success: '#34C759',
    warning: '#FF9500',
    error: '#FF3B30',
    info: '#5AC8FA',
    
    // UI elements
    border: '#C6C6C8',
    borderLight: '#E5E5EA',
    card: '#FFFFFF',
    cardSecondary: '#F9F9F9',
    shadow: '#000000',
    
    // Icons
    icon: '#687076',
    iconSecondary: '#8E8E93',
    tabIconDefault: '#8E8E93',
    tabIconSelected: tintColorLight,
    
    // Input fields
    input: '#FFFFFF',
    inputBorder: '#C6C6C8',
    inputPlaceholder: '#C7C7CC',
    
    // Overlay and modal
    overlay: 'rgba(0, 0, 0, 0.4)',
    modalBackground: '#FFFFFF',
    
    // Status bar
    statusBar: 'dark',
  },
  dark: {
    // Base colors
    text: '#FFFFFF',
    textSecondary: '#EBEBF5',
    textTertiary: '#98989D',
    background: '#000000',
    backgroundSecondary: '#1C1C1E',
    backgroundTertiary: '#2C2C2E',
    
    // Theme colors
    tint: tintColorDark,
    primary: '#0A84FF',
    secondary: '#5E5CE6',
    success: '#32D74B',
    warning: '#FF9F0A',
    error: '#FF453A',
    info: '#64D2FF',
    
    // UI elements
    border: '#38383A',
    borderLight: '#48484A',
    card: '#1C1C1E',
    cardSecondary: '#2C2C2E',
    shadow: '#000000',
    
    // Icons
    icon: '#EBEBF5',
    iconSecondary: '#98989D',
    tabIconDefault: '#98989D',
    tabIconSelected: tintColorDark,
    
    // Input fields
    input: '#1C1C1E',
    inputBorder: '#38383A',
    inputPlaceholder: '#98989D',
    
    // Overlay and modal
    overlay: 'rgba(0, 0, 0, 0.6)',
    modalBackground: '#1C1C1E',
    
    // Status bar
    statusBar: 'light',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

