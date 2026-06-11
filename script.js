// Definição das cartas: cada ID tem dois itens correspondentes (A e B)
const cardsData = [
    { id: 1, icon: '💧', text: 'Desperdício de Água' },
    { id: 1, icon: '🚜', text: 'Irrigar comida que vai para o lixo gasta rios inteiros.' },
    
    { id: 2, icon: '🌍', text: 'Gases Estufa' },
    { id: 2, icon: '💨', text: 'Alimento apodrecendo no lixão gera gás metano.' },
    
    { id: 3, icon: '🌳', text: 'Desmatamento' },
    { id: 3, icon: '🪓', text: 'Florestas são derrubadas para plantar o que será jogado fora.' },
    
    { id: 4, icon: '💸', text: 'Prejuízo Econômico' },
    { id: 4, icon: '💰', text: 'O agricultor perde dinheiro e o preço dos alimentos sobe.' },
    
    { id: 5, icon: '🪱', text: 'Degradação do Solo' },
    { id: 5, icon: '🌱', text: 'O uso intenso de fertilizantes esgota a terra à toa.' },
    
    { id: 6, icon: '🍎', text: 'Consumo Consciente' },
    { id: 6, icon: '🛒', text: 'Planejar as compras ajuda a salvar o meio ambiente!' }
];

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let moves = 0;
let matches = 0;

const gameBoard = document.getElementById('game-board');
const movesDisplay = document.getElementById('moves');
const matchesDisplay = document.getElementById('matches');
const resetBtn = document.getElementById('reset-btn');

// Função para embaralhar o array (Algoritmo Fisher-Yates)
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Cria as cartas no HTML
function createBoard() {
    gameBoard.innerHTML = '';
    const shuffledCards = shuffle([...cardsData]);
    
    shuffledCards.forEach(data => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.id = data.id;

        card.innerHTML = `
            <div class="card-front">
                <span class="icon">${data.icon}</span>
                <span class="text">${data.text}</span>
            </div>
            <div class="card-back">🌱</div>
        `;
        
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

// Função para virar a carta
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        // Primeira carta clicada
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    // Segunda carta clicada
    secondCard = this;
    updateMoves();
    checkForMatch();
}

// Verifica se as duas cartas viradas formam um par
function checkForMatch() {
    let isMatch = firstCard.dataset.id === secondCard.dataset.id;
    isMatch ? disableCards() : unflipCards();
}

// Se forem iguais, desabilita o clique nelas
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    
    matches++;
    matchesDisplay.textContent = matches;
    
    resetTurn();

    if (matches === cardsData.length / 2) {
        setTimeout(() => {
            alert(`Parabéns! Você salvou o planeta com ${moves} movimentos! 🌍✨`);
        }, 500);
    }
}

// Se forem diferentes, vira de volta de forma suave
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetTurn();
    }, 1200);
}

function updateMoves() {
    moves++;
    movesDisplay.textContent = moves;
}

function resetTurn() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function resetGame() {
    moves = 0;
    matches = 0;
    movesDisplay.textContent = moves;
    matchesDisplay.textContent = matches;
    resetTurn();
    createBoard();
}

resetBtn.addEventListener('click', resetGame);

// Inicializa o jogo ao carregar a página
createBoard();
