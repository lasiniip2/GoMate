export interface UserProfile {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  createdAt: string;
}

export interface UserSettings {
  darkMode: boolean;
  language: string;
  notifications: boolean;
}
