import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { transportService } from '@/services/transportService';
import { Route, Schedule } from '@/types/transport.types';
import { useFavourites } from '@/context/FavouritesContext';
import { useAppTheme } from '@/hooks/use-app-theme';

export default function RouteDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [route, setRoute] = useState<Route | null>(null);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const { isRouteFavourite, addRoute, removeRoute } = useFavourites();
  const { background, card, text, textSecondary, primary, icon, success, backgroundSecondary } = useAppTheme();

  const isFavourite = route ? isRouteFavourite(route.id) : false;

  useEffect(() => {
    loadRouteData();
  }, [id]);

  const loadRouteData = async () => {
    try {
      const routeData = await transportService.getRouteById(id as string);
      setRoute(routeData);

      if (routeData) {
        const scheduleData = await transportService.getSchedulesForRoute(routeData.id);
        setSchedules(scheduleData);
        // Save as recently viewed
        await transportService.saveRecentRoute(routeData);
      }
    } catch (error) {
      console.error('Error loading route:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFavouriteToggle = async () => {
    if (!route) return;
    if (isFavourite) {
      await removeRoute(route.id);
    } else {
      await addRoute(route);
    }
  };

  const getTransportIcon = (mode: string) => {
    switch (mode) {
      case 'train':
        return 'train';
      case 'bus':
        return 'bus';
      case 'car':
        return 'car';
      default:
        return 'navigate';
    }
  };

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: background }]}>
        <ActivityIndicator size="large" color={primary} />
      </View>
    );
  }

  if (!route) {
    return (
      <View style={[styles.errorContainer, { backgroundColor: background }]}>
        <Ionicons name="alert-circle-outline" size={64} color={icon} />
        <Text style={[styles.errorText, { color: textSecondary }]}>Route not found</Text>
        <TouchableOpacity style={[styles.backButton, { backgroundColor: primary }]} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <View style={[styles.header, { backgroundColor: card }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: text }]}>Route Details</Text>
        <TouchableOpacity style={styles.favouriteHeaderBtn} onPress={handleFavouriteToggle}>
          <Ionicons
            name={isFavourite ? 'heart' : 'heart-outline'}
            size={24}
            color={isFavourite ? '#FF3B30' : icon}
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={[styles.routeHeader, { backgroundColor: card }]}>
            <View style={[styles.transportIconContainer, { backgroundColor: backgroundSecondary }]}>
              <Ionicons
                name={getTransportIcon(route.transportMode)}
                size={32}
                color={primary}
              />
            </View>
            <View style={styles.routeTitleContainer}>
              <Text style={[styles.transportMode, { color: primary }]}>{route.transportMode.toUpperCase()}</Text>
              <Text style={[styles.routeTitle, { color: text }]}>
                {route.from} → {route.to}
              </Text>
            </View>
            {route.scenic && (
              <View style={[styles.scenicBadge, { backgroundColor: success + '20' }]}>
                <Ionicons name="eye" size={14} color={success} />
                <Text style={[styles.scenicText, { color: success }]}>Scenic</Text>
              </View>
            )}
          </View>

          <View style={styles.infoGrid}>
            <View style={[styles.infoCard, { backgroundColor: card }]}>
              <Ionicons name="time-outline" size={24} color={primary} />
              <Text style={[styles.infoLabel, { color: textSecondary }]}>Duration</Text>
              <Text style={[styles.infoValue, { color: text }]}>{route.duration}</Text>
            </View>
            <View style={[styles.infoCard, { backgroundColor: card }]}>
              <Ionicons name="navigate-outline" size={24} color={primary} />
              <Text style={[styles.infoLabel, { color: textSecondary }]}>Distance</Text>
              <Text style={[styles.infoValue, { color: text }]}>{route.distance}</Text>
            </View>
            <View style={[styles.infoCard, { backgroundColor: card }]}>
              <Ionicons name="cash-outline" size={24} color={primary} />
              <Text style={[styles.infoLabel, { color: textSecondary }]}>Price</Text>
              <Text style={[styles.infoValue, { color: text }]}>LKR {route.price}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="location" size={20} color={primary} />
              <Text style={[styles.sectionTitle, { color: text }]}>Route Information</Text>
            </View>
            <View style={[styles.routePoints, { backgroundColor: card }]}>
              <View style={styles.routePoint}>
                <View style={[styles.pointDot, { backgroundColor: primary }]} />
                <View style={styles.pointContent}>
                  <Text style={[styles.pointLabel, { color: textSecondary }]}>From</Text>
                  <Text style={[styles.pointValue, { color: text }]}>{route.from}</Text>
                </View>
              </View>
              <View style={[styles.routeLine, { backgroundColor: primary }]} />
              <View style={styles.routePoint}>
                <View style={[styles.pointDot, { backgroundColor: primary }]} />
                <View style={styles.pointContent}>
                  <Text style={[styles.pointLabel, { color: textSecondary }]}>To</Text>
                  <Text style={[styles.pointValue, { color: text }]}>{route.to}</Text>
                </View>
              </View>
            </View>
          </View>

          {schedules.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons name="calendar-outline" size={20} color={primary} />
                <Text style={[styles.sectionTitle, { color: text }]}>Schedules</Text>
              </View>
              {schedules.map((schedule) => (
                <View key={schedule.id} style={[styles.scheduleCard, { backgroundColor: card }]}>
                  <View style={styles.scheduleTime}>
                    <View style={styles.timeColumn}>
                      <Text style={[styles.timeLabel, { color: textSecondary }]}>Departure</Text>
                      <Text style={[styles.timeValue, { color: text }]}>{schedule.departureTime}</Text>
                    </View>
                    <Ionicons name="arrow-forward" size={20} color={icon} />
                    <View style={styles.timeColumn}>
                      <Text style={[styles.timeLabel, { color: textSecondary }]}>Arrival</Text>
                      <Text style={[styles.timeValue, { color: text }]}>{schedule.arrivalTime}</Text>
                    </View>
                  </View>
                  <View style={[styles.frequencyContainer, { borderTopColor: backgroundSecondary }]}>
                    <Ionicons name="repeat-outline" size={16} color={icon} />
                    <Text style={[styles.frequencyText, { color: textSecondary }]}>{schedule.frequency}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {schedules.length === 0 && (
            <View style={styles.noSchedules}>
              <Ionicons name="time-outline" size={48} color={icon} />
              <Text style={[styles.noSchedulesText, { color: textSecondary }]}>No schedules available</Text>
              <Text style={[styles.noSchedulesSubtext, { color: icon }]}>Check back later for schedule updates</Text>
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
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
  },
  backButton: {
    marginTop: 24,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  backBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  favouriteHeaderBtn: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  routeHeader: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  transportIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  routeTitleContainer: {
    marginBottom: 12,
  },
  transportMode: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 4,
    letterSpacing: 1,
  },
  routeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  scenicBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  scenicText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  infoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  infoCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  infoLabel: {
    fontSize: 12,
    marginTop: 8,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 8,
  },
  routePoints: {
    padding: 20,
    borderRadius: 12,
  },
  routePoint: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  pointContent: {
    flex: 1,
  },
  pointLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  pointValue: {
    fontSize: 18,
    fontWeight: '600',
  },
  routeLine: {
    width: 2,
    height: 24,
    marginLeft: 5,
    marginVertical: 8,
  },
  scheduleCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  scheduleTime: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  timeColumn: {
    flex: 1,
  },
  timeLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  timeValue: {
    fontSize: 20,
    fontWeight: '700',
  },
  frequencyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
  },
  frequencyText: {
    fontSize: 14,
    marginLeft: 6,
  },
  noSchedules: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  noSchedulesText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
  },
  noSchedulesSubtext: {
    fontSize: 14,
    marginTop: 8,
  },
});
