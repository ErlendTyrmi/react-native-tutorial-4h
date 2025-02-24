import {
  FlatList,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import * as Animatable from "react-native-animatable";
import React, { useState } from "react";
import { VideoItem } from "@/app/models/video";
import { icons } from "@/constants";
import VideoPlayer from "@/components/VideoPlayer";

interface TrendingProps {
  posts: VideoItem[];
}

const zoomIn: Animatable.CustomAnimation = {
  0: { scaleX: 0.8, scaleY: 0.8 },
  1: { scaleX: 1, scaleY: 1 },
};

const zoomOut: Animatable.CustomAnimation = {
  0: { scaleX: 1, scaleY: 1 },
  1: { scaleX: 0.8, scaleY: 0.8 },
};

const TrendingItem: React.FC<{
  activeItem: string | null;
  item: VideoItem;
}> = ({ activeItem, item }) => {
  if (!item) return;

  const [play, setPlay] = useState(false);
  const itemAnimation =
    activeItem !== null && activeItem === item.$id ? zoomIn : zoomOut;

  return (
    <Animatable.View className="mr-5" animation={itemAnimation}>
      {play ? (
        <VideoPlayer
          source={item.video}
          styles="rounded-2xl w-52 h-72 overflow-hidden"
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="relative justify-center items-center"
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            resizeMode="cover"
            className="rounded-2xl w-52 h-72 shadow-lg overflow-hidden"
          />
          <Image
            source={icons.play}
            className="absolute h-12 w-12"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending: React.FC<TrendingProps> = ({ posts }) => {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const viewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: Array<{ key: string }>;
  }) => {
    setActiveItem(viewableItems[0].key);
  };

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      horizontal
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{ itemVisiblePercentThreshold: 80 }}
    />
  );
};

export default Trending;
