import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function SearchScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Search</Text>
          <Text style={styles.subtitle}>Find destinations and transport schedules</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Search Bar</Text>
          <Text style={styles.placeholder}>Search functionality will appear here</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Transport Modes</Text>
          <Text style={styles.placeholder}>Train, Bus, Private transport options</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Departure Times</Text>
          <Text style={styles.placeholder}>Next departures will appear here</Text>
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
