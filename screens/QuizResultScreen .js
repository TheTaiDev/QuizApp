import React from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";

const QuizResultScreen = ({ navigation, route }) => {
  const { score } = route.params;
  const { totalTime } = route.params;
  const { totalQuestions } = route.params;

  const renderIcon = () => {
    if (score > 5) {
      return <Entypo name="emoji-happy" size={50} color="gray" />;
    } else {
      return <Entypo name="emoji-sad" size={50} color="gray" />;
    }
  };

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
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
          Overview
        </Text>
        {renderIcon()}
        <Text
          style={{
            fontSize: 20,
            lineHeight: 29,
            color: "black",
            marginTop: 30,
            fontWeight: "bold",
          }}
        >
          {score > 5 ? "Congratulations!" : "Completed!"}
        </Text>

        <Text style={{ fontSize: 18, marginTop: 20, color: "gray" }}>
          {score}/{totalQuestions} correct answer in {totalTime}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("StartScreen")}
          style={{
            width: 240,
            height: 48,
            marginTop: 120,
            backgroundColor: "#bc09e8",
            borderRadius: 30,
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 10,
          }}
        >
          <Text
            style={{
              fontSize: 15,
              color: "#FFFF",
              fontWeight: "500",
              lineHeight: 24,
            }}
          >
            Play Again
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default QuizResultScreen;
