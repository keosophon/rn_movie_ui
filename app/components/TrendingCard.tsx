import { images } from "@/constants/images";
import MaskedView from "@react-native-masked-view/masked-view";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
const TrendingCard = ({
  movie: { movie_id, title, poster_url },
  index,
}: TrendingCardProps) => {
  return (
    <Link href={`/movies/${movie_id}`} asChild>
      <TouchableOpacity className="w-40 aspect-[2/3] overflow-hidden rounded-lg mb-5">
        <Image
          source={{ uri: poster_url }}
          className="w-full h-full rounded-lg"
          resizeMode="cover"
        />
        <View className="absolute bottom-9 -left-3.5  px-2 py-1 rounded-full">
          <MaskedView
            maskElement={
              <Text className="text-white font-bold text-6xl">{index + 1}</Text>
            }
          >
            <Image
              source={images.rankingGradient}
              className="w-40 h-full rounded-full"
              resizeMode="cover"
            />
          </MaskedView>
        </View>
        <Text className="text-sm text-white font-semibold mt-2 " numberOfLines={2}>
          {title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default TrendingCard;
