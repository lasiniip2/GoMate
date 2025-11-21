import React from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Destination } from '@/types/destination.types';
import DestinationCard from './DestinationCard';

interface SuggestedDestinationsProps {
  destinations: Destination[];
  loading?: boolean;
}

export default function SuggestedDestinations({ destinations, loading }: SuggestedDestinationsProps) {
  const router = useRouter();

  const handleDestinationPress = (destination: Destination) => {
    router.push({
      pathname: '/(main)/destination-details',
      params: { id: destination.id },
    });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Suggested Destinations</Text>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      </View>
    );
  }

  if (destinations.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Suggested Destinations</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {destinations.map((destination) => (
          <DestinationCard
            key={destination.id}
            destination={destination}
            onPress={() => handleDestinationPress(destination)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingHorizontal: 20,
  },
  loadingContainer: {
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
