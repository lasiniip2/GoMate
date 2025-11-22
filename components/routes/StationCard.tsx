import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BusStop, TrainStation } from '@/types/transport.types';
import { useAppTheme } from '@/hooks/use-app-theme';

interface StationCardProps {
  station: BusStop | TrainStation;
  type: 'bus' | 'train';
}

export default function StationCard({ station, type }: StationCardProps) {
  const { card, text, textSecondary, backgroundSecondary, primary } = useAppTheme();
  
  return (
    <View style={[styles.stationCard, { backgroundColor: card }]}>
      <View style={[styles.stationIconContainer, { backgroundColor: backgroundSecondary }]}>
        <Ionicons name={type} size={20} color={primary} />
      </View>
      <View style={styles.stationInfo}>
        <Text style={[styles.stationName, { color: text }]}>{station.name}</Text>
        <Text style={[styles.stationDetails, { color: textSecondary }]}>
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
    marginBottom: 2,
  },
  stationDetails: {
    fontSize: 12,
  },
});
