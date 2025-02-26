import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { VideoItem } from "@/models/videoItem";
import { icons } from "@/constants";
import VideoPlayer from "./VideoPlayer";

interface VideoCardProps {
  video: VideoItem;
}

const VideoCard = (props: VideoCardProps) => {
  const { title, thumbnail, video, creator } = props.video;
  const [play, setPlay] = useState(false);

  return (
    <View className="flex flex-col px-4 mb-14 items-center">
      <View className="flex flex-row gap-3 items-start">
        <View className="flex justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-lg border border-secondary flex justify-center items-center p-0.5">
            <Image
              source={{ uri: creator.avatar }}
              resizeMode="contain"
              className="w-full h-full rounded-md"
            />
          </View>
          <View className="flex flex-1 justify-center ml-3 gap-y-1">
            <Text
              className="text-white text-md font-psemibold"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text className="font-psemibold text-sm text-gray-100">
              Created by {creator.username}
            </Text>
          </View>

          <View className="pt-2">
            <Image
              source={icons.menu}
              className="h-6 w-6"
              resizeMode="contain"
            />
          </View>
        </View>
      </View>
      {play ? (
        <VideoPlayer
          source={video}
          styles="w-full h-60 rounded-xl overflow-hidden mt-3"
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="w-full h-60 rounded-xl relative flex justify-center items-center overflow-hidden mt-3"
        >
          <Image
            source={{ uri: thumbnail }}
            resizeMode="cover"
            className="w-full h-full"
          />
          <Image
            source={icons.play}
            className="absolute h-12 w-12"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
