import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useFavourites } from '@/context/FavouritesContext';
import { transportService } from '@/services/transportService';
import EditProfileModal from '@/components/profile/EditProfileModal';
import ChangePasswordModal from '@/components/profile/ChangePasswordModal';
import ThemeToggle from '@/components/profile/ThemeToggle';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const { favouriteDestinations, favouriteRoutes, favouriteSchedules } = useFavourites();
  const [recentRoutesCount, setRecentRoutesCount] = useState(0);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  // Theme colors
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const textSecondary = useThemeColor({}, 'textSecondary');
  const cardBackground = useThemeColor({}, 'card');
  const primaryColor = useThemeColor({}, 'primary');
  const errorColor = useThemeColor({}, 'error');
  const borderLight = useThemeColor({}, 'borderLight');

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
      <ScrollView style={[styles.container, { backgroundColor }]} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Profile Header */}
          <View style={[styles.profileHeader, { backgroundColor: cardBackground }]}>
          <View style={[styles.avatarContainer, { backgroundColor: primaryColor + '20' }]}>
            <Ionicons name="person" size={48} color={primaryColor} />
          </View>
          <Text style={[styles.userName, { color: textColor }]}>{user?.name || 'User'}</Text>
          <Text style={[styles.userEmail, { color: textSecondary }]}>{user?.email || 'user@example.com'}</Text>
          <View style={[styles.memberSince, { backgroundColor: backgroundColor }]}>
            <Ionicons name="calendar-outline" size={14} color={textSecondary} />
            <Text style={[styles.memberSinceText, { color: textSecondary }]}>Member since {getMemberSince()}</Text>
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <View style={[styles.statCard, { backgroundColor: cardBackground }]}>
            <Ionicons name="heart" size={24} color="#FF3B30" />
            <Text style={[styles.statNumber, { color: textColor }]}>{favouriteDestinations.length}</Text>
            <Text style={[styles.statLabel, { color: textSecondary }]}>Destinations</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: cardBackground }]}>
            <Ionicons name="navigate" size={24} color={primaryColor} />
            <Text style={[styles.statNumber, { color: textColor }]}>{favouriteRoutes.length}</Text>
            <Text style={[styles.statLabel, { color: textSecondary }]}>Routes</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: cardBackground }]}>
            <Ionicons name="time" size={24} color="#34C759" />
            <Text style={[styles.statNumber, { color: textColor }]}>{recentRoutesCount}</Text>
            <Text style={[styles.statLabel, { color: textSecondary }]}>Recent</Text>
          </View>
        </View>

        {/* Account Settings */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>Account Settings</Text>
          
          <TouchableOpacity 
            style={[styles.menuItem, { backgroundColor: cardBackground }]}
            onPress={() => setShowEditProfile(true)}
          >
            <View style={styles.menuLeft}>
              <View style={[styles.iconContainer, { backgroundColor }]}>
                <Ionicons name="person-outline" size={22} color={primaryColor} />
              </View>
              <View style={styles.menuTextContainer}>
                <Text style={[styles.menuText, { color: textColor }]}>Edit Profile</Text>
                <Text style={[styles.menuSubtext, { color: textSecondary }]}>Update your information</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.menuItem, { backgroundColor: cardBackground }]}
            onPress={() => setShowChangePassword(true)}
          >
            <View style={styles.menuLeft}>
              <View style={[styles.iconContainer, { backgroundColor }]}>
                <Ionicons name="lock-closed-outline" size={22} color={primaryColor} />
              </View>
              <View style={styles.menuTextContainer}>
                <Text style={[styles.menuText, { color: textColor }]}>Change Password</Text>
                <Text style={[styles.menuSubtext, { color: textSecondary }]}>Update your password</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Preferences with Theme Toggle */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>Preferences</Text>
          <ThemeToggle />
        </View>

        {/* App Information */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: textColor }]}>App Information</Text>
          
          <View style={[styles.infoCard, { backgroundColor: cardBackground }]}>
            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: textSecondary }]}>App Name</Text>
              <Text style={[styles.infoValue, { color: textColor }]}>GoMate</Text>
            </View>
            <View style={[styles.divider, { backgroundColor: borderLight }]} />
            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: textSecondary }]}>Version</Text>
              <Text style={[styles.infoValue, { color: textColor }]}>1.0.0</Text>
            </View>
            <View style={[styles.divider, { backgroundColor: borderLight }]} />
            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: textSecondary }]}>Developer</Text>
              <Text style={[styles.infoValue, { color: textColor }]}>GoMate Team</Text>
            </View>
            <View style={[styles.divider, { backgroundColor: borderLight }]} />
            <View style={styles.infoRow}>
              <Text style={[styles.infoLabel, { color: textSecondary }]}>Build</Text>
              <Text style={[styles.infoValue, { color: textColor }]}>2024.11</Text>
            </View>
          </View>

          <TouchableOpacity style={[styles.menuItem, { backgroundColor: cardBackground }]}>
            <View style={styles.menuLeft}>
              <View style={[styles.iconContainer, { backgroundColor }]}>
                <Ionicons name="help-circle-outline" size={22} color={primaryColor} />
              </View>
              <View style={styles.menuTextContainer}>
                <Text style={[styles.menuText, { color: textColor }]}>Help & Support</Text>
                <Text style={[styles.menuSubtext, { color: textSecondary }]}>Get assistance</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, { backgroundColor: cardBackground }]}>
            <View style={styles.menuLeft}>
              <View style={[styles.iconContainer, { backgroundColor }]}>
                <Ionicons name="shield-checkmark-outline" size={22} color={primaryColor} />
              </View>
              <View style={styles.menuTextContainer}>
                <Text style={[styles.menuText, { color: textColor }]}>Privacy Policy</Text>
                <Text style={[styles.menuSubtext, { color: textSecondary }]}>View our privacy policy</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, { backgroundColor: cardBackground }]}>
            <View style={styles.menuLeft}>
              <View style={[styles.iconContainer, { backgroundColor }]}>
                <Ionicons name="document-text-outline" size={22} color={primaryColor} />
              </View>
              <View style={styles.menuTextContainer}>
                <Text style={[styles.menuText, { color: textColor }]}>Terms of Service</Text>
                <Text style={[styles.menuSubtext, { color: textSecondary }]}>Read terms and conditions</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={textSecondary} />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, { backgroundColor: cardBackground }]}>
            <View style={styles.menuLeft}>
              <View style={[styles.iconContainer, { backgroundColor }]}>
                <Ionicons name="star-outline" size={22} color={primaryColor} />
              </View>
              <View style={styles.menuTextContainer}>
                <Text style={[styles.menuText, { color: textColor }]}>Rate App</Text>
                <Text style={[styles.menuSubtext, { color: textSecondary }]}>Share your feedback</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={[styles.logoutButton, { backgroundColor: cardBackground, borderColor: errorColor }]} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={22} color={errorColor} />
          <Text style={[styles.logoutText, { color: errorColor }]}>Logout</Text>
        </TouchableOpacity>

        {/* App Footer */}
        <View style={styles.footer}>
          {/* <Text style={[styles.footerText, { color: textSecondary }]}>Made with ❤️ by Lasini Pallewaththa</Text> */}
          <Text style={[styles.footerCopyright, { color: textSecondary }]}>© 2025 GoMate. All rights reserved.</Text>
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
  },
  content: {
    paddingBottom: 40,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 20,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
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
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    marginBottom: 12,
  },
  memberSince: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  memberSinceText: {
    fontSize: 13,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
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
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  },
  menuSubtext: {
    fontSize: 13,
    marginTop: 2,
  },
  switchPlaceholder: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  switchText: {
    fontSize: 13,
    fontWeight: '500',
  },
  infoCard: {
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
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '600',
  },
  divider: {
    height: 1,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
    borderWidth: 1,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 40,
  },
  footerText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 6,
  },
  footerCopyright: {
    fontSize: 12,
    textAlign: 'center',
  },
});
