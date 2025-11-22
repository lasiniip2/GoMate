import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { FavouriteRoute } from '@/types/favourite.types';
import { useFavourites } from '@/context/FavouritesContext';
import { useAppTheme } from '@/hooks/use-app-theme';

interface FavouriteRoutesProps {
  favourites: FavouriteRoute[];
}

export default function FavouriteRoutes({ favourites }: FavouriteRoutesProps) {
  const router = useRouter();
  const { removeRoute } = useFavourites();
  const { card, text, textSecondary, backgroundSecondary, primary, icon } = useAppTheme();

  const handlePress = (routeId: string) => {
    router.push({
      pathname: '/(main)/route-details',
      params: { id: routeId },
    });
  };

  const handleRemove = async (routeId: string) => {
    await removeRoute(routeId);
  };

  const getTransportIcon = (mode: string) => {
    switch (mode) {
      case 'train':
        return 'train';
      case 'bus':
        return 'bus';
      default:
        return 'car';
    }
  };

  if (favourites.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, { color: text }]}>Routes ({favourites.length})</Text>
      {favourites.map(fav => (
        <View key={fav.id} style={[styles.card, { backgroundColor: card }]}>
          <TouchableOpacity
            style={styles.cardContent}
            onPress={() => handlePress(fav.route.id)}
            activeOpacity={0.7}
          >
            <View style={[styles.iconContainer, { backgroundColor: backgroundSecondary }]}>
              <Ionicons
                name={getTransportIcon(fav.route.transportMode)}
                size={24}
                color={primary}
              />
            </View>
            <View style={styles.info}>
              <Text style={[styles.name, { color: text }]}>{fav.route.name}</Text>
              <Text style={[styles.fromTo, { color: textSecondary }]}>
                {fav.route.from} → {fav.route.to}
              </Text>
              <View style={styles.details}>
                <View style={styles.detail}>
                  <Ionicons name="time-outline" size={12} color={icon} />
                  <Text style={[styles.detailText, { color: textSecondary }]}>{fav.route.duration}</Text>
                </View>
                <View style={styles.detail}>
                  <Ionicons name="cash-outline" size={12} color={icon} />
                  <Text style={[styles.detailText, { color: textSecondary }]}>LKR {fav.route.price}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => handleRemove(fav.route.id)}
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
    alignItems: 'center',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  fromTo: {
    fontSize: 13,
    marginBottom: 6,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  detailText: {
    fontSize: 12,
    marginLeft: 4,
  },
  removeButton: {
    padding: 8,
  },
});

