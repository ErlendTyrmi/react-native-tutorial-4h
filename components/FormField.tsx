import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useState } from "react";
import { icons } from "../constants";

interface FormFieldProps {
  title: string;
  value: string;
  placeholder: string;
  onChangeText?: (e: string) => void;
  formStyles?: string;
  keyboardType: "default" | "email-address" | "numeric" | "password";
}

const FormField: React.FC<FormFieldProps> = ({
  title,
  value,
  placeholder,
  onChangeText,
  formStyles,
  keyboardType,
}) => {
  const [showPassword, setshowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${formStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      <View className="border-2 border-black-200 h-16 px-4 bg-black-100 rounded-2xl w-full focus:border-secondary items-center flex-row">
        <TextInput
          className="flex-1 text-white font-psemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor={"#7b7b8b"}
          onChangeText={onChangeText}
          secureTextEntry={keyboardType === "password" && !showPassword}
        />

        {keyboardType === "password" && (
          <TouchableOpacity onPress={() => setshowPassword(!showPassword)}>
            <Image
              source={showPassword ? icons.eye : icons.eyeHide}
              resizeMode="contain"
              className="w-6 h-6"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
