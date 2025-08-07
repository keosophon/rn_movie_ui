import { getSession, logout } from '@/services/appwrite';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';

const Profile = () => {
  const [session, setSession] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    getSession()
      .then((result) => setSession(result))
      .catch(() => setSession(null));
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setSession(null);
      router.push('/(auth)'); // Redirect to login page
    } catch (error: any) {
      Alert.alert('Logout failed', error.message || 'An error occurred');
    }
  };

  const handleLoginRedirect = () => {
    router.push('/(auth)'); // Redirect to login page
  };

  return (
    <View className="flex-1 justify-center items-center bg-primary px-6">
      <Text className="text-2xl font-bold text-white mb-6">Profile</Text>
      {session ? (
        <View className="w-full max-w-md bg-white/10 rounded-xl p-6 shadow-lg items-center">
          <Text className="text-lg text-white mb-2">
            Full Name: {session.name || 'N/A'}
          </Text>
          <Text className="text-lg text-white mb-6">
            Email: {session.email || 'N/A'}
          </Text>
          <TouchableOpacity
            className="bg-red-600 rounded-lg px-6 py-3 w-full active:bg-red-700"
            onPress={handleLogout}
          >
            <Text className="text-white text-lg font-semibold text-center">Logout</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          className="bg-blue-600 rounded-lg px-6 py-3 w-full active:bg-blue-700 mt-4"
          onPress={handleLoginRedirect}
        >
          <Text className="text-white text-lg font-semibold text-center">Login</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Profile;