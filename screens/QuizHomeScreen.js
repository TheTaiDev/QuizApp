import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import axios from "axios";

const QuizHomeScreen = () => {
  const [quizData, setQuizData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    fetchQuizData();
  }, []);

  const fetchQuizData = async () => {
    try {
      const response = await axios.get("https://opentdb.com/api.php?amount=5");
      const shuffledQuizData = shuffleArray(response.data.results);
      setQuizData(shuffledQuizData);
    } catch (error) {
      console.error(error);
    }
  };

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  const handleAnswer = (selectedAnswer) => {
    setSelectedAnswer(selectedAnswer);
  };

  const handleCommit = () => {
    const currentQuestionData = quizData[currentQuestion];
    const isCorrect = selectedAnswer === currentQuestionData.correct_answer;

    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion === quizData.length - 1) {
      console.log("Final Score:", score);
    } else {
      setSelectedAnswer(null);
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  if (quizData.length === 0) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  const currentQuestionData = quizData[currentQuestion];
  const { category, question, correct_answer, incorrect_answers } =
    currentQuestionData;

  const allAnswers = [...incorrect_answers, correct_answer];
  const shuffledAnswers = shuffleArray(allAnswers);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#FFFF",
      }}
    >
      <View
        style={{
          marginTop: 40,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: 390,
            height: 228,
            backgroundColor: "#bc09e8",
            borderRadius: 30,
          }}
        ></View>
        <View
          style={{
            width: 350,
            height: 200,
            backgroundColor: "#FFFFFF",
            borderRadius: 40,
            position: "absolute",
            top: 100,
            borderWidth: 1.5,
            borderColor: "#FFF5EE",
            borderStyle: "solid",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              padding: 40,
              fontSize: 15,
              fontWeight: "500",
              color: "#A42FC1",
              lineHeight: 18,
            }}
          >
            Quesetion {currentQuestion + 1} / {quizData.length}
          </Text>

          <Text
            style={{
              paddingHorizontal: 20,
              fontSize: 16,
              lineHeight: 21,
              textAlign: "center",
              fontWeight: "500",
              color: "#2B262D",
            }}
          >
            {question}
          </Text>
        </View>
        <View
          style={{
            marginTop: 150,
          }}
        >
          {allAnswers.map((answer, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleAnswer(answer)}
              style={{}}
            >
              <View
                style={{
                  width: 240,
                  height: 48,
                  backgroundColor: "#FFFF",
                  margin: 10,
                  backgroundColor:
                    selectedAnswer === answer ? "#dc9aed" : "transparent",
                  borderWidth: 2,
                  borderColor: "#A42FC1",
                  borderStyle: "solid",
                  borderTopLeftRadius: 15,
                  justifyContent: "center",
                  paddingLeft: 18,
                  borderTopRightRadius: 15,
                  borderBottomRightRadius: 15,
                  borderBottomLeftRadius: 15,
                }}
              >
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 16,
                    lineHeight: 26,
                    fontWeight: "500",
                    color: "#2B262D",
                  }}
                >
                  {answer}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            onPress={handleCommit}
            style={{
              width: 240,
              height: 48,
              marginTop: 20,
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
              Next
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default QuizHomeScreen;
