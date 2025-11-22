import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function QuickSearch() {
  const router = useRouter();
  const backgroundColor = useThemeColor({}, 'backgroundSecondary');
  const placeholderColor = useThemeColor({}, 'inputPlaceholder');

  const handlePress = () => {
    // Navigate to search tab - adjust path based on your routing structure
    // router.push('/(main)/(tabs)/search');
  };

  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity style={[styles.searchBox, { backgroundColor }]} onPress={handlePress} activeOpacity={0.7}>
        <Ionicons name="search" size={20} color={placeholderColor} style={styles.icon} />
        <Text style={[styles.placeholder, { color: placeholderColor }]}>Search destinations or routes...</Text>
        <Ionicons name="options-outline" size={20} color={placeholderColor} />
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  icon: {
    marginRight: 12,
  },
  placeholder: {
    flex: 1,
    fontSize: 16,
  },
});
