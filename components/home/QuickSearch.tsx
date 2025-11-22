import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ThemedView } from '@/components/themed-view';

export default function QuickSearch() {
  const router = useRouter();

  const handlePress = () => {
    // Navigate to search tab - adjust path based on your routing structure
    // router.push('/(main)/(tabs)/search');
  };

  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity style={styles.searchBox} onPress={handlePress} activeOpacity={0.7}>
        <Ionicons name="search" size={20} color="#8E8E93" style={styles.icon} />
        <Text style={styles.placeholder}>Search destinations or routes...</Text>
        <Ionicons name="options-outline" size={20} color="#8E8E93" />
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
    backgroundColor: '#F2F2F7',
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
    color: '#8E8E93',
  },
});
