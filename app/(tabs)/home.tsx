import { View, Text, FlatList, Image, RefreshControl } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import SearchField from "@/components/SearchField";
import Trending from "@/components/Trending";
import EmptyState from "@/components/EmptyState";
import { getAllPosts } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import VideoCard from "@/components/VideoCard";
import { VideoCollection } from "../models/video";

const Home = () => {
  const [refreshing, setrefreshing] = useState(false);

  const { data, isLoading, refetch } = useAppwrite(getAllPosts);
  //console.log(data);

  const onRefresh = async () => {
    setrefreshing(true);
    refetch();
    setrefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={data as VideoCollection}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between mb-6 flex-row items-start">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome
                </Text>
                <Text className="font-pmedium text-2xl text-gray-100">
                  Username
                </Text>
              </View>

              <View className="mt-1.5">
                <Image
                  className="w-9 h-10"
                  resizeMode="contain"
                  source={images.logoSmall}
                />
              </View>
            </View>
            <SearchField
              title={""}
              value={""}
              placeholder={"Search for a video topic"}
              keyboardType={"default"}
            />
            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-pregular mb-3">
                Latest videos
              </Text>

              <Trending posts={[{ id: 1 }, { id: 2 }, { id: 3 }]} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState title="No Videos" subtitle="No videos created yet." />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
