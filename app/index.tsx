import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import "./../global.css";

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-3xl font-pblack">Allora</Text>
      <StatusBar style="auto" />
      <Link href="/home">Go home</Link>
    </View>
  );
}
