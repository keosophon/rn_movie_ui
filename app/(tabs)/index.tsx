import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import TrendingCard from "../components/TrendingCard";
import "../global.css";

export default function Index() {
  const router = useRouter();

  const {
    data: trendingMovies,
    loading: trendingMoviesLoading,
    error: trendingMoviesError,
  } = useFetch(getTrendingMovies);

  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => fetchMovies({ query: "" }));

  const allMoviesLoading = moviesLoading || trendingMoviesLoading;
  const anyMoviesError = moviesError || trendingMoviesError;

  // The content for the header of the FlatList
  const ListHeader = () => (
    <View>
      <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
      <SearchBar
        placeholder="search for a movie"
        onPress={() => router.push("/search")}
      />

      {trendingMovies && trendingMovies?.length > 0 && (
        <>
          <Text className="text-white font-semibold text-lg mt-5 mb-3">
            Trending Movies
          </Text>
          <FlatList
            className="mb-4 mt-4"
            data={trendingMovies}
            renderItem={({ item, index }) => (
              <TrendingCard movie={item} index={index} />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View className="w-4" />}
            keyExtractor={(item) => item.movie_id.toString()}
          />
        </>
      )}
      <Text className="text-white font-semibold text-lg mb-5">
        Latest Movies
      </Text>
    </View>
  );

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute z-0 w-full" />
      {allMoviesLoading ? (
        <ActivityIndicator size="large" className="color-white mt-10" />
      ) : anyMoviesError ? (
        <Text className="text-white">Error: {anyMoviesError.message}</Text>
      ) : (
        <FlatList
          data={movies}
          renderItem={({ item }) => (
            <View className="mb-5 pr-2 flex-1">
              <MovieCard {...item} />
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          columnWrapperStyle={{
            gap: 10,
            justifyContent: "space-between",
            marginBottom: 5,
          }}
          ListHeaderComponent={ListHeader}
        />
      )}
    </View>
  );
}