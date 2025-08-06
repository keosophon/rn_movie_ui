import { icons } from '@/constants/icons';
import { fetchMovieDetails } from '@/services/api';
import useFetch from '@/services/useFetch';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const MovieInfo = ({ label, value }: { label: string, value?: string | number | null }) => (
  <View className="flex-col items-start justify-center mt-5">
    <Text className="text-gray-200 text-sm">{label}:</Text>
    <Text className="text-gray-400 text-sm">{value || 'N/A'}</Text>
  </View>
);

const MovieDetails = () => {
  const router = useRouter();
  const {id}= useLocalSearchParams();

  // Here you would typically fetch the movie details using the id
  // For example, using a service function like fetchMovieDetails(id) 
  // and then display the details in the component.
  const {data:movie, loading}= useFetch(()=>fetchMovieDetails(id as string));

  return (
    <View className='flex-1 bg-primary mb-3'>
      <ScrollView contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 20 }} className='flex-1'>
        <View>
          <Image source={{ uri:`https://image.tmdb.org/t/p/w500/${movie?.poster_path} `}} className='w-[1/2] h-[200px]' resizeMode='stretch' />
        </View>
        <View className='flex-col items-start mt-5'>
          <Text className='text-white text-md font-bold'>{movie?.title}</Text>
          <View className='flex-row items-center mt-2'>
            <Text className='text-gray-400 text-sm'>{movie?.release_date?.split('-')[0]}</Text>
            <Text className='text-gray-400 text-sm ml-3'>Runtime: {movie?.runtime} min</Text>
          </View>
          <View className='flex-row items-center mt-2'>
            <Image source={icons.star} className='size-4' />
            <Text className='text-white font-bold text-sm'> {Math.round(movie?.vote_average ?? 0)}/10</Text>
            <Text className='text-gray-400 text-sm ml-3'>Votes: {movie?.vote_count}</Text>
          </View>
          <MovieInfo label="Overview" value={movie?.overview} />
          <MovieInfo label="Genres" value={movie?.genres?.map((genre) => genre.name).join(', ')} />
          
          
          <MovieInfo label="Languages" value={movie?.spoken_languages?.map((language) => language.english_name).join(', ')} />
          <MovieInfo label="Status" value={movie?.status} />
        </View>
        <View className='flex flex-row justify-between mt-5'>
          <MovieInfo label="Budget" value={movie?.budget ? `$${movie.budget /1000000} Million(s)` : 'N/A'} />
          <MovieInfo label="Revenue" value={movie?.revenue ? `$${movie.revenue / 1000000} Million(s)` : 'N/A'} />
        </View>
        <MovieInfo label="Production Companies" value={movie?.production_companies?.map((company) => company.name).join(', ')} />
      </ScrollView>
     <View className="flex-row w-[90%] absolute bottom-5 justify-around mx-5 z-50">
  <TouchableOpacity
    className="flex-1 bg-blue-500 active:bg-blue-600 rounded-lg py-3.5 flex-row items-center justify-center p-3 mr-2"
    onPress={() => router.back()}
  >
    <Image source={icons.arrow} className="size-4 mr-1 mt-1 rotate-180" />
    <Text className="text-white text-sm">Back</Text>
  </TouchableOpacity>
  <TouchableOpacity
    className="flex-1 bg-blue-800 active:bg-blue-700 rounded-lg py-3.5 flex-row items-center justify-center p-3"
    onPress={() => {/* Save logic here */}}
  >
    <Image source={icons.save} className="size-4 mr-1 mt-1 rotate-180" />
    <Text className="text-white text-sm">Save</Text>
  </TouchableOpacity>
</View>
      
    </View>
  )
}

export default MovieDetails