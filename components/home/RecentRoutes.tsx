import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Route } from '@/types/transport.types';
import RouteCard from './RouteCard';
import { useAppTheme } from '@/hooks/use-app-theme';

interface RecentRoutesProps {
  routes: Route[];
  loading?: boolean;
}

export default function RecentRoutes({ routes, loading }: RecentRoutesProps) {
  const router = useRouter();
  const { text, primary } = useAppTheme();

  const handleRoutePress = (route: Route) => {
    router.push({
      pathname: '/(main)/route-details',
      params: { id: route.id },
    });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={[styles.title, { color: text }]}>Recently Viewed</Text>
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
      <Text style={[styles.title, { color: text }]}>Recently Viewed</Text>
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
    fontSize: 20,
    fontWeight: '700',
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
