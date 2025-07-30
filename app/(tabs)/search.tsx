import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import React from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

const search = () => {
  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="flex-1 absolute z-0 w-full"
        resizeMode="cover"
      />
      <FlatList
        data={movies}
        renderItem={({ item }) => (
          <View className="mb-5 pr-2 flex-1">
            <MovieCard {...item} />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        className="px-5"
        numColumns={2}
        columnWrapperStyle={{
          gap: 10,
          justifyContent: "space-between",
          marginBottom: 5,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            <View className="w-full items-center mt-20 mb-5 flex-row justify-center">
              <Image source={icons.logo} className="w-12 h-10" />
            </View>
            <View className="flex-1 mt-5">
              <SearchBar placeholder="search for a movie" onPress={() => {}} />
            </View>
            {moviesLoading && (
              <ActivityIndicator size="large" className="color-white my-5" />
            )}
            {moviesError && (
              <Text className="text-red-500 text-center mt-5">
                Error: {moviesError.message}
              </Text>
            )}
            {!moviesLoading &&
              !moviesError &&
              "SEARCHT TERM".trim() &&
              movies?.length > 0 && (
                <Text className="text-white font-semibold text-lg mb-5">
                  Search results for: SEARCH TERM
                </Text>
              )}
          </>
        }
      />
    </View>
  );
};

export default search;
