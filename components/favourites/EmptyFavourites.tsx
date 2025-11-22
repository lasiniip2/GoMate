import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@/hooks/use-app-theme';

export default function EmptyFavourites() {
  const { text, textSecondary, icon } = useAppTheme();
  
  return (
    <View style={styles.container}>
      <Ionicons name="heart-outline" size={64} color={icon} />
      <Text style={[styles.title, { color: text }]}>No Favourites Yet</Text>
      <Text style={[styles.subtitle, { color: textSecondary }]}>
        Save your favorite destinations, routes, and schedules to access them quickly
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});

