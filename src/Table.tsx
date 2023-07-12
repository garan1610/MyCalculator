import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Component from "./Component";

interface ComponentProps {
  item: any;
  onPressButton: Function;
  buttonPressed: any;
}
const matrix = [
  ["AC", "+/-", "Del", "+"],
  [7, 8, 9, "-"],
  [4, 5, 6, "*"],
  [1, 2, 3, "/"],
  [0, ".", "="],
];

const Line = (props: ComponentProps) => {
  return (
    <View style={{ flexDirection: "row" }}>
      {props.item.map((value: any, index: any) => (
        <Component
          item={value}
          onPressButton={props.onPressButton}
          buttonPressed={props.buttonPressed}
          key={index}
        />
      ))}
    </View>
  );
};

const Table = (props: any) => {
  return (
    <View>
      {matrix.map((value: any) => (
        <Line
          item={value}
          onPressButton={props.onPressButton}
          buttonPressed={props.buttonPressed}
          key={value}
        />
      ))}
    </View>
  );
};

export default Table;

const styles = StyleSheet.create({});
