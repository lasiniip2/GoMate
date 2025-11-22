import { Image } from 'expo-image';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import SuggestedDestinations from '@/components/home/SuggestedDestinations';
import QuickSearch from '@/components/home/QuickSearch';
import { destinationService } from '@/services/destinationService';
import { Destination } from '@/types/destination.types';

export default function HomeScreen() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDestinations();
  }, []);

  const loadDestinations = async () => {
    setLoading(true);
    const data = await destinationService.getSuggestedDestinations();
    setDestinations(data);
    setLoading(false);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      {/* Quick Search */}
      <QuickSearch />

      {/* Explore Sri Lanka */}
      <SuggestedDestinations destinations={destinations} loading={loading} />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  sectionContainer: {
    gap: 12,
    marginTop: 16,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
