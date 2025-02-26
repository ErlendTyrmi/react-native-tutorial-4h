import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchField from "@/components/SearchField";
import EmptyState from "@/components/EmptyState";
import { searchPosts } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import VideoCard from "@/components/VideoCard";
import { VideoCollection } from "../../models/videoItem";
import { useLocalSearchParams } from "expo-router";

const Search = () => {
  const { query } = useLocalSearchParams();

  const { data: posts, refetch } = useAppwrite(() =>
    searchPosts(query as string)
  );

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts as VideoCollection}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
            <Text className="font-pmedium text-sm text-gray-100">
              Search results
            </Text>
            <Text className="font-pmedium text-2xl text-gray-100">{query}</Text>

            <View className="mt-6 mb-8">
              <SearchField
                initialQuery={query as string}
                keyboardType={"default"}
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState title="No Results" subtitle="Try another query." />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
