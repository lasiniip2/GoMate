import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { destinationService } from '@/services/destinationService';
import { Destination } from '@/types/destination.types';
import { useAppTheme } from '@/hooks/use-app-theme';

const POPULAR_SEARCHES = [
  { id: '1', name: 'Sigiriya Rock Fortress', category: 'landmark' },
  { id: '2', name: 'Ella', category: 'city' },
  { id: '3', name: 'Mirissa Beach', category: 'beach' },
  { id: '5', name: 'Yala National Park', category: 'nature' },
  { id: '3', name: 'Temple of the Tooth', category: 'religious' },
];

export default function SearchScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Destination[]>([]);
  const [searching, setSearching] = useState(false);

  const { background, card, text, textSecondary, borderLight, icon, primary, backgroundSecondary } = useAppTheme();

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.trim().length === 0) {
      setSearchResults([]);
      return;
    }

    setSearching(true);
    try {
      const results = await destinationService.searchDestinations(query);
      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setSearching(false);
    }
  };

  const handlePopularSearchPress = async (searchTerm: string) => {
    setSearchQuery(searchTerm);
    await handleSearch(searchTerm);
  };

  const handleDestinationPress = (destination: Destination) => {
    router.push({
      pathname: '/(main)/destination-details',
      params: { id: destination.id },
    });
  };

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: any } = {
      landmark: 'flag',
      beach: 'water',
      city: 'business',
      nature: 'leaf',
      religious: 'moon',
      museum: 'library',
      adventure: 'bicycle',
    };
    return icons[category] || 'location';
  };

  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <View style={[styles.header, { backgroundColor: card, borderBottomColor: borderLight }]}>
        <Text style={[styles.headerTitle, { color: text }]}>Explore Destinations</Text>
      </View>

      <View style={[styles.searchContainer, { backgroundColor: background }]}>
        <View style={[styles.searchBar, { backgroundColor: card, borderColor: borderLight }]}>
          <Ionicons name="search" size={20} color={icon} style={styles.searchIcon} />
          <TextInput
            style={[styles.searchInput, { color: text }]}
            placeholder="Search destinations..."
            placeholderTextColor={textSecondary}
            value={searchQuery}
            onChangeText={handleSearch}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => handleSearch('')}>
              <Ionicons name="close-circle" size={20} color={icon} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {searchQuery.length === 0 ? (
          <View style={styles.popularSection}>
            <Text style={[styles.sectionTitle, { color: text }]}>Popular Searches</Text>
            {POPULAR_SEARCHES.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.popularItem, { backgroundColor: card, borderColor: borderLight }]}
                onPress={() => handlePopularSearchPress(item.name)}
              >
                <View style={[styles.popularIconContainer, { backgroundColor: backgroundSecondary }]}>
                  <Ionicons
                    name={getCategoryIcon(item.category)}
                    size={20}
                    color={primary}
                  />
                </View>
                <Text style={[styles.popularText, { color: text }]}>{item.name}</Text>
                <Ionicons name="arrow-forward" size={18} color={textSecondary} />
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.resultsSection}>
            <Text style={[styles.resultsTitle, { color: text }]}>
              {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'} found
            </Text>
            {searchResults.map((destination) => (
              <TouchableOpacity
                key={destination.id}
                style={[styles.resultCard, { backgroundColor: card, borderColor: borderLight }]}
                onPress={() => handleDestinationPress(destination)}
                activeOpacity={0.7}
              >
                <Image source={{ uri: destination.image }} style={styles.resultImage} />
                <View style={styles.resultContent}>
                  <View style={styles.resultHeader}>
                    <Text style={[styles.resultName, { color: text }]} numberOfLines={1}>
                      {destination.name}
                    </Text>
                    <View style={[styles.ratingContainer, { backgroundColor: backgroundSecondary }]}>
                      <Ionicons name="star" size={14} color="#FFD700" />
                      <Text style={[styles.ratingText, { color: text }]}>{destination.rating.toFixed(1)}</Text>
                    </View>
                  </View>
                  <View style={[styles.categoryBadge, { backgroundColor: backgroundSecondary }]}>
                    <Ionicons
                      name={getCategoryIcon(destination.category)}
                      size={12}
                      color={primary}
                    />
                    <Text style={[styles.categoryText, { color: primary }]}>{destination.category}</Text>
                  </View>
                  <Text style={[styles.resultDescription, { color: textSecondary }]} numberOfLines={2}>
                    {destination.description}
                  </Text>
                  <View style={styles.resultFooter}>
                    <Text style={[styles.viewDetailsText, { color: primary }]}>View details</Text>
                    <Ionicons name="chevron-forward" size={16} color={primary} />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
            {searchResults.length === 0 && !searching && (
              <View style={styles.emptyState}>
                <Ionicons name="search-outline" size={64} color={textSecondary} />
                <Text style={[styles.emptyTitle, { color: text }]}>No destinations found</Text>
                <Text style={[styles.emptySubtitle, { color: textSecondary }]}>Try searching with different keywords</Text>
              </View>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
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
  },
  content: {
    flex: 1,
  },
  popularSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  popularItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
  },
  popularIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  popularText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
  },
  resultsSection: {
    padding: 20,
  },
  resultsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  resultCard: {
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  resultContent: {
    padding: 16,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  resultName: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    marginRight: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
    textTransform: 'capitalize',
  },
  resultDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  resultFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  viewDetailsText: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: 4,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: 'center',
  },
});
