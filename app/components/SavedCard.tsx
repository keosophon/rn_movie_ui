
import { icons } from '@/constants/icons'
import { Link } from 'expo-router'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
const SavedCard = ({
  movieId,
  title,
  poster_path,
  release_date,
  vote_average,
  userId
}: {
  movieId: number
  title: string
  poster_path: string
  release_date: string
  vote_average: number
  userId: string
}) => {
  return (
   
      <Link href={`/movies/${movieId}`} asChild>
        <TouchableOpacity className='w-full aspect-[2/3] overflow-hidden rounded-lg mb-5'>
          <Image
            source={{
              uri: poster_path
                ? `https://image.tmdb.org/t/p/w500/${poster_path}`
                : 'http://placehold.co/600x400/1a1a1a/ffffff.png'
            }}
            className='w-[100%] h-[70%] rounded-lg'
            resizeMode='cover'
          />

          <Text
            className='text-sm text-white font-semibold mt-2'
            numberOfLines={2}
          >
            {title}
          </Text>

          <View className='flex-row items-center'>
            <Image source={icons.star} className='size-4' />
            <Text className='text-xs text-white font-bold uppercase'>
              {Math.round(vote_average) / 2}
            </Text>
          </View>

          <View className='flex-row items-center justify-between'>
            <Text className='text-xs text-gray-400 font-medium'>
              {release_date?.split('-')[0]}
            </Text>
          </View>
        </TouchableOpacity>
      </Link>

  )
}

export default SavedCard
