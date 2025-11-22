import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { FavouriteDestination } from '@/types/favourite.types';
import { useFavourites } from '@/context/FavouritesContext';
import { useAppTheme } from '@/hooks/use-app-theme';

interface FavouriteDestinationsProps {
  favourites: FavouriteDestination[];
}

export default function FavouriteDestinations({ favourites }: FavouriteDestinationsProps) {
  const router = useRouter();
  const { removeDestination } = useFavourites();
  const { card, text, textSecondary } = useAppTheme();

  const handlePress = (destinationId: string) => {
    router.push({
      pathname: '/(main)/destination-details',
      params: { id: destinationId },
    });
  };

  const handleRemove = async (destinationId: string) => {
    await removeDestination(destinationId);
  };

  if (favourites.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, { color: text }]}>Destinations ({favourites.length})</Text>
      {favourites.map(fav => (
        <View key={fav.id} style={[styles.card, { backgroundColor: card }]}>
          <TouchableOpacity
            style={styles.cardContent}
            onPress={() => handlePress(fav.destination.id)}
            activeOpacity={0.7}
          >
            <Image source={{ uri: fav.destination.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={[styles.name, { color: text }]} numberOfLines={1}>
                {fav.destination.name}
              </Text>
              <Text style={[styles.category, { color: textSecondary }]}>{fav.destination.category}</Text>
              <View style={styles.rating}>
                <Ionicons name="star" size={14} color="#FFD700" />
                <Text style={[styles.ratingText, { color: textSecondary }]}>{fav.destination.rating.toFixed(1)}</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => handleRemove(fav.destination.id)}
          >
            <Ionicons name="heart" size={24} color="#FF3B30" />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  card: {
    flexDirection: 'row',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  info: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  category: {
    fontSize: 13,
    textTransform: 'capitalize',
    marginBottom: 6,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  removeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
});

