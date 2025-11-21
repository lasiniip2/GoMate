import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function QuickSearch() {
  const router = useRouter();

  const handlePress = () => {
    // Navigate to search tab
    router.push('/(main)/(tabs)/search');
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress} activeOpacity={0.7}>
      <Ionicons name="search" size={20} color="#8E8E93" style={styles.icon} />
      <Text style={styles.placeholder}>Search destinations or routes...</Text>
      <Ionicons name="options-outline" size={20} color="#8E8E93" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 24,
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
