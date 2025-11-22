import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BusStop, TrainStation } from '@/types/transport.types';
import StationCard from './StationCard';
import { useAppTheme } from '@/hooks/use-app-theme';

interface NearbyStationsProps {
  trainStations: TrainStation[];
  busStops: BusStop[];
}

export default function NearbyStations({ trainStations, busStops }: NearbyStationsProps) {
  const { text } = useAppTheme();
  
  return (
    <View>
      {trainStations.length > 0 && (
        <View style={styles.stationsContainer}>
          <Text style={[styles.stationType, { color: text }]}>Train Stations</Text>
          {trainStations.map(station => (
            <StationCard key={station.id} station={station} type="train" />
          ))}
        </View>
      )}
      {busStops.length > 0 && (
        <View style={styles.stationsContainer}>
          <Text style={[styles.stationType, { color: text }]}>Bus Stops</Text>
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
    marginBottom: 12,
  },
});

