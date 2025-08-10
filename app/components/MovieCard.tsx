import { icons } from '@/constants/icons'
import {
  checkIfFavorite,
  deleteFavoriteMovie,
  getUserId,
  saveFavoriteMovie
} from '@/services/appwrite'
import Icon from '@react-native-vector-icons/fontawesome'
import { Link } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

const MovieCard = ({
  id,
  title,
  poster_path,
  release_date,
  vote_average
}: Movie) => {
  const [isFavorite, setIsFavorite] = useState(false)
  const [favoriteDocId, setFavoriteDocId] = useState<string | null>(null)

  useEffect(() => {
    const checkStatus = async () => {
      const userId = await getUserId()
      if (userId) {
        const docId = await checkIfFavorite(id, userId)
        if (docId) {
          setIsFavorite(true)
          setFavoriteDocId(docId)
        }
      }
    }
    checkStatus()
  }, [id])

  const handlefavoritePress = async () => {
    const userId = await getUserId()
    if (!userId) {
      console.error('User ID not found. Cannot save/delete favorite movie.')
      return
    }

    try {
      if (isFavorite && favoriteDocId) {
        // Delete the favorite movie
        await deleteFavoriteMovie(favoriteDocId)
        setIsFavorite(false)
        setFavoriteDocId(null)
      } else {
        // Save the new favorite movie
        const response = await saveFavoriteMovie(id, userId)
        setIsFavorite(true)
        setFavoriteDocId(response.$id)
      }
    } catch (error) {
      console.error('Failed to update favorite status:', error)
    }
  }

  return (
    <Link href={`/movies/${id}`} asChild>
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
          numberOfLines={1}
        >
          {title}
        </Text>
        
        <View className='flex-row items-center'>
          <Image source={icons.star} className='size-4' />
          <Text className='text-xs text-white font-bold uppercase'>
            {Math.round(vote_average) / 2}
          </Text>
        
          <TouchableOpacity onPress={handlefavoritePress} className='ml-2'>
          
            <Icon
              name='heart'
              size={14}
              color={isFavorite ? 'yellow' : 'white'}
            />
            
          </TouchableOpacity>
          
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

export default MovieCard
