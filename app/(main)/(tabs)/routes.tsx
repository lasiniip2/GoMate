import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function RoutesScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Routes & Schedules</Text>
          <Text style={styles.subtitle}>Browse available routes and upcoming schedules</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Available Routes</Text>
          <Text style={styles.placeholder}>Routes based on your location</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Schedules</Text>
          <Text style={styles.placeholder}>Next scheduled departures</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nearby Stations</Text>
          <Text style={styles.placeholder}>Bus and train stations near you</Text>
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
