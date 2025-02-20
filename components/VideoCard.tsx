import { View, Text } from "react-native";
import React from "react";
import { VideoItem } from "@/app/models/video";

interface VideoCardProps {
  video: VideoItem;
}

const VideoCard = (props: VideoCardProps) => {
  const { title, thumbnail, video, creator } = props.video;

  return (
    <View>
      <Text className="text-white text-2xl">{title}</Text>
    </View>
  );
};

export default VideoCard;
