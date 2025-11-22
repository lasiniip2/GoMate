import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { destinationService } from '@/services/destinationService';
import { transportService } from '@/services/transportService';
import { Destination } from '@/types/destination.types';
import { Route } from '@/types/transport.types';
import { useFavourites } from '@/context/FavouritesContext';
import { useAppTheme } from '@/hooks/use-app-theme';

export default function DestinationDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);
  const { isDestinationFavourite, addDestination, removeDestination } = useFavourites();
  const { background, card, text, textSecondary, primary, icon, success, warning, backgroundSecondary } = useAppTheme();

  const isFavourite = destination ? isDestinationFavourite(destination.id) : false;

  useEffect(() => {
    loadDestinationData();
  }, [id]);

  const loadDestinationData = async () => {
    try {
      const dest = await destinationService.getDestinationById(id as string);
      setDestination(dest);

      // Get routes based on destination's routes array or match by city name in route.to
      if (dest) {
        const allRoutes = await transportService.getAllRoutes();
        let destinationRoutes: Route[] = [];
        
        // First, try to use the routes array from destination if it exists
        if (dest.routes && dest.routes.length > 0) {
          destinationRoutes = allRoutes.filter(route => 
            dest.routes!.includes(route.id)
          );
        }
        
        // If no routes found via routes array, try matching by name/location
        if (destinationRoutes.length === 0) {
          // Extract city name from destination name or use full name
          const nameParts = dest.name.split(' ');
          destinationRoutes = allRoutes.filter(route => {
            const routeTo = route.to.toLowerCase();
            const routeFrom = route.from.toLowerCase();
            const destName = dest.name.toLowerCase();
            
            // Check if destination name or any part matches route destination
            return nameParts.some(part => 
              routeTo.includes(part.toLowerCase()) && part.length > 3
            ) || routeTo.includes(destName);
          });
        }
        
        setRoutes(destinationRoutes);
      }
    } catch (error) {
      console.error('Error loading destination:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFavouriteToggle = async () => {
    if (!destination) return;
    if (isFavourite) {
      await removeDestination(destination.id);
    } else {
      await addDestination(destination);
    }
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

  if (!destination) {
    return (
      <View style={[styles.errorContainer, { backgroundColor: background }]}>
        <Ionicons name="alert-circle-outline" size={64} color={icon} />
        <Text style={[styles.errorText, { color: textSecondary }]}>Destination not found</Text>
        <TouchableOpacity style={[styles.backButton, { backgroundColor: primary }]} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: destination.image }} style={styles.image} />
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.favouriteBtn} onPress={handleFavouriteToggle}>
            <Ionicons
              name={isFavourite ? 'heart' : 'heart-outline'}
              size={28}
              color={isFavourite ? '#FF3B30' : icon}
            />
          </TouchableOpacity>
          <View style={styles.imageOverlay} />
        </View>

        <View style={[styles.content, { backgroundColor: background }]}>
          <View style={styles.header}>
            <View style={styles.titleContainer}>
              <Text style={[styles.title, { color: text }]}>{destination.name}</Text>
              {destination.popular && (
                <View style={styles.popularBadge}>
                  <Ionicons name="flame" size={14} color="#FF3B30" />
                  <Text style={styles.popularText}>Popular</Text>
                </View>
              )}
            </View>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={20} color="#FFD700" />
              <Text style={[styles.ratingText, { color: text }]}>{destination.rating.toFixed(1)}</Text>
            </View>
          </View>

          <View style={[styles.categoryContainer, { backgroundColor: primary + '20' }]}>
            <Ionicons name="pricetag" size={16} color={primary} />
            <Text style={[styles.category, { color: primary }]}>{destination.category}</Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: text }]}>About</Text>
            <Text style={[styles.description, { color: textSecondary }]}>
              {destination.longDescription || destination.description}
            </Text>
          </View>

          {destination.entryFee && (
            <View style={[styles.infoCard, { backgroundColor: card }]}>
              <View style={styles.infoRow}>
                <Ionicons name="cash-outline" size={20} color={primary} />
                <View style={styles.infoContent}>
                  <Text style={[styles.infoLabel, { color: text }]}>Entry Fee</Text>
                  <Text style={[styles.infoText, { color: textSecondary }]}>{destination.entryFee}</Text>
                </View>
              </View>
            </View>
          )}

          {destination.openingHours && (
            <View style={[styles.infoCard, { backgroundColor: card }]}>
              <View style={styles.infoRow}>
                <Ionicons name="time-outline" size={20} color={primary} />
                <View style={styles.infoContent}>
                  <Text style={[styles.infoLabel, { color: text }]}>Opening Hours</Text>
                  <Text style={[styles.infoText, { color: textSecondary }]}>{destination.openingHours}</Text>
                </View>
              </View>
            </View>
          )}

          {destination.bestTimeToVisit && (
            <View style={[styles.infoCard, { backgroundColor: card }]}>
              <View style={styles.infoRow}>
                <Ionicons name="calendar-outline" size={20} color={primary} />
                <View style={styles.infoContent}>
                  <Text style={[styles.infoLabel, { color: text }]}>Best Time to Visit</Text>
                  <Text style={[styles.infoText, { color: textSecondary }]}>{destination.bestTimeToVisit}</Text>
                </View>
              </View>
            </View>
          )}

          {destination.facilities && destination.facilities.length > 0 && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: text }]}>Facilities</Text>
              <View style={styles.tagsContainer}>
                {destination.facilities.map((facility, index) => (
                  <View key={index} style={[styles.tag, { backgroundColor: success + '20', borderColor: success + '40' }]}>
                    <Ionicons name="checkmark-circle" size={16} color={success} />
                    <Text style={[styles.tagText, { color: success }]}>{facility}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {destination.activities && destination.activities.length > 0 && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: text }]}>Things to Do</Text>
              <View style={styles.tagsContainer}>
                {destination.activities.map((activity, index) => (
                  <View key={index} style={[styles.activityTag, { backgroundColor: warning + '20', borderColor: warning + '40' }]}>
                    <Ionicons name="star-outline" size={16} color={warning} />
                    <Text style={[styles.activityTagText, { color: warning }]}>{activity}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          <View style={styles.locationSection}>
            <View style={styles.locationHeader}>
              <Ionicons name="location" size={18} color={primary} />
              <Text style={[styles.sectionTitle, { color: text }]}>Location</Text>
            </View>
            <Text style={[styles.locationText, { color: textSecondary }]}>
              Lat: {destination.latitude.toFixed(4)}, Long: {destination.longitude.toFixed(4)}
            </Text>
          </View>

          {routes.length > 0 && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: text }]}>Available Routes</Text>
              <Text style={[styles.routesSubtitle, { color: textSecondary }]}>
                {routes.length} {routes.length === 1 ? 'route' : 'routes'} available
              </Text>
              {routes.map((route) => (
                <TouchableOpacity
                  key={route.id}
                  style={[styles.routeCard, { backgroundColor: card }]}
                  onPress={() => handleRoutePress(route)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.routeIconContainer, { backgroundColor: backgroundSecondary }]}>
                    <Ionicons
                      name={getTransportIcon(route.transportMode)}
                      size={24}
                      color={primary}
                    />
                  </View>
                  <View style={styles.routeContent}>
                    <Text style={[styles.routeName, { color: text }]}>
                      {route.from} → {route.to}
                    </Text>
                    <View style={styles.routeDetails}>
                      <View style={styles.routeDetailItem}>
                        <Ionicons name="time-outline" size={14} color={icon} />
                        <Text style={[styles.routeDetailText, { color: textSecondary }]}>{route.duration}</Text>
                      </View>
                      <View style={styles.routeDetailItem}>
                        <Ionicons name="cash-outline" size={14} color={icon} />
                        <Text style={[styles.routeDetailText, { color: textSecondary }]}>LKR {route.price}</Text>
                      </View>
                    </View>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color={icon} />
                </TouchableOpacity>
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
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 300,
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  backBtn: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  favouriteBtn: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 12,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginRight: 8,
  },
  popularBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#FFE5E5',
    borderRadius: 8,
  },
  popularText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FF3B30',
    marginLeft: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 6,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 24,
  },
  category: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
    textTransform: 'capitalize',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  locationSection: {
    marginBottom: 24,
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 14,
  },
  routesSubtitle: {
    fontSize: 14,
    marginBottom: 12,
  },
  routeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  routeIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  routeContent: {
    flex: 1,
  },
  routeName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  routeDetails: {
    flexDirection: 'row',
  },
  routeDetailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  routeDetailText: {
    fontSize: 13,
    marginLeft: 4,
  },
  infoCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  infoContent: {
    marginLeft: 12,
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 20,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  tagText: {
    fontSize: 13,
    fontWeight: '500',
    marginLeft: 6,
  },
  activityTag: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  activityTagText: {
    fontSize: 13,
    fontWeight: '500',
    marginLeft: 6,
  },
});
