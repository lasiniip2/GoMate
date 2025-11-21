import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function EmptyFavourites() {
  return (
    <View style={styles.container}>
      <Ionicons name="heart-outline" size={64} color="#C7C7CC" />
      <Text style={styles.title}>No Favourites Yet</Text>
      <Text style={styles.subtitle}>
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
    color: '#1C1C1E',
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 20,
  },
});

