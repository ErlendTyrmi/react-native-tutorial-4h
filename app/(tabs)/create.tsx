import {
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import VideoPlayer from "@/components/VideoPlayer";
import { icons } from "@/constants";
import * as ImagePicker from "expo-image-picker";
import CustomButton from "@/components/CustomButton";
import { VideoCreateFormData } from "@/models/videoCreateFormData";
import { useGlobalContext } from "@/context/GlobalProvider";
import { createVideoPost, logout } from "@/lib/appwrite";
import { router } from "expo-router";

const defaultFormData: VideoCreateFormData = {
  title: "",
  video: "",
  thumbnail: "",
  prompt: "",
  userId: "",
};

const Create = () => {
  const { user } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] =
    useState<VideoCreateFormData>(defaultFormData);

  const openPicker = async (mediaType: "videos" | "images") => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (mediaType === "images") {
        setFormData({ ...formData, thumbnail: result.assets[0] });
      }

      if (mediaType === "videos") {
        setFormData({ ...formData, video: result.assets[0] });
      }
    }
  };

  const submit = async () => {
    const userId = user?.$id as string;

    if (userId.length < 1) {
      Alert.alert("Error", "The session failed.");
    }
    console.log("You got this!");
    console.log(userId);

    if (
      !formData.prompt ||
      !formData.thumbnail ||
      !formData.title ||
      !formData.video
    ) {
      console.log(formData);
      return Alert.alert("Please fill out all the fields!");
    }

    setLoading(true);

    try {
      const data = { ...formData, userId: userId };
      console.log(data);
      const result = await createVideoPost(data);

      if (result) {
        setFormData(defaultFormData);
        router.push("/home");
      }
    } catch (e: any) {
      console.log(e);
      Alert.alert("Error", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-white text-2xl font-psemibild">Upload Video</Text>
        <FormField
          title="Video title"
          value={formData.title ?? ""}
          placeholder={"Give your video a name"}
          keyboardType={"default"}
          onChangeText={(e) => {
            setFormData({ ...formData, title: e });
          }}
          formStyles="mt-10"
        />
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload Video
          </Text>
          <TouchableOpacity onPress={() => openPicker("videos")}>
            {formData.video ? (
              <VideoPlayer
                source={formData.video}
                styles={"w-full h-64 rounded-2xl"}
              />
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
                <View className="border border-dashed border-secondary-100 w-14 h-14 items-center justify-center">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    className="h-1/2 w-1/2"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Thumbnail Image
          </Text>
          <TouchableOpacity onPress={() => openPicker("images")}>
            {formData.thumbnail ? (
              <Image
                source={{ uri: formData.thumbnail.uri }}
                className="h14 w14"
                resizeMode="contain"
              />
            ) : (
              <View className="w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 flex-row">
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  className="h-5 w-5"
                />
                <Text className="text-sm text-gray-100 font-pmedium pl-2">
                  Upload a thumbnail image
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField
          title="Prompt"
          value={formData.prompt ?? ""}
          placeholder={"The prompt used to generate the video"}
          keyboardType={"default"}
          onChangeText={(e) => {
            setFormData({ ...formData, prompt: e });
          }}
          formStyles="mt-10"
        />

        <CustomButton
          title="Publish"
          handlePress={submit}
          containerStyles="mt-8"
          isLoading={loading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
