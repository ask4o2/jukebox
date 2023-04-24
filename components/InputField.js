import React from "react";
import { useState } from "react";
import { TextInput } from "react-native";
import { View, StyleSheet } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import tw from "twrnc";

const InputField = ({
  type,
  value,
  fieldName,
  label,
  formFields,
  handleTextChange,
}) => {
  const labelTransform = useSharedValue(0);

  const AnimatedLabelStyles = useAnimatedStyle(() => {
    const transformValue = interpolate(labelTransform.value, [0, 1], [30, 0]);

    return {
      top: withTiming(transformValue, { duration: 300 }),
      color: withTiming(labelTransform.value ? "black" : "gray", {
        duration: 300,
      }),
    };
  });

  const [dimBorder, setDimBorder] = useState(true);

  return (
    <View style={tw.style("mt-[10px]")}>
      <Animated.Text
        style={[
          {
            color: labelTransform.value === 1 ? "red" : "black",
            fontFamily: "Quicksand-Medium",
          },
          AnimatedLabelStyles,
        ]}
      >
        {label}
      </Animated.Text>
      <TextInput
        value={value}
        secureTextEntry={type === "password" ? true : false}
        onFocus={() => {
          labelTransform.value = 1;
          setDimBorder(false);
        }}
        onBlur={() => {
          labelTransform.value = formFields[fieldName] ? 1 : 0;
          setDimBorder(formFields[fieldName] ? false : true);
        }}
        onChangeText={(newValue) => handleTextChange(newValue, fieldName)}
        style={tw.style(
          `w-[90%] h-[40px] border-b-[1px] border-solid ${
            dimBorder ? "border-gray-400" : "border-black"
          } text-[14px]`,
          {
            fontFamily: "Quicksand-Medium",
          }
        )}
      />
    </View>
  );
};

export default InputField;
