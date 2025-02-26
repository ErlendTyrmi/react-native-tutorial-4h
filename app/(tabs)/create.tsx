import {
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import VideoPlayer from "@/components/VideoPlayer";
import { icons } from "@/constants";
import CustomButton from "@/components/CustomButton";

export interface FormData {
  title: string;
  video: any;
  thumbnail: any;
  prompt: string;
}

const Create = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    title: "",
    video: "",
    thumbnail: "",
    prompt: "",
  });

  const openPicker = async (mediaType: "video" | "image") => {
    console.log(mediaType);

    const result = await DocumentPicker.getDocumentAsync({
      type:
        mediaType === "image"
          ? ["image/png", "image/jpg"]
          : ["video/mp4", "video/gif"],
    });
    if (!result.canceled) {
      console.log(result);

      if (mediaType === "image") {
        setFormData({ ...formData, thumbnail: result.assets[0] });
      }

      if (mediaType === "image") {
        setFormData({ ...formData, video: result.assets[0] });
      }
    } else {
      setTimeout(() => {
        console.log("Document picked: " + JSON.stringify(result, null, 2));
      });
    }
  };

  const submit = () => {
    if (
      !formData.prompt ||
      !formData.thumbnail ||
      !formData.title ||
      !formData.video
    ) {
      return Alert.alert("Please fill out all the fields!");
    }

    setLoading(true);
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
          <TouchableOpacity onPress={() => openPicker("video")}>
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
          <TouchableOpacity onPress={() => openPicker("image")}>
            {formData.thumbnail ? (
              <Image />
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
