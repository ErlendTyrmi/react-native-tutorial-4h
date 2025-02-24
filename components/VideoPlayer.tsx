import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import { View } from "react-native";

interface VideoPlayerProps {
  source: string;
  styles: string;
}

export default function VideoPlayer({ source, styles }: VideoPlayerProps) {
  const player = useVideoPlayer(source, (player) => {
    player.loop = true;
    player.play();
  });

  return (
    <View className={`${styles}`}>
      <VideoView
        style={{
          width: "100%",
          height: "100%",
        }}
        contentFit="cover"
        player={player}
        allowsFullscreen
        allowsPictureInPicture
      />
    </View>
  );
}
