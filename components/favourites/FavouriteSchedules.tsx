import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FavouriteSchedule } from '@/types/favourite.types';
import { useFavourites } from '@/context/FavouritesContext';

interface FavouriteSchedulesProps {
  favourites: FavouriteSchedule[];
}

export default function FavouriteSchedules({ favourites }: FavouriteSchedulesProps) {
  const { removeSchedule } = useFavourites();

  const handleRemove = async (scheduleId: string) => {
    await removeSchedule(scheduleId);
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
      <Text style={styles.sectionTitle}>Schedules ({favourites.length})</Text>
      {favourites.map(fav => (
        <View key={fav.id} style={styles.card}>
          <View style={styles.iconContainer}>
            <Ionicons
              name={getTransportIcon(fav.route.transportMode)}
              size={20}
              color="#007AFF"
            />
          </View>
          <View style={styles.info}>
            <Text style={styles.name}>
              {fav.schedule.trainName || fav.schedule.busNumber}
            </Text>
            <Text style={styles.route}>{fav.route.name}</Text>
            <View style={styles.times}>
              <Text style={styles.time}>Departs: {fav.schedule.departureTime}</Text>
              <Text style={styles.time}>Arrives: {fav.schedule.arrivalTime}</Text>
            </View>
          </View>
          <View
            style={[
              styles.statusBadge,
              fav.schedule.status === 'delayed' && styles.statusDelayed,
              fav.schedule.status === 'cancelled' && styles.statusCancelled,
            ]}
          >
            <Text style={styles.statusText}>
              {fav.schedule.status === 'on-time'
                ? 'On Time'
                : fav.schedule.status === 'delayed'
                ? 'Delayed'
                : 'Cancelled'}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => handleRemove(fav.schedule.id)}
          >
            <Ionicons name="heart" size={22} color="#FF3B30" />
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
    color: '#1C1C1E',
    marginBottom: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 2,
  },
  route: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 6,
  },
  times: {
    flexDirection: 'row',
    gap: 12,
  },
  time: {
    fontSize: 11,
    color: '#8E8E93',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: '#E8F5E9',
    marginRight: 8,
  },
  statusDelayed: {
    backgroundColor: '#FFF3E0',
  },
  statusCancelled: {
    backgroundColor: '#FFEBEE',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#34C759',
  },
  removeButton: {
    padding: 6,
  },
});

