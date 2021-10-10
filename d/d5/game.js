const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: ' Which of these is a cause of heart disease?',
        choice1: ' Stroke',
        choice2: 'Arthritis',
        choice3: 'Thickening of the inside of the arteries',
        choice4: 'None of the above',
        answer: 3,
    },
    {
        question:
            "What can happen if blood flow in an artery is blocked or greatly restricted?",
        choice1: "Heart palpitations",
        choice2: "Stroke",
        choice3: "Heart attack",
        choice4: "B and C",
        answer: 4,
    },
    {
        question:
            "Three risk factors for heart disease can't be controlled. Which of these are they?",
        choice1: "Medicine use, vaccines, alcoholism",
        choice2: "Age, sex, heredity",
        choice3: "Diet, drug use, smoking",
        choice4: "None of the above",
        answer: 3,
    },
    {
        question:
            "What is considered high blood pressure ?",
        choice1: " 90/70",
        choice2: "100/80",
        choice3: "130/80",
        choice4: "140/90",
        answer: 4,
    },

    {
        question:
            "Why can smoking lead to heart disease?",
        choice1: "It causes the arteries to harden and thicken",
        choice2: "It reduces HDL (good) cholesterol",
        choice3: "It raises blood pressure",
        choice4: "All of the above",
        answer: 4,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score += num
    scoreText.innerText = score
}

startGame()