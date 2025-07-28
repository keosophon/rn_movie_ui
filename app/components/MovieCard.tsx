import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity } from "react-native";

const MovieCard = ({
  id,
  title,
  poster_path,
  release_date,
  vote_average,
}: Movie) => {
  return (
    <Link href={`/movies/${id}`} asChild>
      <TouchableOpacity className="flex-1">
       <Image
          source={{
            uri: poster_path
              ? `https://image.tmdb.org/t/p/w500/${poster_path}`
              : "http://placehold.co/600x400/1a1a1a/ffffff.png", // Corrected placeholder URL
          }}
          className="w-full h-40 rounded-lg"
          resizeMode="cover"
        />
        <Text className="text-sm text-white font-semibold mt-2 numberOfLines={2}">{title}</Text>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
