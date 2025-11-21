import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useAuth } from '@/context/AuthContext';

export default function HomeScreen() {
  const { user } = useAuth();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.userName}>{user?.name || 'User'}</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Search</Text>
          <Text style={styles.placeholder}>Search bar will appear here</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Suggested Destinations</Text>
          <Text style={styles.placeholder}>Destinations will appear here</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Routes</Text>
          <Text style={styles.placeholder}>Popular routes will appear here</Text>
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
    marginBottom: 32,
    paddingTop: 20,
  },
  greeting: {
    fontSize: 16,
    color: '#8E8E93',
    marginBottom: 4,
  },
  userName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1C1C1E',
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
