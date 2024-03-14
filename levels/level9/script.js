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
        text: "Kuidas jaotatakse pH skaala (vasakult paremale)?",
        answers: ["Happeline, neutraalne, aluseline", "Aluseline, neutraalne, happeline", "Neutraalne, happeline, aluseline", "Aluseline, happeline, neutraalne"],
        correctAnswer: "Happeline, neutraalne, aluseline"
    },
    {
        text: "Nimeta kulla tähis.",
        answers: ["Au", "Ag", "Cu", "Fe"],
        correctAnswer: "Au"
    },
    {
        text: "Mitu sidet on süsinikul?",
        answers: ["4", "2", "3", "1"],
        correctAnswer: "4"
    },
    {
        text: "Mis on aine nimetus, mis koosneb hapnikust ja mõnest mittemetallist ning reageerib veega moodustades hapet?",
        answers: ["Happeline oksiid", "Aluseline oksiid", "Neutraalne oksiid", "Metalliline oksiid"],
        correctAnswer: "Happeline oksiid"
    },
    {
        text: "Mis on ained, mis vees lahustudes prootoneid eraldavad?",
        answers: ["Happed", "Alused", "Soolad", "Oksiidid"],
        correctAnswer: "Happed"
    }    
];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // vaheta elementide asukohti
    }
}


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
        // Kui kõik küsimused on vastatud, või mõni muu loogika
        return;
    }

    const question = questions[currentQuestionIndex];
    document.getElementById('question').innerHTML = `<p>${question.text}</p>`;
    
    const answersElement = document.getElementById('answers');
    answersElement.innerHTML = ''; // Tühjenda eelnevad vastused
    
    // Sega valikvastused
    const shuffledAnswers = [...question.answers];
    shuffleArray(shuffledAnswers);
    
    shuffledAnswers.forEach(answer => {
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
        feedbackElement.innerHTML = '<span style="color: green;">Õige!</span>';
        opponents[currentOpponentIndex].hp -= 20;
        document.getElementById('opponentCharacterHp').textContent = `HP: ${opponents[currentOpponentIndex].hp}`;
        // Add shake effect to opponent when taking damage
        opponentCharacter.classList.add('shake');
        opponentCharacter.src = '../img/epicbossDMG.png';
        setTimeout(() => {
            opponentCharacter.classList.remove('shake');
            opponentCharacter.src = '../img/epicboss.gif'; // Set the image source to an empty string
        }, 500); // Remove shake effect and image source after 0.5 seconds



        if (opponents[currentOpponentIndex].hp <= 0) {
            setTimeout(() => {
                alert("Sa alistasid vastase! Liigu järgmisele tasemele");
                window.location.href = '../../levels.html';
            }, 1500);
        }
        setTimeout(() => {
            currentQuestionIndex++;
            showQuestion();
        }, 1000); // Wait for 1 sec before moving to the next question or opponent
    } else {
        feedbackElement.innerHTML = '<span style="color: red;">Vale vastus! Proovi uuesti.</span>';
        mainCharacterHp -= 20;
        document.getElementById('mainCharacterHp').textContent = `HP: ${mainCharacterHp}`;

        if (mainCharacterHp <= 0) {
            mainCharacter.src ='../img/kosmosjukudead.gif';
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
