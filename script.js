
//Start the Quiz
const openerElement = document.getElementById('opener')
const startButton = document.getElementById('start')
const timerElement = document.getElementById('timer')
let startTime = +timerElement.textContent
const scoreElement = document.getElementById('score')
const currentScore = document.getElementById('currentScore')
const displayScoresElement = document.getElementById('displayScores')
let score = 0;
let timerCountdown;

startButton.addEventListener('click', (event) => {
  openerElement.style.display = 'none'
  startTimer()
  getNextQuestion(0)
})

// WHEN I click the start button
// THEN a timer starts and I am presented with a question
const questions = [
  {
    question: 'What keyword can you use to define a variable?',
    answers: [
      { text: 'A) let', correct: false },
      { text: 'B) const', correct: false },
      { text: 'C) var', correct: false },
      { text: 'D) All of the above', correct: true }
    ]
  },
  {
    question: 'What does HTML stand for',
    answers: [
      { text: 'A) HighText Maching Language', correct: false },
      { text: 'B) Hypertext Markup Language', correct: true },
      { text: 'C) Hypertext Manmande Language', correct: false },
      { text: 'D) Hypertense Manipulation Level', correct: false }
    ]
  },
  {
    question: 'Which character is used to represent the closing of a tag in HTML',
    answers: [
      { text: 'A) >', correct: false },
      { text: 'B) [', correct: false },
      { text: 'C) }', correct: false },
      { text: 'D) /', correct: true }
    ]
  },
  {
    question: 'Which of the following attribute is used to provide a unique name to an element?',
    answers: [
      { text: 'A) class', correct: false },
      { text: 'B) id', correct: true },
      { text: 'C) type', correct: false },
      { text: 'D) none of the above', correct: false }
    ]
  },
  {
    question: 'Which of the following HTML attributes is used to define inline styles',
    answers: [
      { text: 'A) type', correct: false },
      { text: 'B) script', correct: false },
      { text: 'C) style', correct: true },
      { text: 'D) color', correct: false }
    ]
  }
]

const questionElement = document.getElementById('questions')
const questionHeader = document.createElement('h2')
// WHEN I answer a question
// THEN I am presented with another question

function getNextQuestion(questionIndex) {
  questionElement.innerHTML = null
  if (questionIndex === questions.length) {
    showScore()
    return;
  }

  const currentQuestion = questions[questionIndex]
  questionHeader.textContent = currentQuestion.question
  questionElement.append(questionHeader)

  currentQuestion.answers.forEach(answer => {
    const answerElement = document.createElement('h2')
    answerElement.textContent = answer.text
    answerElement.setAttribute('data-correct', answer.correct);
    answerElement.addEventListener('click', () => {
      questionIndex += 1
      console.log('correct?', typeof answerElement.dataset.correct)
      const correct = answerElement.dataset.correct;
      if (correct === 'false') {
        startTime -= 10
        if (startTime < 0) {
          startTime = 0
        }

        timerElement.textContent = startTime
      } else {
        score += 10
      }

      getNextQuestion(questionIndex);
    })
    questionElement.append(answerElement);
  })
}




// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and score

//Start the timer
function startTimer() {
   timerCountdown = setInterval(() => {
    timerElement.textContent = startTime--
    if (startTime < 0) {
      clearInterval(timerCountdown)
      showScore()
    }
  }, 1000);
}

function showScore() {
  questionElement.innerHTML = null;
  scoreElement.style.display = 'block'
  currentScore.textContent = score
  clearInterval(timerCountdown)
}

const initialsInput = document.getElementById('initials')
const submitButton = document.getElementById('submit')
const userScoreList = []
submitButton.addEventListener('click', function () {
  const userInitials = initialsInput.value
  const userScore = {
    user: userInitials,
    score: score
  }

  userScoreList.push(userScore);
  window.localStorage.setItem('userScore', JSON.stringify(userScoreList))
  scoreElement.style.display = 'none'
  displayScores();
})

function displayScores() {
  userScoreList.forEach(userScore => {
    const userInitials = userScore.user
    const userInitialsElement = document.createElement('h2')
    userInitialsElement.textContent = userInitials

    const score = userScore.score
    const scoreElement = document.createElement('h2')
    scoreElement.textContent = score

    displayScoresElement.append(userInitialsElement)
    displayScoresElement.append(scoreElement)
  })
}

// if (questions.index === questions.length)
// .setProperty('questions', 'red');