const quizData = [
    {
      title: "Video Quiz 1",
      quizStartAt: 10,
      question: "Welche Farbe hat das i40 Logo?",
      answers: [
        { text: "Blau", correct: false },
        { text: "Rot", correct: true },
        { text: "Silber", correct: false },
        { text: "Schwarz", correct: false },
      ],
      feedback: {
        correct: "Richtig! Das Logo ist rot.",
        incorrect: "Leider falsch. Das Logo ist rot.",
      },
    },
    {
      title: "Video Quiz 2",
      quizStartAt: 40,
      question: "Welche Aussage ist wahr?",
      answers: [
        { text: "[3] == [3]", correct: false },
        { text: "3 == '3'", correct: true },
        { text: "3 != '3'", correct: false },
        { text: "3 === '3'", correct: false },
      ],
      feedback: {
        correct: "Richtig! 3 == '3' ist wahr.",
        incorrect: "Leider falsch. 3 == '3' ist wahr.",
      },
    },
  ];
  