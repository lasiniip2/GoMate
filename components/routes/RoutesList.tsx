import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Route } from '@/types/transport.types';
import { useAppTheme } from '@/hooks/use-app-theme';

interface RoutesListProps {
  routes: Route[];
  onRoutePress: (route: Route) => void;
}

export default function RoutesList({ routes, onRoutePress }: RoutesListProps) {
  const { card, text, textSecondary, backgroundSecondary, primary, icon, success } = useAppTheme();
  
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

  if (routes.length === 0) {
    return (
      <View style={styles.emptyState}>
        <Ionicons name="search-outline" size={48} color={icon} />
        <Text style={[styles.emptyText, { color: textSecondary }]}>No routes found</Text>
      </View>
    );
  }

  return (
    <View>
      {routes.map(route => (
        <TouchableOpacity
          key={route.id}
          style={[styles.routeCard, { backgroundColor: card }]}
          onPress={() => onRoutePress(route)}
          activeOpacity={0.7}
        >
          <View style={[styles.routeIconContainer, { backgroundColor: backgroundSecondary }]}>
            <Ionicons
              name={getTransportIcon(route.transportMode)}
              size={24}
              color={primary}
            />
          </View>
          <View style={styles.routeInfo}>
            <View style={styles.routeHeader}>
              <Text style={[styles.routeName, { color: text }]}>{route.name}</Text>
              {route.scenic && (
                <View style={[styles.scenicBadge, { backgroundColor: success + '20' }]}>
                  <Ionicons name="eye" size={12} color={success} />
                  <Text style={[styles.scenicText, { color: success }]}>Scenic</Text>
                </View>
              )}
            </View>
            <Text style={[styles.routeFromTo, { color: textSecondary }]}>
              {route.from} → {route.to}
            </Text>
            <View style={styles.routeDetails}>
              <View style={styles.routeDetail}>
                <Ionicons name="time-outline" size={14} color={icon} />
                <Text style={[styles.routeDetailText, { color: textSecondary }]}>{route.duration}</Text>
              </View>
              <View style={styles.routeDetail}>
                <Ionicons name="navigate-outline" size={14} color={icon} />
                <Text style={[styles.routeDetailText, { color: textSecondary }]}>{route.distance}</Text>
              </View>
              <View style={styles.routeDetail}>
                <Ionicons name="cash-outline" size={14} color={icon} />
                <Text style={[styles.routeDetailText, { color: textSecondary }]}>LKR {route.price}</Text>
              </View>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color={icon} />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  routeCard: {
    flexDirection: 'row',
    alignItems: 'center',
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
    marginLeft: 4,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 14,
    marginTop: 12,
  },
});
