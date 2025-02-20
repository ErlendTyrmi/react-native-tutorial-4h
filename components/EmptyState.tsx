import { View, Text, Image } from "react-native";
import React from "react";
import { images } from "@/constants";
import CustomButton from "./CustomButton";

interface EmptyStateProps {
  title: string;
  subtitle: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, subtitle }) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        className=" h-[180px]"
        resizeMode="contain"
      />
      <Text className="text-white text-2xl ont-psemibold mt-2">{title}</Text>
      <Text className="font-pmedium text-gray-100 text-sm">{subtitle}</Text>
      <CustomButton
        title="Create video"
        handlePress={() => {
          router.push("/create");
        }}
        containerStyles="m-5 w-full"
      />
    </View>
  );
};

export default EmptyState;
