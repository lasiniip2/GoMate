import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FavouriteSchedule } from '@/types/favourite.types';
import { useFavourites } from '@/context/FavouritesContext';
import { useAppTheme } from '@/hooks/use-app-theme';

interface FavouriteSchedulesProps {
  favourites: FavouriteSchedule[];
}

export default function FavouriteSchedules({ favourites }: FavouriteSchedulesProps) {
  const { removeSchedule } = useFavourites();
  const { card, text, textSecondary, backgroundSecondary, primary, success, warning, error } = useAppTheme();

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
      <Text style={[styles.sectionTitle, { color: text }]}>Schedules ({favourites.length})</Text>
      {favourites.map(fav => (
        <View key={fav.id} style={[styles.card, { backgroundColor: card }]}>
          <View style={[styles.iconContainer, { backgroundColor: backgroundSecondary }]}>
            <Ionicons
              name={getTransportIcon(fav.route.transportMode)}
              size={20}
              color={primary}
            />
          </View>
          <View style={styles.info}>
            <Text style={[styles.name, { color: text }]}>
              {fav.schedule.trainName || fav.schedule.busNumber}
            </Text>
            <Text style={[styles.route, { color: textSecondary }]}>{fav.route.name}</Text>
            <View style={styles.times}>
              <Text style={[styles.time, { color: textSecondary }]}>Departs: {fav.schedule.departureTime}</Text>
              <Text style={[styles.time, { color: textSecondary }]}>Arrives: {fav.schedule.arrivalTime}</Text>
            </View>
          </View>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: fav.schedule.status === 'on-time' ? success + '20' : fav.schedule.status === 'delayed' ? warning + '20' : error + '20' }
            ]}
          >
            <Text style={[styles.statusText, { color: fav.schedule.status === 'on-time' ? success : fav.schedule.status === 'delayed' ? warning : error }]}>
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
    marginBottom: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
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
    marginBottom: 2,
  },
  route: {
    fontSize: 12,
    marginBottom: 6,
  },
  times: {
    flexDirection: 'row',
    gap: 12,
  },
  time: {
    fontSize: 11,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  removeButton: {
    padding: 6,
  },
});

