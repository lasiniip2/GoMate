import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Route } from '@/types/transport.types';
import RouteCard from './RouteCard';

interface RecentRoutesProps {
  routes: Route[];
  loading?: boolean;
}

export default function RecentRoutes({ routes, loading }: RecentRoutesProps) {
  const router = useRouter();

  const handleRoutePress = (route: Route) => {
    router.push({
      pathname: '/(main)/route-details',
      params: { id: route.id },
    });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Recently Viewed</Text>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      </View>
    );
  }

  if (routes.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recently Viewed</Text>
      <View style={styles.content}>
        {routes.slice(0, 3).map((route) => (
          <RouteCard
            key={route.id}
            route={route}
            onPress={() => handleRoutePress(route)}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 16,
  },
  content: {
    gap: 0,
  },
  loadingContainer: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
