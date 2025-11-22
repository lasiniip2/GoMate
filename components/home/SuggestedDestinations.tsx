import React, { useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Destination } from '@/types/destination.types';
import DestinationCard from './DestinationCard';
import { useAppTheme } from '@/hooks/use-app-theme';

interface SuggestedDestinationsProps {
  destinations: Destination[];
  loading?: boolean;
}

const CATEGORIES = [
  { id: 'all', label: 'Popular', icon: 'flame' as const },
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
  const { background, text, backgroundSecondary, primary } = useAppTheme();

  const handleDestinationPress = (destination: Destination) => {
    router.push({
      pathname: '/(main)/destination-details',
      params: { id: destination.id },
    });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={[styles.title, { color: text }]}>Explore Sri Lanka</Text>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={primary} />
        </View>
      </View>
    );
  }

  if (destinations.length === 0) {
    return null;
  }

  // Filter destinations by selected category
  // For 'all' category, show only popular destinations (max 10)
  const filteredDestinations = selectedCategory === 'all'
    ? destinations.filter(d => d.popular).slice(0, 10)
    : destinations.filter(d => d.category === selectedCategory);

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: text }]}>Explore Sri Lanka</Text>
      
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
                { backgroundColor: backgroundSecondary },
                selectedCategory === category.id && { backgroundColor: primary },
              ]}
              onPress={() => setSelectedCategory(category.id)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={category.icon}
                size={18}
                color={selectedCategory === category.id ? '#fff' : primary}
              />
              <Text
                style={[
                  styles.categoryText,
                  { color: selectedCategory === category.id ? '#fff' : primary },
                ]}
              >
                {category.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.gridContainer}>
        {filteredDestinations.slice(0, 8).map((destination, index) => (
          <View key={`destination-${destination.id}-${index}`} style={styles.cardWrapper}>
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
          <Ionicons name="search-outline" size={48} color={primary} />
          <Text style={[styles.emptyText, { color: text }]}>No destinations found</Text>
          <Text style={[styles.emptySubtext, { color: text }]}>Try selecting a different category</Text>
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
    marginRight: 8,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
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
    marginTop: 12,
  },
  emptySubtext: {
    fontSize: 14,
    marginTop: 4,
  },
});
