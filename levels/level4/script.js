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
        text: "Mis olukorras võib öelda, et reaktsioonivõrrand on tasakaalus?",
        answers: ["Kui sama elemendi aatomeid on lähteainetes ja saadustes sama palju", "Kui reaktsioonis osaleb võrdne arv molekule mõlemalt poolt", "Kui reaktsiooni soojusefekt on null", "Kui saaduste mass on võrdne lähteainete massiga"],
        correctAnswer: "Kui sama elemendi aatomeid on lähteainetes ja saadustes sama palju"
    },
    {
        text: "Kuidas nimetatakse reaktsioonivõrrandis vasakul pool olevaid aineid?",
        answers: ["Lähteained", "Saadused", "Katalüsaatorid", "Tooted"],
        correctAnswer: "Lähteained"
    },
    {
        text: "Kuidas nimetatakse reaktsioonivõrrandis võrdusmärgist paremal pool olevaid aineid?",
        answers: ["Saadused", "Lähteained", "Reaktsiooni vahesaadused", "Reaktsiooni soojus"],
        correctAnswer: "Saadused"
    },
    {
        text: "Mis on alkaanid?",
        answers: ["süsivesinikud, kus esinevad ainult üksiksidemed", "süsivesinikud, mis sisaldavad topelt- või kolmiksidemeid", "aromaatsed süsivesinikud", "polümeerid"],
        correctAnswer: "süsivesinikud, kus esinevad ainult üksiksidemed"
    },
    {
        text: "Mis on reaktsiooni tüüp, milles aine hapnikuga reageerides soojust ja valgust eraldab?",
        answers: ["Põlemine", "Redutseerimine", "Oksüdatsioon", "Neutraliseerimine"],
        correctAnswer: "Põlemine"
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
        opponentCharacter.src = '../img/alienmad.gif';
        setTimeout(() => {
            opponentCharacter.classList.remove('shake');
            opponentCharacter.src = '../img/alien.gif'; // Set the image source to an empty string
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
