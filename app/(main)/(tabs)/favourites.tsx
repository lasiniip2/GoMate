import React from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useFavourites } from '@/context/FavouritesContext';
import FavouriteDestinations from '@/components/favourites/FavouriteDestinations';
import FavouriteRoutes from '@/components/favourites/FavouriteRoutes';
import FavouriteSchedules from '@/components/favourites/FavouriteSchedules';
import EmptyFavourites from '@/components/favourites/EmptyFavourites';
import { useAppTheme } from '@/hooks/use-app-theme';

export default function FavouritesScreen() {
  const {
    favouriteDestinations,
    favouriteRoutes,
    favouriteSchedules,
    loading,
  } = useFavourites();

  const { background, text, textSecondary, card, borderLight, primary } = useAppTheme();

  const hasAnyFavourites =
    favouriteDestinations.length > 0 ||
    favouriteRoutes.length > 0 ||
    favouriteSchedules.length > 0;

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: background }]}>
        <ActivityIndicator size="large" color={primary} />
        <Text style={[styles.loadingText, { color: textSecondary }]}>Loading favourites...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <View style={[styles.header, { backgroundColor: card, borderBottomColor: borderLight }]}>
        <Text style={[styles.headerTitle, { color: text }]}>Favourites</Text>
        <Text style={[styles.headerSubtitle, { color: textSecondary }]}>
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
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 16,
    marginTop: 4,
  },
  content: {
    flex: 1,
    padding: 20,
  },
});
