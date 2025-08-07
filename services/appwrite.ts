import { Account, Client, Databases, ID, Query } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_DATABASE_ID!;
const MOVIE_COLLECTION_ID = process.env.EXPO_PUBLIC_MOVIE_COLLECTION_ID!;
const endpoint = process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!;
const projectId = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!;

const client = new Client().setEndpoint(endpoint).setProject(projectId);

const account = new Account(client);
const database = new Databases(client);

// track the search made by a user
export const updateSearchCount = async (query: string, movie: Movie) => {
  //check if the record of that search has already been stored
  //if a document is found increment the searchCount field
  // if no document is found create a new document with searchCount = 1
  try {
    const result = await database.listDocuments(
      DATABASE_ID,
      MOVIE_COLLECTION_ID,
      [Query.equal("searchTerm", query)]
    );
    if (result.documents.length > 0) {
      const document = result.documents[0];

      await database.updateDocument(
        DATABASE_ID,
        MOVIE_COLLECTION_ID,
        document.$id,
        {
          counts: document.counts + 1,
        }
      );
      
    } else {
      await database.createDocument(
        DATABASE_ID,
        MOVIE_COLLECTION_ID,
        ID.unique(),
        {
          searchTerm: query,
          movie_id: movie.id,
          title: movie.title,
          counts: 1,
          poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        }
      );
      
    }
  } catch (error) {
    console.error("Error updating search count:", error);
    throw new Error("Failed to update search count");
  }
};

export const getTrendingMovies = async (): Promise<TrendingMovie[] | undefined> => {
  try {
    const response = await database.listDocuments(
      DATABASE_ID,
      MOVIE_COLLECTION_ID,
      [Query.orderDesc("counts"), Query.limit(3)],
    );
    return response.documents as unknown as TrendingMovie[];
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return undefined;
  }
}


/**
 * Log in a user with email and password using Appwrite authentication.
 * @param email User's email
 * @param password User's password
 * @returns The session object if successful
 */
export const login = async (email: string, password: string) => {
  
  try {    
    if (!await getSession()) {
      return await account.createEmailPasswordSession(email, password);
    }
  } catch (error) {
    console.error("Error logging in to Appwrite:", error);
    throw error;
  }
};

export const getSession = async () => {
  try {
    const session = await account.get();
    console.log("Current session:", session);
    return session || null;
  } catch (error) {
    console.error("Error checking session:", error);
    return null;
  }
}

export const logout = async () => {
  try {
    await account.deleteSession('current');
    return true;
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
}