import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BusStop, TrainStation } from '@/types/transport.types';
import StationCard from './StationCard';

interface NearbyStationsProps {
  trainStations: TrainStation[];
  busStops: BusStop[];
}

export default function NearbyStations({ trainStations, busStops }: NearbyStationsProps) {
  return (
    <View>
      {trainStations.length > 0 && (
        <View style={styles.stationsContainer}>
          <Text style={styles.stationType}>Train Stations</Text>
          {trainStations.map(station => (
            <StationCard key={station.id} station={station} type="train" />
          ))}
        </View>
      )}
      {busStops.length > 0 && (
        <View style={styles.stationsContainer}>
          <Text style={styles.stationType}>Bus Stops</Text>
          {busStops.map(stop => (
            <StationCard key={stop.id} station={stop} type="bus" />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  stationsContainer: {
    marginBottom: 20,
  },
  stationType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 12,
  },
});

