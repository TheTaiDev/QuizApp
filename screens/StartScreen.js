import {
  TouchableOpacity,
  Image,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import React, { Component } from "react";

export default function StartScreen({ navigation }) {
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
          gap: 20,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: "#FFFF",
            textAlign: "center",
          }}
        >
          Welcome to Quiz
        </Text>
        <Image
          style={{
            width: 200,
            height: 200,
          }}
          source={require("../assets/image/quiz.png")}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("QuizHomeScreen")}
          style={{
            width: 150,
            height: 50,
            backgroundColor: "#b13ccf",
            justifyContent: "center",
            marginLeft: 30,
            marginTop: 50,
            alignItems: "center",
            borderRadius: 20,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "500",
              color: "#FFFF",
              textAlign: "center",
            }}
          >
            Let's start
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
