const questions = [
    {
        question: "Which of the following is the correct syntax to declare a variable in JavaScript?",
        answers: [
            {text: "float myVariable;", correct: false},
            {text: "int myVariable;", correct: false},
            {text: "dim myVariable", correct: false},
            {text: "let myVariable;", correct: true}
        ]
    },
    {
        question: "Which of the following methods is used to add an element at the end of an array in JavaScript?",
        answers: [
            {text: "shift()", correct: false},
            {text: "unshift()", correct: false},
            {text: "pop()", correct: false},
            {text: "push()", correct: true}
        ]
    },
    {
        question: "What will be the output of `console.log(typeof NaN);`?",
        answers: [
            {text: "object", correct: false},
            {text: "number", correct: true},
            {text: "undefined", correct: false},
            {text: "string", correct: false}
        ]
    },
    {
        question: "How do you write a single-line comment in JavaScript?",
        answers: [
            {text: "/* comment */", correct: false},
            {text: "# comment", correct: false},
            {text: "&lt;!-- comment --&gt;", correct: false},
            {text: "// comment", correct: true}
        ]
    },
    {
        question: "Which of the following is not a JavaScript data type?",
        answers: [
            {text: "String", correct: false},
            {text: "Number", correct: false},
            {text: "Character", correct: true},
            {text: "Boolean", correct: false}
        ]
    },
    {
        question: "Which function is used to parse a string to an integer in JavaScript?",
        answers: [
            {text: "parseInteger()", correct: false},
            {text: "parseInt()", correct: true},
            {text: "toInteger()", correct: false},
            {text: "convertToInt()", correct: false}
        ]
    },
    {
        question: `What is the output of console.log("5" + 3)?`,
        answers: [
            {text: "35", correct: false},
            {text: "Error", correct: false},
            {text: "53", correct: true},
            {text: "8", correct: false}
        ]
    },
    {
        question: "What will the following code output: console.log(typeof null);?",
        answers: [
            {text: "null", correct: false},
            {text: "Error", correct: false},
            {text: "undefined", correct: false},
            {text: "object", correct: true}
        ]
    },
    {
        question: "What is the purpose of the bind() method in JavaScript?",
        answers: [
            {text: "To permanently bind a function to a particular context (value of `this`)", correct: true},
            {text: "To execute a function immediately", correct: false},
            {text: "To stop a function from being called", correct: false},
            {text: "To create a copy of a function", correct: false}
        ]
    },
    {
        question: `What will be the output of the following code?
                let x = 10;
                let y = (x++, x + 1);
                console.log(y);`,
        answers: [
            {text: "10", correct: false},
            {text: "11", correct: false},
            {text: "12", correct: true},
            {text: "13", correct: false}
        ]
    }
];

const questionElem = document.getElementById('question');
const answerButton = document.getElementById('answer-btn');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestions();
}

function showQuestions() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElem.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e) {
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if (isCorrect) {
        selectBtn.classList.add("correct");
        score++;
    } else {
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElem.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Try Again";
    nextButton.style.display = "block";
}

function handleNextBtn() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestions();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextBtn();
    } else {
        startQuiz();
    }
});

startQuiz();



