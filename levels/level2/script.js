document.addEventListener('DOMContentLoaded', showQuestion); // Initialize the game when the document is ready

let currentQuestionIndex = 0;
let questions = [
    {
        text: "Milline keemiline side tekkib metalli aatomite vahel, kus nad jagavad vabalt liiguvaid elektrone?",
        answers: ["Kovalentne side", "Metalliline side", "Iooniline side", "Vesinikside"],
        correctAnswer: "Metalliline side"
    },
    {
        text: "Mis on ioon?",
        answers: ["Aatom, mis on kaotanud või saanud elektrone", "Aatom, mis on kaotanud prootone", "Aine, mis koosneb ainult ühest molekulist", "Aatom, mis on kaotanud neutroone"],
        correctAnswer: "Aatom, mis on kaotanud või saanud elektrone"
    },
];
let mainCharacterHp = 100;
let opponentCharacterHp = 100;

function showQuestion() {
    const question = questions[currentQuestionIndex];
    const questionElement = document.getElementById('question');
    questionElement.innerHTML = `<p>${question.text}</p>`;
    const answersElement = document.getElementById('answers');
    answersElement.innerHTML = ''; // Clear previous answers

    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.addEventListener('click', () => checkAnswer(answer));
        answersElement.appendChild(button);
    });
}

function checkAnswer(selectedAnswer) {
    const feedbackElement = document.getElementById('feedback');
    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
        feedbackElement.textContent = 'Õige! Järgmine monster!';
        opponentCharacterHp -= 20; // Damage to opponent
        document.getElementById('opponentCharacterHp').textContent = `HP: ${opponentCharacterHp}`;
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            feedbackElement.textContent = 'Sa võitsid kõik monsterid!';
            document.getElementById('nextButton').disabled = true; // Disable the button when the game ends
        }
    } else {
        feedbackElement.textContent = 'Vale! Proovi uuesti!';
        mainCharacterHp -= 20; // Damage to main character
        document.getElementById('mainCharacterHp').textContent = `HP: ${mainCharacterHp}`;
    }
}

// Event listener to manually proceed to the next question
document.getElementById('nextButton').addEventListener('click', () => {
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }
});
