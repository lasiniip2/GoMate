import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { destinationService } from '@/services/destinationService';
import { transportService } from '@/services/transportService';
import { Destination } from '@/types/destination.types';
import { Route } from '@/types/transport.types';
import QuickSearch from '@/components/home/QuickSearch';
import SuggestedDestinations from '@/components/home/SuggestedDestinations';
import PopularRoutes from '@/components/home/PopularRoutes';
import RecentRoutes from '@/components/home/RecentRoutes';
import LoadingSpinner from '@/components/common/LoadingSpinner';

export default function HomeScreen() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [suggestedDestinations, setSuggestedDestinations] = useState<Destination[]>([]);
  const [popularRoutes, setPopularRoutes] = useState<Route[]>([]);
  const [recentRoutes, setRecentRoutes] = useState<Route[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [destinations, routes, recent] = await Promise.all([
        destinationService.getSuggestedDestinations(),
        transportService.getPopularRoutes(),
        transportService.getRecentRoutes(),
      ]);

      setSuggestedDestinations(destinations);
      setPopularRoutes(routes);
      setRecentRoutes(recent);
    } catch (error) {
      console.error('Error loading home data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  if (loading) {
    return <LoadingSpinner message="Loading travel options..." />;
  }

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor="#007AFF" />
      }
    >
      <View style={styles.header}>
        <Text style={styles.greeting}>{getGreeting()},</Text>
        <Text style={styles.userName}>{user?.name || 'Traveler'}</Text>
      </View>

      <QuickSearch />

      <SuggestedDestinations destinations={suggestedDestinations} />

      <PopularRoutes routes={popularRoutes} />

      {recentRoutes.length > 0 && <RecentRoutes routes={recentRoutes} />}

      <View style={styles.footer}>
        <Text style={styles.footerText}>Plan your next adventure with GoMate</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  content: {
    paddingBottom: 40,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 24,
  },
  greeting: {
    fontSize: 16,
    color: '#8E8E93',
    marginBottom: 4,
  },
  userName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1C1C1E',
  },
  footer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
  },
});
