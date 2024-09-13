let score = 0;
let level = 1;
let pointsToNextLevel = 5;  // Points requis pour passer au niveau suivant
let timeLeft = 30; // 30 seconds timer
let timerId;
let squareSize = 50; // Taille initiale du carré
const minSquareSize = 20; // Taille minimale du carré

// Sélection des éléments DOM
const gameArea = document.getElementById('game');
const scoreDisplay = document.getElementById('score');
const square = document.getElementById('square');
const timerDisplay = document.getElementById('timer');
const clickSound = document.getElementById('click-sound');

// Création de l'affichage du niveau
const levelDisplay = document.createElement('div');
levelDisplay.id = 'level';
gameArea.appendChild(levelDisplay); // Ajouter l'affichage du niveau dans le jeu

// Afficher le niveau actuel
function updateLevelDisplay() {
    levelDisplay.innerHTML = `Level: ${level}`;
}

// Mettre à jour l'affichage du niveau dès le début du jeu
updateLevelDisplay();

// Fonction pour déplacer le carré
function moveSquare() {
    const gameWidth = gameArea.offsetWidth;
    const gameHeight = gameArea.offsetHeight;

    const maxX = gameWidth - square.offsetWidth;
    const maxY = gameHeight - square.offsetHeight;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    square.style.left = `${randomX}px`;
    square.style.top = `${randomY}px`;
}

// Fonction pour gérer le clic sur le carré
square.addEventListener('click', function () {
    score++;
    scoreDisplay.innerHTML = `Score: ${score}`;

    // Réduire la taille du carré à chaque clic (jusqu'à une taille minimale)
    if (squareSize > minSquareSize) {
        squareSize -= 2; // Réduire la taille du carré
    }
    square.style.width = `${squareSize}px`;
    square.style.height = `${squareSize}px`;

    // Vérifier si le joueur atteint le score requis pour le niveau suivant
    if (score >= pointsToNextLevel) {
        levelUp(); // Passer au niveau suivant
    }

    moveSquare();

    // Jouer le son au clic
    if (clickSound) {
        clickSound.play();
    }
});

// Compte à rebours avec ajustement du temps en fonction du niveau
function startTimer() {
    timerId = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            timerDisplay.innerHTML = `Time: ${timeLeft}s`;
        } else {
            endGame(); // Fin du jeu si le temps est écoulé
        }
    }, 1000);
}

// Augmenter le temps à chaque niveau et ajuster la difficulté
function levelUp() {
    level++;
    pointsToNextLevel += 5; // Augmente les points requis pour le prochain niveau
    timeLeft += 10; // Ajouter du temps supplémentaire à chaque niveau
    updateLevelDisplay();

    // Réduire la taille du carré à chaque niveau (facultatif, ajouter de la difficulté)
    if (squareSize > minSquareSize) {
        squareSize -= 2;
    }

    square.style.width = `${squareSize}px`;
    square.style.height = `${squareSize}px`;
}

// Fonction pour arrêter le jeu
function endGame() {
    clearInterval(timerId); // Arrête le timer
    alert(`Game Over! Final Score: ${score}, Level Reached: ${level}`);
    square.style.display = 'none'; // Masquer le carré à la fin du jeu
}

// Démarrer le jeu et le minuteur
moveSquare();
startTimer();
