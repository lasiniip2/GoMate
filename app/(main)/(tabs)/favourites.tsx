import React from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useFavourites } from '@/context/FavouritesContext';
import FavouriteDestinations from '@/components/favourites/FavouriteDestinations';
import FavouriteRoutes from '@/components/favourites/FavouriteRoutes';
import FavouriteSchedules from '@/components/favourites/FavouriteSchedules';
import EmptyFavourites from '@/components/favourites/EmptyFavourites';

export default function FavouritesScreen() {
  const {
    favouriteDestinations,
    favouriteRoutes,
    favouriteSchedules,
    loading,
  } = useFavourites();

  const hasAnyFavourites =
    favouriteDestinations.length > 0 ||
    favouriteRoutes.length > 0 ||
    favouriteSchedules.length > 0;

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading favourites...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favourites</Text>
        <Text style={styles.headerSubtitle}>
          Your saved destinations, routes, and schedules
        </Text>
      </View>

      {!hasAnyFavourites ? (
        <EmptyFavourites />
      ) : (
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <FavouriteDestinations favourites={favouriteDestinations} />
          <FavouriteRoutes favourites={favouriteRoutes} />
          <FavouriteSchedules favourites={favouriteSchedules} />
        </ScrollView>
      )}
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
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
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
  content: {
    flex: 1,
    padding: 20,
  },
});
