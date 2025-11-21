import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BusStop, TrainStation } from '@/types/transport.types';

interface StationCardProps {
  station: BusStop | TrainStation;
  type: 'bus' | 'train';
}

export default function StationCard({ station, type }: StationCardProps) {
  return (
    <View style={styles.stationCard}>
      <View style={styles.stationIconContainer}>
        <Ionicons name={type} size={20} color="#007AFF" />
      </View>
      <View style={styles.stationInfo}>
        <Text style={styles.stationName}>{station.name}</Text>
        <Text style={styles.stationDetails}>
          {station.code} • {station.city}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  stationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  stationIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stationInfo: {
    flex: 1,
  },
  stationName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 2,
  },
  stationDetails: {
    fontSize: 12,
    color: '#8E8E93',
  },
});
