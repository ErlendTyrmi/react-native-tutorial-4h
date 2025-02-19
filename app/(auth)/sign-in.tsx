import { View, ScrollView, Image, Text, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { images } from "@/constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { signIn } from "@/lib/appwrite";

const SignIn = () => {
  const [form, setform] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setisSubmitting] = useState(false);

  const submitForm = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    setisSubmitting(true);

    try {
      const result = await signIn(form.email, form.password);

      // Store in global state

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
            Log in to Aora
          </Text>
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
            title="Sign in"
            handlePress={submitForm}
            containerStyles="mt-7 w-full"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-gray-100 text-lg font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/(auth)/sign-up"
              className="text-lg text-secondary text-semibold"
            >
              Sign Up!
            </Link>
          </View>
        </View>
      </ScrollView>
      <StatusBar style="light" backgroundColor="#161622" />
    </SafeAreaView>
  );
};

export default SignIn;
