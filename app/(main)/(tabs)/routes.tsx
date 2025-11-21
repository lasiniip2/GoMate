import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { transportService } from '@/services/transportService';
import { Route, Schedule, BusStop, TrainStation } from '@/types/transport.types';

type TransportFilter = 'all' | 'train' | 'bus';

export default function RoutesScreen() {
  const router = useRouter();
  const [routes, setRoutes] = useState<Route[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [busStops, setBusStops] = useState<BusStop[]>([]);
  const [trainStations, setTrainStations] = useState<TrainStation[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<TransportFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [routesData, schedulesData, busStopsData, trainStationsData] = await Promise.all([
        transportService.getAllRoutes(),
        transportService.getAllSchedules(),
        transportService.getAllBusStops(),
        transportService.getAllTrainStations(),
      ]);
      setRoutes(routesData);
      setSchedules(schedulesData);
      setBusStops(busStopsData);
      setTrainStations(trainStationsData);
    } catch (error) {
      console.error('Error loading routes data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredRoutes = () => {
    let filtered = routes;

    // Filter by transport mode
    if (filter !== 'all') {
      filtered = filtered.filter(route => route.transportMode === filter);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        route =>
          route.name.toLowerCase().includes(query) ||
          route.from.toLowerCase().includes(query) ||
          route.to.toLowerCase().includes(query)
      );
    }

    return filtered;
  };

  const handleRoutePress = (route: Route) => {
    router.push({
      pathname: '/(main)/route-details',
      params: { id: route.id },
    });
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

  const getUpcomingSchedules = () => {
    return schedules.slice(0, 5);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading routes...</Text>
      </View>
    );
  }

  const filteredRoutes = getFilteredRoutes();
  const upcomingSchedules = getUpcomingSchedules();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Routes & Schedules</Text>
        <Text style={styles.headerSubtitle}>Browse transport options</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#8E8E93" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search routes..."
            placeholderTextColor="#8E8E93"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#8E8E93" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={[styles.filterChip, filter === 'all' && styles.filterChipActive]}
            onPress={() => setFilter('all')}
          >
            <Text style={[styles.filterText, filter === 'all' && styles.filterTextActive]}>
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterChip, filter === 'train' && styles.filterChipActive]}
            onPress={() => setFilter('train')}
          >
            <Ionicons
              name="train"
              size={16}
              color={filter === 'train' ? '#fff' : '#007AFF'}
              style={styles.filterIcon}
            />
            <Text style={[styles.filterText, filter === 'train' && styles.filterTextActive]}>
              Trains
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filterChip, filter === 'bus' && styles.filterChipActive]}
            onPress={() => setFilter('bus')}
          >
            <Ionicons
              name="bus"
              size={16}
              color={filter === 'bus' ? '#fff' : '#007AFF'}
              style={styles.filterIcon}
            />
            <Text style={[styles.filterText, filter === 'bus' && styles.filterTextActive]}>
              Buses
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Routes Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Available Routes ({filteredRoutes.length})
          </Text>
          {filteredRoutes.length > 0 ? (
            filteredRoutes.map(route => (
              <TouchableOpacity
                key={route.id}
                style={styles.routeCard}
                onPress={() => handleRoutePress(route)}
                activeOpacity={0.7}
              >
                <View style={styles.routeIconContainer}>
                  <Ionicons
                    name={getTransportIcon(route.transportMode)}
                    size={24}
                    color="#007AFF"
                  />
                </View>
                <View style={styles.routeInfo}>
                  <View style={styles.routeHeader}>
                    <Text style={styles.routeName}>{route.name}</Text>
                    {route.scenic && (
                      <View style={styles.scenicBadge}>
                        <Ionicons name="eye" size={12} color="#34C759" />
                        <Text style={styles.scenicText}>Scenic</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.routeFromTo}>
                    {route.from} → {route.to}
                  </Text>
                  <View style={styles.routeDetails}>
                    <View style={styles.routeDetail}>
                      <Ionicons name="time-outline" size={14} color="#8E8E93" />
                      <Text style={styles.routeDetailText}>{route.duration}</Text>
                    </View>
                    <View style={styles.routeDetail}>
                      <Ionicons name="navigate-outline" size={14} color="#8E8E93" />
                      <Text style={styles.routeDetailText}>{route.distance}</Text>
                    </View>
                    <View style={styles.routeDetail}>
                      <Ionicons name="cash-outline" size={14} color="#8E8E93" />
                      <Text style={styles.routeDetailText}>LKR {route.price}</Text>
                    </View>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="search-outline" size={48} color="#C7C7CC" />
              <Text style={styles.emptyText}>No routes found</Text>
            </View>
          )}
        </View>

        {/* Upcoming Schedules Section */}
        {upcomingSchedules.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Upcoming Departures</Text>
            {upcomingSchedules.map(schedule => {
              const route = routes.find(r => r.id === schedule.routeId);
              if (!route) return null;
              return (
                <View key={schedule.id} style={styles.scheduleCard}>
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
            })}
          </View>
        )}

        {/* Nearby Stations Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nearby Stations</Text>
          {trainStations.length > 0 && (
            <View style={styles.stationsContainer}>
              <Text style={styles.stationType}>Train Stations</Text>
              {trainStations.map(station => (
                <View key={station.id} style={styles.stationCard}>
                  <View style={styles.stationIconContainer}>
                    <Ionicons name="train" size={20} color="#007AFF" />
                  </View>
                  <View style={styles.stationInfo}>
                    <Text style={styles.stationName}>{station.name}</Text>
                    <Text style={styles.stationDetails}>
                      {station.code} • {station.city}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}
          {busStops.length > 0 && (
            <View style={styles.stationsContainer}>
              <Text style={styles.stationType}>Bus Stops</Text>
              {busStops.map(stop => (
                <View key={stop.id} style={styles.stationCard}>
                  <View style={styles.stationIconContainer}>
                    <Ionicons name="bus" size={20} color="#007AFF" />
                  </View>
                  <View style={styles.stationInfo}>
                    <Text style={styles.stationName}>{stop.name}</Text>
                    <Text style={styles.stationDetails}>
                      {stop.code} • {stop.city}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#8E8E93',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 10,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1C1C1E',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#8E8E93',
    marginTop: 4,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1C1C1E',
  },
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
  content: {
    flex: 1,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 16,
  },
  routeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  routeIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  routeInfo: {
    flex: 1,
  },
  routeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  routeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    flex: 1,
  },
  scenicBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginLeft: 8,
  },
  scenicText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#34C759',
    marginLeft: 4,
  },
  routeFromTo: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 8,
  },
  routeDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  routeDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  routeDetailText: {
    fontSize: 12,
    color: '#8E8E93',
    marginLeft: 4,
  },
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
  stationsContainer: {
    marginBottom: 20,
  },
  stationType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 12,
  },
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
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 12,
  },
});
