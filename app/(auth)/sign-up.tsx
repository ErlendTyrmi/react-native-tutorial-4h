import { View, ScrollView, Image, Text, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { images } from "@/constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "@/lib/appwrite";
import { useGlobalContext } from "@/context/GlobalProvider";

const SignUp = () => {
  const [form, setform] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setisSubmitting] = useState(false);
  const { setUser } = useGlobalContext();

  const submitForm = async () => {
    if (!form.email || !form.password || !form.userName) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    setisSubmitting(true);

    try {
      const result = await createUser(form.userName, form.email, form.password);

      if (!result) throw new Error("Failed to create account");

      setUser(result);
      router.replace("/home");
    } catch (error: any) {
      Alert.alert("Error", error.message ?? "An error occurred");
    } finally {
      setisSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Sign up to Aora!
          </Text>

          <FormField
            title="Username"
            value={form.userName}
            placeholder="Enter your username"
            onChangeText={(e) => {
              setform({ ...form, userName: e });
            }}
            formStyles="mt-7"
            keyboardType="default"
          />

          <FormField
            title="Email"
            value={form.email}
            placeholder="Enter your email"
            onChangeText={(e) => {
              setform({ ...form, email: e });
            }}
            formStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            placeholder="Enter your password"
            onChangeText={(e) => {
              setform({ ...form, password: e });
            }}
            formStyles="mt-7"
            keyboardType="password"
          />

          <CustomButton
            title="Sign up"
            handlePress={submitForm}
            containerStyles="mt-7 w-full"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-gray-100 text-lg font-pregular">
              Already have an account?
            </Text>
            <Link
              href="/(auth)/sign-in"
              className="text-lg text-secondary text-semibold"
            >
              Sign in!
            </Link>
          </View>
        </View>
      </ScrollView>
      <StatusBar style="light" backgroundColor="#161622" />
    </SafeAreaView>
  );
};

export default SignUp;
