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
        question:
            "How many people with diabetes have type 2 diabetes",
        choice1: "1 in 10",
        choice2: "1 in 4",
        choice3: "1 in 2",
        choice4: "More than 9 in 10",
        answer: 4,
    },
    {
        question:
            "If your diabetes isn't under control, it can harm which body part?",
        choice1: "Liver",
        choice2: "Eyes and kidneys",
        choice3: "Heart",
        choice4: "B and C",
        answer: 4,
    },
    {
        question:
            "What does insulin do?",
        choice1: "Lets blood sugar leave the liver",
        choice2: "Helps cells take in blood sugar",
        choice3: "Helps cells keep out blood sugar",
        choice4: "Lets your body release adrenaline",
        answer: 2,
    },
    {
        question:
            "Which of these makes it more likely for you to get type 2 diabetes?",
        choice1: "Obesity",
        choice2: "Physical activity",
        choice3: "Gender",
        choice4: "Age",
        answer: 1,
    },

    {
        question:
            "Diabetes can only be managed with medicine.",
        choice1: "True",
        choice2: "False",
        choice3: "Don't know",
        choice4: "May be",
        answer: 2,
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