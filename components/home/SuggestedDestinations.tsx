import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Destination } from '@/types/destination.types';
import DestinationCard from './DestinationCard';

interface SuggestedDestinationsProps {
  destinations: Destination[];
  loading?: boolean;
}

const CATEGORIES = [
  { id: 'all', label: 'All', icon: 'apps' as const },
  { id: 'landmark', label: 'Landmarks', icon: 'flag' as const },
  { id: 'beach', label: 'Beaches', icon: 'water' as const },
  { id: 'city', label: 'Cities', icon: 'business' as const },
  { id: 'nature', label: 'Nature', icon: 'leaf' as const },
  { id: 'religious', label: 'Religious', icon: 'moon' as const },
  { id: 'museum', label: 'Museums', icon: 'library' as const },
  { id: 'adventure', label: 'Adventure', icon: 'bicycle' as const },
];

export default function SuggestedDestinations({ destinations, loading }: SuggestedDestinationsProps) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleDestinationPress = (destination: Destination) => {
    router.push({
      pathname: '/(main)/destination-details',
      params: { id: destination.id },
    });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Explore Sri Lanka</Text>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      </View>
    );
  }

  if (destinations.length === 0) {
    return null;
  }

  // Filter destinations by selected category
  const filteredDestinations = selectedCategory === 'all'
    ? destinations
    : destinations.filter(d => d.category === selectedCategory);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore Sri Lanka</Text>
      
      <View style={styles.categoriesContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContent}
        >
          {CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryChip,
                selectedCategory === category.id && styles.categoryChipActive,
              ]}
              onPress={() => setSelectedCategory(category.id)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={category.icon}
                size={18}
                color={selectedCategory === category.id ? '#fff' : '#007AFF'}
              />
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category.id && styles.categoryTextActive,
                ]}
              >
                {category.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.gridContainer}>
        {filteredDestinations.slice(0, 8).map((destination) => (
          <View key={destination.id} style={styles.cardWrapper}>
            <DestinationCard
              destination={destination}
              onPress={() => handleDestinationPress(destination)}
              compact
            />
          </View>
        ))}
      </View>

      {filteredDestinations.length === 0 && (
        <View style={styles.emptyContainer}>
          <Ionicons name="search-outline" size={48} color="#C7C7CC" />
          <Text style={styles.emptyText}>No destinations found</Text>
          <Text style={styles.emptySubtext}>Try selecting a different category</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 16,
  },
  categoriesContainer: {
    marginBottom: 16,
    marginLeft: -20,
    marginRight: -20,
    paddingLeft: 20,
  },
  categoriesContent: {
    paddingRight: 20,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F2F2F7',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  categoryChipActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
    marginLeft: 6,
  },
  categoryTextActive: {
    color: '#fff',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardWrapper: {
    width: '100%',
    marginBottom: 16,
  },
  loadingContainer: {
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#8E8E93',
    marginTop: 12,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#C7C7CC',
    marginTop: 4,
  },
});
