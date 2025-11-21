import { View, Text, StyleSheet } from 'react-native';

export default function ScheduleDetailsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Schedule Details</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
