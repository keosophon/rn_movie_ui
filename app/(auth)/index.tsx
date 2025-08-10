import { icons } from '@/constants/icons'
import { getSession, login } from '@/services/appwrite'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'

export default function Index () {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async () => {
    try {
      // Attempt to get the current session first.
      const session = await getSession()

      // If a session is found, redirect immediately.
      if (session) {
        router.push('/(tabs)')
        return // Exit the function to prevent further execution.
      }

      // If no session exists, attempt to log in with the provided credentials.
      await login(email, password)
      router.push('/(tabs)')
    } catch (error: any) {
      // If any error occurs during getSession or login,
      // catch it here and display the error message.
      console.error('Login error:', error)
      setError(error.message || 'An error occurred')
    }
  }

  return (
    <View className='flex-1 justify-center items-center bg-primary px-6'>
      <View className='mb-10 items-center'>
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
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

        {error && (
          <View>
            <Text className='text-red-500 mb-4 text-center'>{error}</Text>
          </View>
        )}
        <TouchableOpacity
          className='bg-blue-600 rounded-lg px-6 py-3 mb-4 w-full active:bg-blue-700'
          onPress={handleLogin}
        >
          <Text className='text-white text-lg font-semibold text-center'>
            Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
