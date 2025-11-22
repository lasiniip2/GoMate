import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/context/ThemeContext';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function ThemeToggle() {
  const { theme, themeMode, setThemeMode } = useTheme();
  const backgroundColor = useThemeColor({}, 'card');
  const textColor = useThemeColor({}, 'text');
  const textSecondary = useThemeColor({}, 'textSecondary');
  const borderColor = useThemeColor({}, 'border');
  const primaryColor = useThemeColor({}, 'primary');

  const options: Array<{ mode: 'light' | 'dark' | 'system'; icon: string; label: string }> = [
    { mode: 'light', icon: 'sunny-outline', label: 'Light' },
    { mode: 'dark', icon: 'moon-outline', label: 'Dark' },
    { mode: 'system', icon: 'phone-portrait-outline', label: 'System' },
  ];

  return (
    <View style={[styles.container, { backgroundColor, borderColor }]}>
      <View style={styles.header}>
        <Ionicons 
          name={theme === 'dark' ? 'moon' : 'sunny'} 
          size={24} 
          color={primaryColor} 
        />
        <View style={styles.headerText}>
          <Text style={[styles.title, { color: textColor }]}>Theme</Text>
          <Text style={[styles.subtitle, { color: textSecondary }]}>
            Choose your preferred theme
          </Text>
        </View>
      </View>

      <View style={styles.optionsContainer}>
        {options.map((option) => {
          const isSelected = themeMode === option.mode;
          return (
            <TouchableOpacity
              key={option.mode}
              style={[
                styles.option,
                { 
                  backgroundColor: isSelected ? primaryColor : 'transparent',
                  borderColor: isSelected ? primaryColor : borderColor,
                },
              ]}
              onPress={() => setThemeMode(option.mode)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={option.icon as any}
                size={24}
                color={isSelected ? '#FFFFFF' : textSecondary}
              />
              <Text
                style={[
                  styles.optionText,
                  { color: isSelected ? '#FFFFFF' : textColor },
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    marginLeft: 12,
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 14,
  },
  optionsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  option: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    gap: 8,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

