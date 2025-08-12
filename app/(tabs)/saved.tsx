import SavedCard from "@/components/SavedCard";
import SearchBar from '@/components/SearchBar';
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { getFavoriteMoviesByUserId } from "@/services/appwrite";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import "../global.css";

const Saved = () => {
  const router = useRouter();


  const {
    data: movies,
    loading: moviesLoading,
    error: moviesError,
  } = useFetch(() => getFavoriteMoviesByUserId());

  // The content for the header of the FlatList
  const ListHeader = () => (
 <View>
      <Image source={icons.logo} className='w-12 h-10 mt-20 mb-5 mx-auto' />
      <SearchBar
        placeholder='search for a movie'
        onPress={() => router.push('/search')}
      />
      <Text>Saved Movies </Text>
    </View>
  );

  return (
    <View className="flex-1 bg-primary mb-5">
      <Image source={images.bg} className="absolute z-0 w-full" />
      {moviesLoading ? (
        <ActivityIndicator size="large" className="color-white mt-10" />
      ) : moviesError ? (
        <Text className="text-white">Error: {moviesError.message}</Text>
      ) : (
        <FlatList
          data={movies}
          renderItem={({ item }) => (
            <View className="mb-5 pr-2 flex-1">
              <SavedCard {... item}/>
            </View>
          )}
          keyExtractor={(item) => item.movieId}
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

export default Saved