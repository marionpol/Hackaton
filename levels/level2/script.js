document.addEventListener('DOMContentLoaded', showQuestion); // Initialize the game when the document is ready

let currentQuestionIndex = 0;
let currentOpponentIndex = 0; // New variable to track the current opponent
let mainCharacterHp = 100;
let opponentCharacterHp = 100; // This will now be dynamic based on the opponent

// Define your opponents array with names and HP
const opponents = [
    { name: "Mad Scientist", hp: 100 },
    { name: "Chemical Monster", hp: 100 },
    // Add more opponents as needed
];

// Questions array remains the same
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
    {
        text: "Mis on see keemiline side, mille korral kaks mittemetalli aatomit jagavad omavahel elektronpaare?",
        answers: ["Iooniline side", "Metalliline side", "Kovalentne side", "Vesinikside"],
        correctAnswer: "Kovalentne side"
    },
    {
        text: "Milliste omadustega iseloomustatakse mittemetalle?",
        answers: ["Kõrge sulamis- ja keemistemperatuur, hea juhtivus", "Madal sulamis- ja keemistemperatuur, halb juhtivus", "Kõrge elektrijuhtivus, madal keemistemperatuur", "Madal sulamistemperatuur, hea soojusjuhtivus"],
        correctAnswer: "Madal sulamis- ja keemistemperatuur, halb juhtivus"
    },
    {
        text: "Kuidas nimetatakse ainet, mis koosneb vaid ühest keemilisest elemendist?",
        answers: ["Segu", "Liitaine", "Lihtaine", "Komposiitmaterjal"],
        correctAnswer: "Lihtaine"
    },
    {
        text: "Milline termin kirjeldab ainet, mis on moodustunud kahest või enamast keemiliselt seotud erinevast keemilisest elemendist?",
        answers: ["Lihtaine", "Segu", "Liitaine", "Kovalentne ühend"],
        correctAnswer: "Liitaine"
    },
    {
        text: "Kuidas tekivad molekulaarsed ained?",
        answers: ["Iooniliste sidemete kaudu", "Kovalentsete sidemete kaudu", "Metalliliste sidemete kaudu", "Füüsikalise segunemise teel"],
        correctAnswer: "Kovalentsete sidemete kaudu"
    },
];

function updateOpponentDisplay() {
    if (currentOpponentIndex < opponents.length) {
        const currentOpponent = opponents[currentOpponentIndex];
        document.getElementById('opponentCharacter').src = currentOpponent.src;
        opponentCharacterHp = currentOpponent.hp;
        document.getElementById('opponentCharacterHp').textContent = `HP: ${opponentCharacterHp}`;
    }
}

function showQuestion() {
    if (currentQuestionIndex >= questions.length) {
        alert("All questions answered!");
        return;
    }

    const question = questions[currentQuestionIndex];
    document.getElementById('question').innerHTML = `<p>${question.text}</p>`;
    
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
    const answersElement = document.getElementById('answers');
    const mainCharacter = document.getElementById('mainCharacter');
    const gameScreen = document.body; // Assuming you want to change the background of the whole page

    // Disable all answer buttons temporarily
    document.querySelectorAll('#answers button').forEach(button => button.disabled = true);

    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
        feedbackElement.innerHTML = '<span style="color: green;">Correct!</span>';
        opponents[currentOpponentIndex].hp -= 20;
        document.getElementById('opponentCharacterHp').textContent = `HP: ${opponents[currentOpponentIndex].hp}`;

        if (opponents[currentOpponentIndex].hp <= 0) {
            setTimeout(() => {
                alert("Sa alistasid vastase! Liigu järgmisele tasemele");
                window.location.href = '../../levels.html';
            }, 1500);
        }
        
        setTimeout(() => {
            currentQuestionIndex++;
            if (currentQuestionIndex >= questions.length) {
                currentQuestionIndex = 0; // Reset questions if they run out
            }
            showQuestion();
        }, 1000); // Wait for 1 sec before moving to the next question or opponent
    } else {
        feedbackElement.innerHTML = '<span style="color: red;">Incorrect! Try again.</span>';
        mainCharacterHp -= 20;
        document.getElementById('mainCharacterHp').textContent = `HP: ${mainCharacterHp}`;

        if (mainCharacterHp <= 0) {
            setTimeout(() => {
                alert("Game Over! You've lost all your HP.");
                window.location.href = '../../levels.html';
            }, 1500);
        } else {
            // Re-enable buttons if game is not over
            setTimeout(() => {
                document.querySelectorAll('#answers button').forEach(button => button.disabled = false);
            }, 1000);
            // Shake effect and red screen
            mainCharacter.classList.add('shake');
            gameScreen.classList.add('damage-taken');
            setTimeout(() => {
                mainCharacter.classList.remove('shake');
                gameScreen.classList.remove('damage-taken');
            }, 500); // Keep this duration the same as your CSS animation
        }
    }
}
