import { icons } from '@/constants/icons';
import React from 'react';
import { Image, TextInput, View } from 'react-native';

interface Props {
  onPress?: () => void;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

const SearchBar = ({onPress, placeholder, value, onChangeText}:Props) => {
  return (
    <View className='flex-row items-center bg-dark-200 rounded-full px-5 py-4'>
      <Image source={icons.search} className='size-5' resizeMode = 'contain' tintColor='#ab8bff'/>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor='#a8b5db'
        className='flex-1 text-white ml-2'
        value = {value}
        onChangeText={onChangeText}
        onPress={onPress} />
    </View>
  )
}

export default SearchBar