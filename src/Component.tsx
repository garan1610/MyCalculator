import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { array, isNumber } from "./local";

interface ComponentProps {
  item: any;
  onPressButton: Function;
  buttonPressed: any;
}

const buttonSize = 65;

const Component = (props: ComponentProps) => {
  const color =
    isNumber(props.item) || props.item == "." ? "#505050" : "#d4d4d2";

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          props.onPressButton(props.item);
        }}
        style={[
          styles.cirle,
          {
            width: props.item == 0 ? buttonSize * 2.45 : buttonSize,
            backgroundColor: array.find((item) => item === props.item)
              ? props.buttonPressed == props.item
                ? "white"
                : "#ff9500"
              : color,
          },
        ]}
      >
        <Text
          style={[
            styles.text,
            {
              fontSize: props.item == "Del" || "AC" ? 35 : 40,
              color:
                array.find((item) => item === props.item) &&
                props.buttonPressed == props.item
                  ? "#ff9500"
                  : "white",
            },
          ]}
        >
          {props.item == "*" ? "x" : props.item == "/" ? "÷" : props.item}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Component;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    color: "white",
  },
  cirle: {
    width: buttonSize,
    height: buttonSize,
    borderRadius: 50,
    borderWidth: 1,
    margin: 15,
  },
  text: {
    color: "white",
    fontSize: 40,
    textAlign: "center",
    lineHeight: buttonSize - 5,
  },
});
