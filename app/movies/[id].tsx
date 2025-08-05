import { fetchMovieDetails } from '@/services/api';
import useFetch from '@/services/useFetch';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';

const MovieDetails = () => {
  const {id}= useLocalSearchParams();

  // Here you would typically fetch the movie details using the id
  // For example, using a service function like fetchMovieDetails(id) 
  // and then display the details in the component.
  const {data:movie,loading}= useFetch(()=>fetchMovieDetails(id as string));

  return (
    <View className='flex-1 bg-primary'>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View>
          <Image source={{ uri:`https://image.tmdb.org/t/p/w500/${movie?.poster_path} `}} className='w-full h-[300px]' resizeMode='stretch' />
        </View>
        <View className='flex-col items-start mt-5'>
          <Text className='text-white text-md font-bold'>{movie?.title}</Text>
          <Text className='text-gray-400 text-sm mt-2'>{movie?.overview}</Text>
        </View>
      </ScrollView>
    </View>
  )
}

export default MovieDetails