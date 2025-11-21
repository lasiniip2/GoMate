import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { transportService } from '@/services/transportService';
import { Route, Schedule, BusStop, TrainStation } from '@/types/transport.types';
import RoutesList from '@/components/routes/RoutesList';
import ScheduleCard from '@/components/routes/ScheduleCard';
import TransportModeSelector from '@/components/routes/TransportModeSelector';
import NearbyStations from '@/components/routes/NearbyStations';

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

      <TransportModeSelector selectedMode={filter} onModeChange={setFilter} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Routes Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Available Routes ({filteredRoutes.length})
          </Text>
          <RoutesList routes={filteredRoutes} onRoutePress={handleRoutePress} />
        </View>

        {/* Upcoming Schedules Section */}
        {upcomingSchedules.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Upcoming Departures</Text>
            {upcomingSchedules.map(schedule => {
              const route = routes.find(r => r.id === schedule.routeId);
              if (!route) return null;
              return <ScheduleCard key={schedule.id} schedule={schedule} route={route} />;
            })}
          </View>
        )}

        {/* Nearby Stations Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nearby Stations</Text>
          <NearbyStations trainStations={trainStations} busStops={busStops} />
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
});
