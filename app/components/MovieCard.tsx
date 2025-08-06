import { icons } from "@/constants/icons";
import Icon from '@react-native-vector-icons/fontawesome';
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const MovieCard = ({
  id,
  title,
  poster_path,
  release_date,
  vote_average,
}: Movie) => {
  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className="w-full aspect-[2/3] overflow-hidden rounded-lg mb-5">
        <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500/${poster_path}`
              : "http://placehold.co/600x400/1a1a1a/ffffff.png", // Corrected placeholder URL
          }}
          className="w-[100%] h-[70%] rounded-lg"
          resizeMode="cover"
        />
        <Text className="text-sm text-white font-semibold mt-2 numberOfLines={1}">
          {title}
        </Text>
        <View className="flex-row items-center">
          <Image source={icons.star} className="size-4" />
          <Text className="text-xs text-white font-bold uppercase">
            {Math.round(vote_average) / 2}
          </Text>
          
          <Icon name="heart" size={30} color="yellow" className="bg-yellow-500"/>
        </View>
        <View className="flex-row items-center justify-between">
            <Text className="text-xs text-gray-400 font-medium">{release_date?.split('-')[0]}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
