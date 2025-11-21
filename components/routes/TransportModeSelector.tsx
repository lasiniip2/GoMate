import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type TransportFilter = 'all' | 'train' | 'bus';

interface TransportModeSelectorProps {
  selectedMode: TransportFilter;
  onModeChange: (mode: TransportFilter) => void;
}

export default function TransportModeSelector({
  selectedMode,
  onModeChange,
}: TransportModeSelectorProps) {
  return (
    <View style={styles.filterContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity
          style={[styles.filterChip, selectedMode === 'all' && styles.filterChipActive]}
          onPress={() => onModeChange('all')}
        >
          <Text style={[styles.filterText, selectedMode === 'all' && styles.filterTextActive]}>
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterChip, selectedMode === 'train' && styles.filterChipActive]}
          onPress={() => onModeChange('train')}
        >
          <Ionicons
            name="train"
            size={16}
            color={selectedMode === 'train' ? '#fff' : '#007AFF'}
            style={styles.filterIcon}
          />
          <Text style={[styles.filterText, selectedMode === 'train' && styles.filterTextActive]}>
            Trains
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterChip, selectedMode === 'bus' && styles.filterChipActive]}
          onPress={() => onModeChange('bus')}
        >
          <Ionicons
            name="bus"
            size={16}
            color={selectedMode === 'bus' ? '#fff' : '#007AFF'}
            style={styles.filterIcon}
          />
          <Text style={[styles.filterText, selectedMode === 'bus' && styles.filterTextActive]}>
            Buses
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  filterContainer: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F2F2F7',
    marginRight: 10,
  },
  filterChipActive: {
    backgroundColor: '#007AFF',
  },
  filterIcon: {
    marginRight: 6,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
  },
  filterTextActive: {
    color: '#fff',
  },
});
