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
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore Destinations</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#8E8E93" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search destinations..."
            placeholderTextColor="#8E8E93"
            value={searchQuery}
            onChangeText={handleSearch}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => handleSearch('')}>
              <Ionicons name="close-circle" size={20} color="#8E8E93" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {searchQuery.length === 0 ? (
          <View style={styles.popularSection}>
            <Text style={styles.sectionTitle}>Popular Searches</Text>
            {POPULAR_SEARCHES.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.popularItem}
                onPress={() => handlePopularSearchPress(item.name)}
              >
                <View style={styles.popularIconContainer}>
                  <Ionicons
                    name={getCategoryIcon(item.category)}
                    size={20}
                    color="#007AFF"
                  />
                </View>
                <Text style={styles.popularText}>{item.name}</Text>
                <Ionicons name="arrow-forward" size={18} color="#C7C7CC" />
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.resultsSection}>
            <Text style={styles.resultsTitle}>
              {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'} found
            </Text>
            {searchResults.map((destination) => (
              <TouchableOpacity
                key={destination.id}
                style={styles.resultCard}
                onPress={() => handleDestinationPress(destination)}
                activeOpacity={0.7}
              >
                <Image source={{ uri: destination.image }} style={styles.resultImage} />
                <View style={styles.resultContent}>
                  <View style={styles.resultHeader}>
                    <Text style={styles.resultName} numberOfLines={1}>
                      {destination.name}
                    </Text>
                    <View style={styles.ratingContainer}>
                      <Ionicons name="star" size={14} color="#FFD700" />
                      <Text style={styles.ratingText}>{destination.rating.toFixed(1)}</Text>
                    </View>
                  </View>
                  <View style={styles.categoryBadge}>
                    <Ionicons
                      name={getCategoryIcon(destination.category)}
                      size={12}
                      color="#007AFF"
                    />
                    <Text style={styles.categoryText}>{destination.category}</Text>
                  </View>
                  <Text style={styles.resultDescription} numberOfLines={2}>
                    {destination.description}
                  </Text>
                  <View style={styles.resultFooter}>
                    <Text style={styles.viewDetailsText}>View details</Text>
                    <Ionicons name="chevron-forward" size={16} color="#007AFF" />
                  </View>
                </View>
              </TouchableOpacity>
            ))}
            {searchResults.length === 0 && !searching && (
              <View style={styles.emptyState}>
                <Ionicons name="search-outline" size={64} color="#C7C7CC" />
                <Text style={styles.emptyTitle}>No destinations found</Text>
                <Text style={styles.emptySubtitle}>Try searching with different keywords</Text>
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
    backgroundColor: '#F2F2F7',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 10,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1C1C1E',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
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
    color: '#1C1C1E',
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
    color: '#1C1C1E',
    marginBottom: 16,
  },
  popularItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  popularIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  popularText: {
    flex: 1,
    fontSize: 16,
    color: '#1C1C1E',
    fontWeight: '500',
  },
  resultsSection: {
    padding: 20,
  },
  resultsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8E8E93',
    marginBottom: 16,
  },
  resultCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
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
    color: '#1C1C1E',
    marginRight: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1C1C1E',
    marginLeft: 4,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#007AFF',
    marginLeft: 4,
    textTransform: 'capitalize',
  },
  resultDescription: {
    fontSize: 14,
    color: '#8E8E93',
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
    color: '#007AFF',
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
    color: '#1C1C1E',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
  },
});
