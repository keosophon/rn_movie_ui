import { login } from '@/services/appwrite';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Index () {
  const router = useRouter();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async () => {
    try {
      const session = await login(email, password)
      if (session) {
        router.push('/(tabs)')
      }
    } catch (error) {
      setError('Login failed. Please check your credentials and try again.')
    }
  }

  return (
    <View className='flex-1 justify-center items-center bg-primary px-6'>
      <View className='mb-10 items-center'>
        <Text className='text-3xl font-bold text-blue-800 mb-5'>
          My Movie App
        </Text>
        <Text className='text-lg text-gray-200'>Welcome</Text>
      </View>
      <View className='w-full max-w-md bg-white/10 rounded-xl p-6 shadow-lg'>
        <TextInput
          className='bg-white rounded-lg px-4 py-2 mb-4 w-full text-black'
          placeholder='Email'
          placeholderTextColor='#888'
          value={email}
          onChangeText={setEmail}
          autoCapitalize='none'
        />
        <TextInput
          className='bg-white rounded-lg px-4 py-2 mb-6 w-full text-black'
          placeholder='Password'
          placeholderTextColor='#888'
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {error && <Text className='text-red-500 mb-4 text-center'>{error}</Text>}
        <TouchableOpacity
          className='bg-blue-600 rounded-lg px-6 py-3 mb-4 w-full active:bg-blue-700'
          onPress={handleLogin}
        >
          <Text className='text-white text-lg font-semibold text-center'>
            Login
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className='bg-gray-600 rounded-lg px-6 py-3 w-full active:bg-gray-700'
          onPress={() => {
            /* Add register logic here */
          }}
        >
          <Text className='text-white text-lg font-semibold text-center'>
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
