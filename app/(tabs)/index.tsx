import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import { getTrendingMovies } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, ScrollView, Text, View } from "react-native";
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

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute z-0 w-full" />
      <ScrollView
        className="flex-1 px-5"

      >
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

        {moviesLoading || trendingMoviesLoading? (
          <ActivityIndicator size="large" className="color-white" />
        ) : moviesError || trendingMoviesError? (
          <Text>Error: {moviesError?.message || trendingMoviesError?.message}</Text>
        ) : (
          <View className="flex-1 mt-5">
            <SearchBar
              placeholder="search for a movie"
              onPress={() => router.push("/search")}
            />
            {trendingMovies && trendingMovies?.length > 0 && (
              <>
                <Text className="text-white font-semibold text-lg mt-5 mb-3">
                  Trending Movies
                </Text>
                <FlatList className="mb-4 mt-4"
                  data={trendingMovies}
                  renderItem={({ item, index}) => (
                    <TrendingCard movie={item} index={index}/>
                    
                  )}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  ItemSeparatorComponent={() => <View className="w-4" />}
                  keyExtractor={(item) => item.movie_id.toString()}
                  />
              </>
            )}
            <>
              <Text className="text-white font-semibold text-lg mb-5">
                Latest Movies
              </Text>
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
                columnWrapperStyle={{ gap:10 , justifyContent: "space-between", marginBottom: 5 }}
                className="mt-2 pb-20"
                scrollEnabled={false}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
