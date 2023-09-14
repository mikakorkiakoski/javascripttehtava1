const questionImage = document.querySelector('.question img');
const resultMessage = document.getElementById('resultMessage');
const questionNumber = document.getElementById('questionNumber');
const scoreDisplay = document.getElementById('score');
const guide = document.getElementById('guide');
const answerButtons = document.querySelectorAll('.answer-button');

const questions = [
    {
        imageSrc: 'images/question1.jpg',
        answerIDs: ['ButtonA', 'ButtonB', 'ButtonC', 'ButtonD'],
        correctAnswer: 'ButtonD', // ID of the correct answer button
    },
    {
        imageSrc: 'images/question2.jpg',
        answerIDs: ['ButtonA', 'ButtonB', 'ButtonC', 'ButtonD'],
        correctAnswer: 'ButtonB', // ID of the correct answer button
    },
    {
        imageSrc: 'images/question3.jpg',
        answerIDs: ['ButtonA', 'ButtonB', 'ButtonC', 'ButtonD'],
        correctAnswer: 'ButtonA', // ID of the correct answer button
    },
    {
        imageSrc: 'images/question4.jpg',
        answerIDs: ['ButtonA', 'ButtonB', 'ButtonC', 'ButtonD'],
        correctAnswer: 'ButtonC', // ID of the correct answer button
    },
    {
        imageSrc: 'images/question5.jpg',
        answerIDs: ['ButtonA', 'ButtonB', 'ButtonC', 'ButtonD'],
        correctAnswer: 'ButtonD', // ID of the correct answer button
    },
];

const buttonTextsPerQuestion = [
    ["rook to d4", "king to h1", "pawn to g3", "rook to d8"],
    ["bishop to a3", "queen to f7", "pawn to e5", "queen to d7"],
    ["queen to h7", "bishop to b5", "rook to h3", "queen to g6"],
    ["rook to g7", "knight to d6", "queen to g7", "queen to b8"],
    ["queen to a5", "knight to e6", "pawn to g4", "queen to d8"],
];

let score = 0;
let currentQuestionIndex = 0;

// Function to update the question and answer
function updateQuestionAndAnswer() {
    const currentQuestion = questions[currentQuestionIndex];
    questionImage.src = currentQuestion.imageSrc; // Update question image source
    questionNumber.textContent = `Question ${currentQuestionIndex + 1}`; // Display current question number
    resultMessage.textContent = ''; // Clear the result message
    answerButtons.forEach((button) => {
        button.style.display = 'inline';
    });

    // Update answer buttons with options
    // Update answer buttons with options
    const buttonOptions = buttonTextsPerQuestion[currentQuestionIndex];
    answerButtons.forEach((button, index) => {
        button.id = currentQuestion.answerIDs[index];
        button.textContent = buttonOptions[index]; // Set different text content
        button.style.display = 'inline';
    });
}

// Initialize the first question
updateQuestionAndAnswer();

answerButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const userAnswer = button.id;
        const currentQuestion = questions[currentQuestionIndex];

        if (userAnswer === currentQuestion.correctAnswer) {
            showMessage('Correct! You\'ve checkmated in one move. Moving on...');
            questionImage.src = `images/answer${currentQuestionIndex + 1}.jpg`;
            answerButtons.forEach((button) => {
                button.style.display = 'none';
            });
            score++;
        } else {
            answerButtons.forEach((button) => {
                button.style.display = 'none';
            });
            showMessage('Sorry, that\'s not the correct move. Moving on...');
        }

        // Move to the next question
        currentQuestionIndex++;

        // Check if there are more questions
        if (currentQuestionIndex < questions.length) {
            setTimeout(function () {
                updateQuestionAndAnswer();
            }, 4000); // Display the next question after 2 seconds
        } else {
            // Display final score when all questions are answered
            setTimeout(function () {
                questionImage.style.display = 'none'; // Hide the question image
                answerButtons.forEach((button) => {
                    button.style.display = 'none'; // Hide the answer buttons
                });
                questionNumber.style.display = 'none'; // Hide the question number
                scoreDisplay.textContent = `Quiz complete! Your score: ${score}/5`;
                guide.style.display = 'none';
                showMessage("");
            }, 4000); // Display the final score after 2 seconds
        }

        // Update score display
        scoreDisplay.textContent = `Score: ${score}`;
    });
});

function showMessage(text) {
    resultMessage.textContent = text;
}

