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
        text: "Kuidas tekivad molekulaarsed ained?",
        answers: ["Kovalentsete sidemete kaudu", "Iooniliste sidemete kaudu", "Metalliliste sidemete kaudu", "Füüsikalise segunemise teel"],
        correctAnswer: "Kovalentsete sidemete kaudu"
    },
    {
        text: "Kuidas tekivad mittemolekulaarsed ained?",
        answers: ["Erinevate sidemetega, ioonilised/metallilised", "Ainult kovalentsete sidemete kaudu", "Ainult füüsikalise segunemise teel", "Ainult hüdrogeensidemete kaudu"],
        correctAnswer: "Erinevate sidemetega, ioonilised/metallilised"
    },
    {
        text: "Millest koosnevad molekulaarsed ained?",
        answers: ["Molekulid, kovalentselt seotud", "Aatomid, iooniliselt seotud", "Metallid, vabalt liikuvate elektronidega", "Aatomid, ilma sidemeteta"],
        correctAnswer: "Molekulid, kovalentselt seotud"
    },
    {
        text: "Millest koosnevad mittemolekulaarsed ained?",
        answers: ["Aatomid/ioonid, mitmekesised sidemed", "Ainult molekulid, kovalentselt seotud", "Ainult metallid, vabalt liikuvate elektronidega", "Ainult ioonid, iooniliselt seotud"],
        correctAnswer: "Aatomid/ioonid, mitmekesised sidemed"
    },
    {
        text: "Mis on hapnikuga ühend?",
        answers: ["Oksiid", "Hüdroksiid", "Karbonaat", "Nitriit"],
        correctAnswer: "Oksiid"
    },
    {
        text: "Mis on Vääveldioksiid?",
        answers: ["SO3", "SO2", "CO2", "H2SO4"],
        correctAnswer: "SO2"
    },
    {
        text: "Mida näitab reaktsioonivõrrand?",
        answers: ["Näitab, kuidas ühed ained muunduvad teisteks aineteks", "Kirjeldab ainult füüsikalisi muutusi", "Määrab ainete temperatuuri muutused", "Näitab ainult keemilise reaktsiooni kiirust"],
        correctAnswer: "Näitab, kuidas ühed ained muunduvad teisteks aineteks"
    }    
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
        feedbackElement.innerHTML = '<span style="color: green;">Õige!</span>';
        opponents[currentOpponentIndex].hp -= 20;
        document.getElementById('opponentCharacterHp').textContent = `HP: ${opponents[currentOpponentIndex].hp}`;
        // Add shake effect to opponent when taking damage
        opponentCharacter.classList.add('shake');
        setTimeout(() => opponentCharacter.classList.remove('shake'), 500); // Remove shake effect after 0.5 seconds


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
            mainCharacter.src ='../img/jukuX-X.gif';
            setTimeout(() => {
                alert("Kaotasid kõik elud. Mäng läbi.");
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
