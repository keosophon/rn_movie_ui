import { Tabs } from "expo-router";
import React from "react";
import { Image, ImageBackground, Text, View } from "react-native";
import { icons } from "../../constants/icons";
import { images } from "../../constants/images";

const TabIcon = ({ focused, title, icon }: any) => {
  return focused ? (
    <ImageBackground
      source={images.highlight}
      className="flex flex-row w-full flex-1 min-w-[112px] min-h-14 mt-4 items-center justify-center rounded-full overflow-hidden"
    >
      <Image source={icon} tintColor="#151312" className="size-5" alt={title} />
      <Text className="text-secondary ml-2 text-base font-semibold">{title}</Text>
    </ImageBackground>
  ) : (
    <View className="size-full justify-center items-center mt-4 rounded-full">
      <Image source={icon} alt={title} tintColor="#A8B5DB" />
    </View>
  );
};

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: "#0f0D23",
          borderRadius:50,
          marginHorizontal: 20,
          marginBottom: 36,
          height:52,
          position: "absolute",
          overflow: "hidden",
          borderWidth:1,
          borderColor: "#0f0D23",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} title="Home" icon={icons.home} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} title="Search" icon={icons.search} />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} title="Saved" icon={icons.save} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} title="Profile" icon={icons.person} />
          ),
        }}
      />
    </Tabs>
  );
};

export default _layout;
