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
        question: 'Which is the infective form of the malaria parasite?',
        choice1: 'Oocyst',
        choice2: 'Sporozoite',
        choice3: 'Bradyzoite',
        choice4: 'Tachyzoite',
        answer: 2,
    },
    {
        question: 'Trophozoites, schizonts, and gametocytes of all the malarial parasites are seen in the peripheral blood smear except',
        choice1: 'P. falciparum',
        choice2: 'P. malariae',
        choice3: 'P. ovale',
        choice4: 'P. vivax',
        answer: 1,
    },
    {
        question: 'Blackwater fever is a special manifestation of malaria caused by',
        choice1: 'P. falciparum',
        choice2: 'P. malariae',
        choice3: 'P. ovale',
        choice4: 'P. vivax',
        answer: 1,
    },
    {
        question: 'Mosquitoes is/are the vector in the following disorder(s)',
        choice1: 'Onchocerciasis',
        choice2: 'Visceral leishmaniasis',
        choice3: 'African trypanosomiasis',
        choice4: 'Bancroftian filariasis',
        answer: 4,
    },
    {
        question: 'Which of the following statement is correct ?',
        choice1: 'Malaria is neglected tropical disease',
        choice2: 'If you get malaria once, you won’t get it again',
        choice3: 'Malaria is quit often endemic in poorer region of the world',
        choice4: 'All of the above',
        answer: 3,
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