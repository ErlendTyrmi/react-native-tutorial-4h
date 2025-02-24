import { View, TextInput, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
import { router, usePathname } from "expo-router";

interface SearchFieldProps {
  title: string;
  value: string;
  placeholder: string;
  onChangeText?: (e: string) => void;
  formStyles?: string;
  keyboardType: "default" | "email-address" | "numeric" | "password";
}

const SearchField: React.FC<SearchFieldProps> = ({ placeholder }) => {
  const pathName = usePathname();
  const [query, setQuery] = useState("");

  return (
    <View className="border-2 border-black-200 h-16 px-4 bg-black-100 rounded-2xl w-full focus:border-secondary items-center flex-row space-x-4">
      <TextInput
        className="flex-1 text-white font-pregular text-base mt-0.5"
        value={query}
        placeholder={placeholder}
        placeholderTextColor={"#CDCDE0"}
        onChangeText={(e) => {
          setQuery(e);
        }}
      />

      <TouchableOpacity
        onPress={() => {
          // Guard
          if (!query || query === "") return;

          if (pathName.startsWith("/search")) {
            router.setParams({ query });
          } else {
            router.push(`/search/${query}`);
          }
        }}
      >
        <Image source={icons.search} className="h-5 w-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchField;
