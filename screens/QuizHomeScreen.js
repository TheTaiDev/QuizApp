import React, { useEffect, useState, useCallback } from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome";

Icon.loadFont();

const QuizHomeScreen = ({ navigation }) => {
  const [quizData, setQuizData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);

  useEffect(() => {
    fetchQuizData();
  }, []);

  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  const fetchQuizData = async () => {
    try {
      const response = await axios.get("https://opentdb.com/api.php?amount=10");
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

  const handleAnswer = (selectedAnswer, index) => {
    setSelectedAnswer(selectedAnswer);
    setSelectedAnswerIndex(index);
  };

  const handleCommit = useCallback(() => {
    const currentQuestionData = quizData[currentQuestion];
    const isCorrect = Array.isArray(currentQuestionData.correct_answer)
      ? currentQuestionData.correct_answer.includes(selectedAnswer)
      : currentQuestionData.correct_answer === selectedAnswer;

    if (isCorrect) {
      setCorrectAnswersCount(correctAnswersCount + 1);
    }

    if (currentQuestion === quizData.length - 1) {
      setEndTime(Date.now());
      const totalTimeInSeconds = Math.floor((endTime - startTime) / 1000);
      const seconds = Math.abs(totalTimeInSeconds % 60);

      navigation.navigate("QuizResultScreen", {
        score: correctAnswersCount,
        totalTime: `${seconds} seconds`,
        totalQuestions: quizData.length,
      });

      console.log("Score:", correctAnswersCount);
      console.log("Total Time:", ` ${seconds} seconds `);
    } else {
      setSelectedAnswer(null);
      setSelectedAnswerIndex(null);
      setCurrentQuestion(currentQuestion + 1);
    }
  }, [
    currentQuestion,
    quizData,
    navigation,
    correctAnswersCount,
    selectedAnswer,
    startTime,
    endTime,
  ]);

  if (quizData.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#bc09e8",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "#FFFF",
          }}
        >
          Are you ready ...
        </Text>
      </View>
    );
  }

  const currentQuestionData = quizData[currentQuestion];
  const { question, correct_answer, incorrect_answers } = currentQuestionData;

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
            Question {currentQuestion + 1} / {quizData.length}
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
              onPress={() => handleAnswer(answer, index)}
              style={{}}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor:
                    selectedAnswerIndex === index ? "#dc9aed" : "transparent",
                  borderWidth: 2,
                  borderColor: "#A42FC1",
                  borderStyle: "solid",
                  borderRadius: 15,
                  paddingHorizontal: 18,
                  paddingVertical: 12,
                  marginVertical: 10,
                }}
              >
                <Text
                  numberOfLines={1}
                  style={{
                    flex: 1,
                    fontSize: 16,
                    lineHeight: 26,
                    fontWeight: "500",
                    color: "#2B262D",
                  }}
                >
                  {answer}
                </Text>
                {selectedAnswerIndex === index && (
                  <Icon
                    name="check"
                    size={16}
                    color="#2B262D"
                    style={{ marginLeft: 10 }}
                  />
                )}
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
