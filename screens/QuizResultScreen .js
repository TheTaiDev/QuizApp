import React from "react";
import { View, Text, SafeAreaView } from "react-native";

const QuizResultScreen = ({ navigation, route }) => {
  const { score } = route.params;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#cc5de8",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: 350,
          height: 400,
          backgroundColor: "#FFFFFF",
          borderRadius: 40,
          borderWidth: 1.5,
          borderColor: "#FFF5EE",
          borderStyle: "solid",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>Overview</Text>
        <Text style={{ fontSize: 18, marginTop: 20 }}>Score: {score}</Text>
        <Text
          style={{
            fontSize: 18,
            color: "blue",
            marginTop: 20,
            textDecorationLine: "underline",
          }}
          onPress={() => navigation.navigate("StartScreen")}
        >
          Back
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default QuizResultScreen;
{
  /* <Text style={{ fontSize: 24, fontWeight: "bold" }}>Quiz Result</Text>
      <Text style={{ fontSize: 18, marginTop: 20 }}>Score: {score}</Text>
      <Text
        style={{
          fontSize: 18,
          color: "blue",
          marginTop: 20,
          textDecorationLine: "underline",
        }}
        onPress={() => navigation.navigate("StartScreen")}
      >
        Back
      </Text> */
}
