import { images } from "../constants";
import { SafeAreaView, ScrollView, Image, View, Text } from "react-native";
import "./../global.css";
import CustomButton from "@/components/CustomButton";
import { Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function HomeScreen() {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="justify-center w-full h-full items-center px-4">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[180px] h-[84px]"
          />
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
          />

          <View className="relative mt-5 ">
            <Text className="text-white text-3xl font-bold text-center">
              Discover endless possibilities with{" "}
              <Text className="text-secondary-200">React Native</Text>
            </Text>

            <Image
              source={images.path}
              className="w-[300px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
            />
          </View>

          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Where creativity meets a tutorial. Embark on a journey of learning
            and coffee!
          </Text>
          <CustomButton
            title="Continue with email"
            handlePress={() => {
              router.push("/sign-in");
            }}
            containerStyles="mt-7 w-full"
          />
        </View>
      </ScrollView>
      <StatusBar style="light" backgroundColor="#161622" />
    </SafeAreaView>
  );
}
