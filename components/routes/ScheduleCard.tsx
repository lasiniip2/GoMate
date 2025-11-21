import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Schedule, Route } from '@/types/transport.types';

interface ScheduleCardProps {
  schedule: Schedule;
  route: Route;
}

export default function ScheduleCard({ schedule, route }: ScheduleCardProps) {
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
    <View style={styles.scheduleCard}>
      <View style={styles.scheduleIconContainer}>
        <Ionicons
          name={getTransportIcon(route.transportMode)}
          size={20}
          color="#007AFF"
        />
      </View>
      <View style={styles.scheduleInfo}>
        <Text style={styles.scheduleName}>
          {schedule.trainName || schedule.busNumber}
        </Text>
        <Text style={styles.scheduleRoute}>{route.name}</Text>
        <View style={styles.scheduleTime}>
          <Text style={styles.scheduleTimeText}>
            Departs: {schedule.departureTime}
          </Text>
          <Text style={styles.scheduleTimeText}>
            Arrives: {schedule.arrivalTime}
          </Text>
        </View>
      </View>
      <View
        style={[
          styles.statusBadge,
          schedule.status === 'delayed' && styles.statusDelayed,
          schedule.status === 'cancelled' && styles.statusCancelled,
        ]}
      >
        <Text style={styles.statusText}>
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
    backgroundColor: '#fff',
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
    backgroundColor: '#F2F2F7',
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
    color: '#1C1C1E',
    marginBottom: 2,
  },
  scheduleRoute: {
    fontSize: 13,
    color: '#8E8E93',
    marginBottom: 6,
  },
  scheduleTime: {
    flexDirection: 'row',
    gap: 12,
  },
  scheduleTimeText: {
    fontSize: 12,
    color: '#8E8E93',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#E8F5E9',
  },
  statusDelayed: {
    backgroundColor: '#FFF3E0',
  },
  statusCancelled: {
    backgroundColor: '#FFEBEE',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#34C759',
  },
});
