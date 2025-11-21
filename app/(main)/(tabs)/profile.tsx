import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useFavourites } from '@/context/FavouritesContext';
import { transportService } from '@/services/transportService';
import EditProfileModal from '@/components/profile/EditProfileModal';
import ChangePasswordModal from '@/components/profile/ChangePasswordModal';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const { favouriteDestinations, favouriteRoutes, favouriteSchedules } = useFavourites();
  const [recentRoutesCount, setRecentRoutesCount] = useState(0);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  useEffect(() => {
    loadRecentRoutes();
  }, []);

  const loadRecentRoutes = async () => {
    const recent = await transportService.getRecentRoutes();
    setRecentRoutesCount(recent.length);
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await logout();
            router.replace('/(auth)/login');
          },
        },
      ]
    );
  };

  const getMemberSince = () => {
    const date = new Date();
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Profile Header */}
          <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person" size={48} color="#007AFF" />
          </View>
          <Text style={styles.userName}>{user?.name || 'User'}</Text>
          <Text style={styles.userEmail}>{user?.email || 'user@example.com'}</Text>
          <View style={styles.memberSince}>
            <Ionicons name="calendar-outline" size={14} color="#8E8E93" />
            <Text style={styles.memberSinceText}>Member since {getMemberSince()}</Text>
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Ionicons name="heart" size={24} color="#FF3B30" />
            <Text style={styles.statNumber}>{favouriteDestinations.length}</Text>
            <Text style={styles.statLabel}>Destinations</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="navigate" size={24} color="#007AFF" />
            <Text style={styles.statNumber}>{favouriteRoutes.length}</Text>
            <Text style={styles.statLabel}>Routes</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="time" size={24} color="#34C759" />
            <Text style={styles.statNumber}>{recentRoutesCount}</Text>
            <Text style={styles.statLabel}>Recent</Text>
          </View>
        </View>

        {/* Account Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          
          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => setShowEditProfile(true)}
          >
            <View style={styles.menuLeft}>
              <View style={styles.iconContainer}>
                <Ionicons name="person-outline" size={22} color="#007AFF" />
              </View>
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuText}>Edit Profile</Text>
                <Text style={styles.menuSubtext}>Update your information</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.menuItem}
            onPress={() => setShowChangePassword(true)}
          >
            <View style={styles.menuLeft}>
              <View style={styles.iconContainer}>
                <Ionicons name="lock-closed-outline" size={22} color="#007AFF" />
              </View>
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuText}>Change Password</Text>
                <Text style={styles.menuSubtext}>Update your password</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
          </TouchableOpacity>
        </View>

        {/* Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <View style={styles.iconContainer}>
                <Ionicons name="moon-outline" size={22} color="#007AFF" />
              </View>
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuText}>Dark Mode</Text>
                <Text style={styles.menuSubtext}>Coming soon</Text>
              </View>
            </View>
            <View style={styles.switchPlaceholder}>
              <Text style={styles.switchText}>Off</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* App Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Information</Text>
          
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>App Name</Text>
              <Text style={styles.infoValue}>GoMate</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Version</Text>
              <Text style={styles.infoValue}>1.0.0</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Developer</Text>
              <Text style={styles.infoValue}>GoMate Team</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Build</Text>
              <Text style={styles.infoValue}>2024.11</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <View style={styles.iconContainer}>
                <Ionicons name="help-circle-outline" size={22} color="#007AFF" />
              </View>
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuText}>Help & Support</Text>
                <Text style={styles.menuSubtext}>Get assistance</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <View style={styles.iconContainer}>
                <Ionicons name="shield-checkmark-outline" size={22} color="#007AFF" />
              </View>
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuText}>Privacy Policy</Text>
                <Text style={styles.menuSubtext}>View our privacy policy</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <View style={styles.iconContainer}>
                <Ionicons name="document-text-outline" size={22} color="#007AFF" />
              </View>
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuText}>Terms of Service</Text>
                <Text style={styles.menuSubtext}>Read terms and conditions</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuLeft}>
              <View style={styles.iconContainer}>
                <Ionicons name="star-outline" size={22} color="#007AFF" />
              </View>
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuText}>Rate App</Text>
                <Text style={styles.menuSubtext}>Share your feedback</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={22} color="#FF3B30" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        {/* App Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Made with ❤️ for Sri Lankan Travelers</Text>
          <Text style={styles.footerCopyright}>© 2024 GoMate. All rights reserved.</Text>
        </View>
      </View>
    </ScrollView>
      
      {/* Modals */}
      <EditProfileModal
        visible={showEditProfile}
        onClose={() => setShowEditProfile(false)}
      />
      <ChangePasswordModal
        visible={showChangePassword}
        onClose={() => setShowChangePassword(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  content: {
    paddingBottom: 40,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 20,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E3F2FD',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#8E8E93',
    marginBottom: 12,
  },
  memberSince: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
  },
  memberSinceText: {
    fontSize: 13,
    color: '#8E8E93',
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C1C1E',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#8E8E93',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1C1C1E',
  },
  menuSubtext: {
    fontSize: 13,
    color: '#8E8E93',
    marginTop: 2,
  },
  switchPlaceholder: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
  },
  switchText: {
    fontSize: 13,
    color: '#8E8E93',
    fontWeight: '500',
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  infoLabel: {
    fontSize: 15,
    color: '#8E8E93',
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E5EA',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FF3B30',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF3B30',
    marginLeft: 8,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 40,
  },
  footerText: {
    fontSize: 14,
    color: '#8E8E93',
    textAlign: 'center',
    marginBottom: 6,
  },
  footerCopyright: {
    fontSize: 12,
    color: '#C7C7CC',
    textAlign: 'center',
  },
});
