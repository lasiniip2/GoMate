import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Schedule, Route } from '@/types/transport.types';
import { useAppTheme } from '@/hooks/use-app-theme';

interface ScheduleCardProps {
  schedule: Schedule;
  route: Route;
}

export default function ScheduleCard({ schedule, route }: ScheduleCardProps) {
  const { card, text, textSecondary, backgroundSecondary, primary, success, warning, error } = useAppTheme();
  
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

  return (
    <View style={[styles.scheduleCard, { backgroundColor: card }]}>
      <View style={[styles.scheduleIconContainer, { backgroundColor: backgroundSecondary }]}>
        <Ionicons
          name={getTransportIcon(route.transportMode)}
          size={20}
          color={primary}
        />
      </View>
      <View style={styles.scheduleInfo}>
        <Text style={[styles.scheduleName, { color: text }]}>
          {schedule.trainName || schedule.busNumber}
        </Text>
        <Text style={[styles.scheduleRoute, { color: textSecondary }]}>{route.name}</Text>
        <View style={styles.scheduleTime}>
          <Text style={[styles.scheduleTimeText, { color: textSecondary }]}>
            Departs: {schedule.departureTime}
          </Text>
          <Text style={[styles.scheduleTimeText, { color: textSecondary }]}>
            Arrives: {schedule.arrivalTime}
          </Text>
        </View>
      </View>
      <View
        style={[
          styles.statusBadge,
          { backgroundColor: schedule.status === 'on-time' ? success + '20' : schedule.status === 'delayed' ? warning + '20' : error + '20' }
        ]}
      >
        <Text style={[styles.statusText, { color: schedule.status === 'on-time' ? success : schedule.status === 'delayed' ? warning : error }]}>
          {schedule.status === 'on-time'
            ? 'On Time'
            : schedule.status === 'delayed'
            ? 'Delayed'
            : 'Cancelled'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scheduleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  scheduleIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  scheduleInfo: {
    flex: 1,
  },
  scheduleName: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 2,
  },
  scheduleRoute: {
    fontSize: 13,
    marginBottom: 6,
  },
  scheduleTime: {
    flexDirection: 'row',
    gap: 12,
  },
  scheduleTimeText: {
    fontSize: 12,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
  },
});
