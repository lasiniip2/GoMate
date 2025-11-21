import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Route } from '@/types/transport.types';
import { useFavourites } from '@/context/FavouritesContext';

interface RouteCardProps {
  route: Route;
  onPress: () => void;
}

export default function RouteCard({ route, onPress }: RouteCardProps) {
  const { isRouteFavourite, addRoute, removeRoute } = useFavourites();
  const isFavourite = isRouteFavourite(route.id);

  const handleFavouritePress = async (e: any) => {
    e.stopPropagation();
    if (isFavourite) {
      await removeRoute(route.id);
    } else {
      await addRoute(route);
    }
  };

  const getTransportIcon = () => {
    switch (route.transportMode) {
      case 'train':
        return 'train';
      case 'bus':
        return 'bus';
      case 'private':
        return 'car';
      default:
        return 'location';
    }
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.iconContainer}>
        <Ionicons name={getTransportIcon()} size={24} color="#007AFF" />
      </View>
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.from} numberOfLines={1}>{route.from}</Text>
          <Ionicons name="arrow-forward" size={16} color="#8E8E93" />
          <Text style={styles.to} numberOfLines={1}>{route.to}</Text>
        </View>
        
        <View style={styles.details}>
          <View style={styles.detailItem}>
            <Ionicons name="time-outline" size={14} color="#8E8E93" />
            <Text style={styles.detailText}>{route.duration}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="navigate-outline" size={14} color="#8E8E93" />
            <Text style={styles.detailText}>{route.distance}</Text>
          </View>
          <View style={styles.detailItem}>
            <Ionicons name="cash-outline" size={14} color="#8E8E93" />
            <Text style={styles.detailText}>LKR {route.price}</Text>
          </View>
        </View>

        {route.scenic && (
          <View style={styles.scenicBadge}>
            <Ionicons name="leaf-outline" size={12} color="#34C759" />
            <Text style={styles.scenicText}>Scenic Route</Text>
          </View>
        )}
      </View>

      <TouchableOpacity style={styles.favouriteBtn} onPress={handleFavouritePress}>
        <Ionicons
          name={isFavourite ? 'heart' : 'heart-outline'}
          size={20}
          color={isFavourite ? '#FF3B30' : '#8E8E93'}
        />
      </TouchableOpacity>
      <Ionicons name="chevron-forward" size={20} color="#C7C7CC" style={styles.chevron} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  content: {
    flex: 1,
    gap: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  from: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    flex: 1,
  },
  to: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    flex: 1,
  },
  details: {
    flexDirection: 'row',
    gap: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 12,
    color: '#8E8E93',
  },
  scenicBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-start',
  },
  scenicText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#34C759',
  },
  favouriteBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 4,
  },
  chevron: {
    marginLeft: 4,
  },
});
