import { icons } from '@/constants/icons';
import { getSession, logout, updateEmail, updatePassword } from '@/services/appwrite';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';

const Profile = () => {
  const [session, setSession] = useState<any>(null);
  const [editingEmail, setEditingEmail] = useState(false);
  const [editingPassword, setEditingPassword] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
      router.push('/(auth)');
    } catch (error: any) {
      Alert.alert('Logout failed', error.message || 'An error occurred');
    }
  };

  const handleLoginRedirect = () => {
    router.push('/(auth)');
  };

  const handleEmailUpdate = async () => {
    if (!newEmail || !currentPassword) {
      Alert.alert('Error', 'Please enter new email and current password');
      return;
    }
    try {
      await updateEmail(newEmail, currentPassword);
      Alert.alert('Success', 'Email updated!');
      setEditingEmail(false);
      setNewEmail('');
      setCurrentPassword('');
      const updatedSession = await getSession();
      setSession(updatedSession);
    } catch (error: any) {
      Alert.alert('Update failed', error.message || 'An error occurred');
    }
  };

  const handlePasswordUpdate = async () => {
    if (!newPassword || !confirmPassword || !currentPassword) {
      Alert.alert('Error', 'Please fill all password fields');
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New password and confirm password do not match');
      return;
    }
    try {
      await updatePassword(newPassword, currentPassword);
      Alert.alert('Success', 'Password updated!');
      setEditingPassword(false);
      setNewPassword('');
      setConfirmPassword('');
      setCurrentPassword('');
    } catch (error: any) {
      Alert.alert('Update failed', error.message || 'An error occurred');
    }
  };

  return (
    <>      
      {session ? (
        <View className="flex-1 justify-center items-center bg-primary px-6"> 
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
      <Text className="text-5xl font-bold text-white mb-6">Profile</Text>
        <View className="w-full max-w-md bg-white/10 rounded-xl p-6 shadow-lg items-center ">
          {/* Profile Information View */}
          <View className="mb-6 w-full items-start mb-6">
            <Text className="text-lg text-white mb-2">
              Name: {session.name || 'N/A'}
            </Text>
            <Text className="text-lg text-white mb-2">
              Email: {session.email || 'N/A'}
            </Text>
          </View>

          {/* Change Email View */}
          {!editingEmail ? (
            <TouchableOpacity
              className="bg-blue-600 rounded-lg px-6 py-2 w-full active:bg-blue-700 mb-4"
              onPress={() => setEditingEmail(true)}
            >
              <Text className="text-white text-center">Change Email</Text>
            </TouchableOpacity>
          ) : (
            <View className="w-full mb-4">
              <Text className="text-white mb-2 text-center">Change Email</Text>
              <TextInput
                className="bg-white rounded-lg px-4 py-2 mb-2 w-full text-black"
                placeholder="New Email"
                value={newEmail}
                onChangeText={setNewEmail}
                autoCapitalize="none"
              />
              <TextInput
                className="bg-white rounded-lg px-4 py-2 mb-2 w-full text-black"
                placeholder="Current Password"
                value={currentPassword}
                onChangeText={setCurrentPassword}
                secureTextEntry
              />
              <View className="flex-row">
                <TouchableOpacity
                  className="bg-green-600 rounded-lg px-4 py-2 mr-2 flex-1 active:bg-green-700"
                  onPress={handleEmailUpdate}
                >
                  <Text className="text-white text-center">Save Email</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="bg-gray-600 rounded-lg px-4 py-2 flex-1 active:bg-gray-700"
                  onPress={() => {
                    setEditingEmail(false);
                    setNewEmail('');
                    setCurrentPassword('');
                  }}
                >
                  <Text className="text-white text-center">Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Change Password View */}
          {!editingPassword ? (
            <TouchableOpacity
              className="bg-blue-600 rounded-lg px-6 py-2 w-full active:bg-blue-700 mb-4"
              onPress={() => setEditingPassword(true)}
            >
              <Text className="text-white text-center">Change Password</Text>
            </TouchableOpacity>
          ) : (
            <View className="w-full mb-4">
              <Text className="text-white mb-2 text-center">Change Password</Text>
              <TextInput
                className="bg-white rounded-lg px-4 py-2 mb-2 w-full text-black"
                placeholder="New Password"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
              />
              <TextInput
                className="bg-white rounded-lg px-4 py-2 mb-2 w-full text-black"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
              <TextInput
                className="bg-white rounded-lg px-4 py-2 mb-2 w-full text-black"
                placeholder="Current Password"
                value={currentPassword}
                onChangeText={setCurrentPassword}
                secureTextEntry
              />
              <View className="flex-row">
                <TouchableOpacity
                  className="bg-green-600 rounded-lg px-4 py-2 mr-2 flex-1 active:bg-green-700"
                  onPress={handlePasswordUpdate}
                >
                  <Text className="text-white text-center">Save Password</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="bg-gray-600 rounded-lg px-4 py-2 flex-1 active:bg-gray-700"
                  onPress={() => {
                    setEditingPassword(false);
                    setNewPassword('');
                    setConfirmPassword('');
                    setCurrentPassword('');
                  }}
                >
                  <Text className="text-white text-center">Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Logout Button */}
          <TouchableOpacity
            className="bg-red-600 rounded-lg px-6 py-3 w-full active:bg-red-700 mt-3"
            onPress={handleLogout}
          >
            <Text className="text-white text-lg font-semibold text-center">Logout</Text>
          </TouchableOpacity>
        </View>
         </View>
      ) : (
        <TouchableOpacity
          className="bg-blue-600 rounded-lg px-6 py-3 w-full active:bg-blue-700 mt-4"
          onPress={handleLoginRedirect}
        >
          <Text className="text-white text-lg font-semibold text-center">Login</Text>
        </TouchableOpacity>
      )}
   
    </>
  );
};

export default Profile;