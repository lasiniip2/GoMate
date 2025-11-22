import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@/hooks/use-app-theme';

type TransportFilter = 'all' | 'train' | 'bus';

interface TransportModeSelectorProps {
  selectedMode: TransportFilter;
  onModeChange: (mode: TransportFilter) => void;
}

export default function TransportModeSelector({
  selectedMode,
  onModeChange,
}: TransportModeSelectorProps) {
  const { card, text, backgroundSecondary, primary, borderLight } = useAppTheme();
  
  return (
    <View style={[styles.filterContainer, { backgroundColor: card, borderBottomColor: borderLight }]}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity
          style={[styles.filterChip, { backgroundColor: backgroundSecondary }, selectedMode === 'all' && { backgroundColor: primary }]}
          onPress={() => onModeChange('all')}
        >
          <Text style={[styles.filterText, { color: selectedMode === 'all' ? '#fff' : primary }]}>
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterChip, { backgroundColor: backgroundSecondary }, selectedMode === 'train' && { backgroundColor: primary }]}
          onPress={() => onModeChange('train')}
        >
          <Ionicons
            name="train"
            size={16}
            color={selectedMode === 'train' ? '#fff' : primary}
            style={styles.filterIcon}
          />
          <Text style={[styles.filterText, { color: selectedMode === 'train' ? '#fff' : primary }]}>
            Trains
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterChip, { backgroundColor: backgroundSecondary }, selectedMode === 'bus' && { backgroundColor: primary }]}
          onPress={() => onModeChange('bus')}
        >
          <Ionicons
            name="bus"
            size={16}
            color={selectedMode === 'bus' ? '#fff' : primary}
            style={styles.filterIcon}
          />
          <Text style={[styles.filterText, { color: selectedMode === 'bus' ? '#fff' : primary }]}>
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
    borderBottomWidth: 1,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  filterIcon: {
    marginRight: 6,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
