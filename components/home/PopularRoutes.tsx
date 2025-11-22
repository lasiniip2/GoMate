import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Route } from '@/types/transport.types';
import RouteCard from './RouteCard';
import { useAppTheme } from '@/hooks/use-app-theme';

interface PopularRoutesProps {
  routes: Route[];
  loading?: boolean;
}

export default function PopularRoutes({ routes, loading }: PopularRoutesProps) {
  const router = useRouter();
  const { text, primary } = useAppTheme();

  const handleRoutePress = (route: Route) => {
    router.push({
      pathname: '/(main)/route-details',
      params: { id: route.id },
    });
  };

  const handleViewAll = () => {
    router.push('/(main)/(tabs)/routes');
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: text }]}>Popular Routes</Text>
        </View>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={primary} />
        </View>
      </View>
    );
  }

  if (routes.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: text }]}>Popular Routes</Text>
        <TouchableOpacity onPress={handleViewAll}>
          <Text style={[styles.viewAll, { color: primary }]}>View All</Text>
        </TouchableOpacity>
      </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
  },
  viewAll: {
    fontSize: 14,
    fontWeight: '600',
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
