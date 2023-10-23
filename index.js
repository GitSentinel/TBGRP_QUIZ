const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        answer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: "Mars"
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
        answer: "Blue Whale"
    }
];

const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const feedbackElement = document.getElementById("feedback");
const nextButton = document.getElementById("next-btn");
const timerElement = document.getElementById("timer");

let currentQuestionIndex = 0;
let score = 0;
let countdown;

function startQuiz() {
    showQuestion(quizData[currentQuestionIndex]);
    countdown = startTimer(10); // 10 seconds timer for each question
}

function startTimer(seconds) {
    timerElement.textContent = `Time: ${seconds}s`;
    return setInterval(() => {
        seconds--;
        timerElement.textContent = `Time: ${seconds}s`;
        if (seconds <= 0) {
            clearInterval(countdown);
            handleAnswer(false);
        }
    }, 1000);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    optionsContainer.innerHTML = "";
    question.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("option-btn");
        button.addEventListener("click", () => handleAnswer(option === question.answer));
        optionsContainer.appendChild(button);
    });
}

function handleAnswer(correct) {
    clearInterval(countdown);
    if (correct) {
        score++;
        feedbackElement.textContent = "Correct!";
    } else {
        feedbackElement.textContent = "Wrong!";
    }
    Array.from(optionsContainer.children).forEach(button => {
        button.disabled = true;
        if (button.innerText === quizData[currentQuestionIndex].answer) {
            button.classList.add("correct");
        } else {
            button.classList.add("wrong");
        }
    });
    nextButton.classList.remove("hide");
}

function resetState() {
    feedbackElement.textContent = "";
    clearStatusClass(document.body);
    nextButton.classList.add("hide");
    Array.from(optionsContainer.children).forEach(button => {
        button.disabled = false;
        button.classList.remove("correct");
        button.classList.remove("wrong");
    });
}

function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
}

nextButton.addEventListener("click", () => {
    resetState();
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        showQuestion(quizData[currentQuestionIndex]);
        countdown = startTimer(10); // Reset timer for the next question
        document.body.classList.add("fade-in");
    } else {
        alert(`Quiz Completed!\nYour Score: ${score}/${quizData.length}`);
    }
});

startQuiz();
