const questionImage = document.querySelector('.question img');
const answerInput = document.getElementById('answerInput');
const checkButton = document.getElementById('checkButton');
const resultMessage = document.getElementById('resultMessage');
const questionNumber = document.getElementById('questionNumber');
const scoreDisplay = document.getElementById('score');
const questionAndExample = document.getElementById('questionAndExample')

const answers = [
    { answer: "rook to d8" },
    { answer: "queen to f7" },
    { answer: "queen to h7" },
    { answer: "queen to g7" },
    { answer: "queen to d8" }
];

let score = 0;
let currentQuestionIndex = 0;

// Function to update the question and answer
function updateQuestionAndAnswer() {
    questionImage.src = `images/question${currentQuestionIndex + 1}.jpg`; // Update question image source
    answerInput.value = ""; // Clear the answer input field
    resultMessage.textContent = ""; // Clear the result message
    questionNumber.textContent = `Question ${currentQuestionIndex + 1}`; // Display current question number
    answerInput.style.display = 'block';
    checkButton.style.display = 'block';
}

// Initialize the first question
updateQuestionAndAnswer();

checkButton.addEventListener('click', () => {
    const userAnswer = answerInput.value.trim().toLowerCase();
    const correctAnswer = answers[currentQuestionIndex].answer.toLowerCase();

    if (userAnswer === correctAnswer) {
        showMessage('Correct! You\'ve checkmated in one move. Moving on...');
        questionImage.src = `images/answer${currentQuestionIndex + 1}.jpg`;
        answerInput.style.display = 'none'; // Hide the answer input
        checkButton.style.display = 'none'; // Hide the check button
        score++; // Increment the score for a correct answer
    } else {
        showMessage('Sorry, that\'s not the correct move. Moving on...');
        answerInput.style.display = 'none'; // Hide the answer input
        checkButton.style.display = 'none'; // Hide the check button
    }

    // Move to the next question
    currentQuestionIndex++;
    
    // Check if there are more questions
    if (currentQuestionIndex < answers.length) {
        setTimeout(function() {
            updateQuestionAndAnswer();
        }, 4000);
    } else {
        // Display final score when all questions are answered
        setTimeout(function() {
        questionImage.style.display = 'none'; // Hide the question image
        answerInput.style.display = 'none'; // Hide the answer input
        checkButton.style.display = 'none'; // Hide the check button
        questionNumber.style.display = 'none'; // Hide the question number
        scoreDisplay.style.display = 'none';
        questionAndExample.style.display = 'none';
        showMessage(`Quiz complete! Your score: ${score}`);
        }, 4000);
    }

    // Update score display
    scoreDisplay.textContent = `Score: ${score}`;
});

function showMessage(text) {
    resultMessage.textContent = text;
}
