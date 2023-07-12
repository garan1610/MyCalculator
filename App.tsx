import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Component from "./src/Component";
import Table from "./src/Table";
import { array } from "./src/local";

const buttonSize = 65;
let waitForNew = 0;
let num1 = 0;
let num2 = 0;
let hasNum2 = false;

export default function App() {
  const [num, setNum] = useState("0");
  const [button, setButton] = useState("");

  const addNum = function (number: Number) {
    if (num == "-0") {
      setNum("-" + number.toString());
      if (waitForNew == 1) waitForNew = 0;
    } else if (num == "0" || waitForNew == 1) {
      setNum(number.toString());
      waitForNew = 0;
    } else if (num == "Infinity") {
    } else return setNum(num + number.toString());
  };

  const holdNum1 = function () {
    num1 = Number(num);
    waitForNew = 1;
  };

  const calculate = function () {
    num2 = Number(num);
    setNum(calculate2().toString());
    waitForNew = 1;
  };

  const calculate2 = function () {
    let result = 0;
    if (button == "+") {
      result = num1 + num2;
    }
    if (button == "-") {
      result = num1 - num2;
    }
    if (button == "*") {
      result = num1 * num2;
    }
    if (button == "/") {
      result = num1 / num2;
    }
    return result;
  };

  const calculate3 = function () {
    if (hasNum2 && waitForNew == 0) {
      calculate();
      num1 = calculate2();
    } else {
      holdNum1();
      hasNum2 = true;
    }
  };

  const isNumber = (n: any) => {
    return Number(n) == n;
  };

  const handleInput = (value: any) => {
    if (isNumber(value)) {
      addNum(value);
    }
    if (value == "AC") {
      hasNum2 = false;
      if (num == "0") {
        setButton("");
        waitForNew = 0;
      }
      setNum("0");
    }
    if (value == "+/-") {
      if (num == "0" || waitForNew == 1) {
        setNum("-0");
      } else if (Number(num) > 0) {
        setNum("-" + num);
      } else if (Number(num) < 0) {
        setNum(Math.abs(Number(num)).toString());
      }
    }
    if (value == "Del") {
      if (num.length > 1) setNum(num.slice(0, num.length - 1));
      else setNum("0");
    }
    if (value == "=") {
      if (hasNum2) {
        calculate();
        waitForNew = 0;
        setButton("");
        hasNum2 = false;
      }
    }
    if (value == ".") {
      if (num.indexOf(".") < 0 && num != "Infinity" && num != "-Infinity")
        setNum(num + ".");
    }

    if (array.find((item) => item === value && value != "=")) {
      setButton(value);
      calculate3();
    }
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          color: "white",
          fontSize: 40,
          textAlign: "right",
          paddingTop: 50,
          paddingRight: 40,
          paddingBottom: 35,
        }}
      >
        {num}
      </Text>

      <Table onPressButton={handleInput} buttonPressed={button} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    color: "white",
  },
});
