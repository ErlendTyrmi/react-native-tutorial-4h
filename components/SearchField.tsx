import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useState } from "react";
import { icons } from "../constants";

interface SearchFieldProps {
  title: string;
  value: string;
  placeholder: string;
  onChangeText?: (e: string) => void;
  formStyles?: string;
  keyboardType: "default" | "email-address" | "numeric" | "password";
}

const SearchField: React.FC<SearchFieldProps> = ({
  title,
  value,
  placeholder,
  onChangeText,
  formStyles,
  keyboardType,
}) => {
  const [showPassword, setshowPassword] = useState(false);

  return (
    <View className="border-2 border-black-200 h-16 px-4 bg-black-100 rounded-2xl w-full focus:border-secondary items-center flex-row space-x-4">
      <TextInput
        className="flex-1 text-white font-pregular text-base mt-0.5"
        value={value}
        placeholder={placeholder}
        placeholderTextColor={"#7b7b8b"}
        onChangeText={onChangeText}
      />

      <TouchableOpacity>
        <Image source={icons.search} className="h-5 w-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchField;
