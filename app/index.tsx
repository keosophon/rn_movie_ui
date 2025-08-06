import { icons } from "@/constants/icons";
import { client } from "@/services/appwrite";
import React, { useState } from "react";
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Account, ID } from "react-native-appwrite";

const account = new Account(client);

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const handleAuth = async () => {
    try {
      if (isRegister) {
        await account.create(ID.unique(), email, password, name);
        Alert.alert("Success", "Account created! You can now log in.");
        setIsRegister(false);
      } else {
        await account.createEmailSession(email, password);
        Alert.alert("Success", "Logged in!");
        // Redirect to your main app screen here
      }
    } catch (error: any) {
      Alert.alert("Error", error.message || "Authentication failed");
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-primary px-6">
      <Image source={icons.logo} className="w-16 h-16 mb-8" />
      <Text className="text-white text-2xl font-bold mb-6">
        {isRegister ? "Create Account" : "Login"}
      </Text>
      {isRegister && (
        <TextInput
          className="bg-white rounded-lg px-4 py-2 mb-4 w-full"
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
      )}
      <TextInput
        className="bg-white rounded-lg px-4 py-2 mb-4 w-full"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        className="bg-white rounded-lg px-4 py-2 mb-6 w-full"
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        className="bg-blue-600 rounded-lg px-6 py-3 mb-4 w-full"
        onPress={handleAuth}
      >
        <Text className="text-white text-lg font-semibold text-center">
          {isRegister ? "Sign Up" : "Login"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIsRegister(!isRegister)}>
        <Text className="text-blue-300 text-center">
          {isRegister ? "Already have an account? Login" : "Don't have an account? Sign Up"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}