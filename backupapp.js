import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import axios from "axios";

const QuizApp = () => {
  const [quizData, setQuizData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

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
    const currentQuestionData = quizData[currentQuestion];
    const isCorrect = selectedAnswer === currentQuestionData.correct_answer;

    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion === quizData.length - 1) {
      console.log("Final Score:", score);
    } else {
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
  const showResult = () => {
    if (currentQuestion === quizData.length - 1) {
      return (
        <View>
          <Text>Final Score: {score}</Text>
        </View>
      );
    }
  };
  return (
    <View style={{ marginTop: 50 }}>
      <Text>Sản phẩm: {category}</Text>
      <Text>Câu hỏi: {question}</Text>
      {shuffledAnswers.map((answer, index) => (
        <TouchableOpacity key={index} onPress={() => handleAnswer(answer)}>
          <Text>Đáp án: {answer}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default QuizApp;
