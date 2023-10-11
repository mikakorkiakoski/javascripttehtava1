// Define a base Question class
class Question {
    constructor(imageSrc, answerIDs, correctAnswer) {
        this.imageSrc = imageSrc;
        this.answerIDs = answerIDs;
        this.correctAnswer = correctAnswer;
    }
}

// Define sub-classes for different types of questions
class ChessQuestion extends Question {
    constructor(imageSrc, answerIDs, correctAnswer, buttonTexts) {
        super(imageSrc, answerIDs, correctAnswer);
        this.buttonTexts = buttonTexts;
    }
}

const questionImage = document.querySelector('.question img');
const resultMessage = document.getElementById('resultMessage');
const questionNumber = document.getElementById('questionNumber');
const scoreDisplay = document.getElementById('score');
const guide = document.getElementById('guide');
const answerButtons = document.querySelectorAll('.answer-button');

const questions = [
    new ChessQuestion('images/question1.jpg', ['ButtonA', 'ButtonB', 'ButtonC', 'ButtonD'], 'ButtonD', ["rook to d4", "king to h1", "pawn to g3", "rook to d8"]),
    new ChessQuestion('images/question2.jpg', ['ButtonA', 'ButtonB', 'ButtonC', 'ButtonD'], 'ButtonB', ["bishop to a3", "queen to f7", "pawn to e5", "queen to d7"]),
    new ChessQuestion('images/question3.jpg', ['ButtonA', 'ButtonB', 'ButtonC', 'ButtonD'], 'ButtonA', ["queen to h7", "bishop to b5", "rook to h3", "queen to g6"]),
    new ChessQuestion('images/question4.jpg', ['ButtonA', 'ButtonB', 'ButtonC', 'ButtonD'], 'ButtonC', ["rook to g7", "knight to d6", "queen to g7", "queen to b8"]),
    new ChessQuestion('images/question5.jpg', ['ButtonA', 'ButtonB', 'ButtonC', 'ButtonD'], 'ButtonD', ["queen to a8", "knight to e6", "pawn to g4", "queen to d8"]),
];


const buttonTextsPerQuestion = questions.map((question) => question.buttonTexts);

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
                scoreDisplay.textContent = `Quiz complete! Your score: ${score}/${questions.length}`;
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
