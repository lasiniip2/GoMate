import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function FavouritesScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Favourites</Text>
          <Text style={styles.subtitle}>Your saved destinations, routes, and schedules</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Favourite Destinations</Text>
          <Text style={styles.placeholder}>Your saved destinations will appear here</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Favourite Routes</Text>
          <Text style={styles.placeholder}>Your saved routes will appear here</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Favourite Schedules</Text>
          <Text style={styles.placeholder}>Your saved schedules will appear here</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 24,
    paddingTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 12,
  },
  placeholder: {
    fontSize: 14,
    color: '#8E8E93',
    fontStyle: 'italic',
  },
});
