let currentScore, Scores, currentPlayer, Playing;
const player0elememt = document.querySelector('.player--0');
const player1elememt = document.querySelector('.player--1');
const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const current0 = document.getElementById('current--0');
const current1 = document.getElementById('current--1');
const dice = document.querySelector('.dice');
const newgame = document.querySelector('.btn--new');
const roll = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');

function initial() {
    currentScore = 0;
    Scores = [0, 0];
    currentPlayer = 0;
    Playing = true;
    score0.textContent = 0;
    score1.textContent = 0;
    current0.textContent = 0;
    current1.textContent = 0;
    dice.classList.add('hidden');
    player0elememt.classList.remove('player--winner');
    player1elememt.classList.remove('player--winner');
    player0elememt.classList.add('player--active');
    player1elememt.classList.remove('player--active');
}
initial();
const switchPlayer = function () {
    document.getElementById(`current--${currentPlayer}`).textContent = 0;
    currentScore = 0;
    currentPlayer = currentPlayer === 0 ? 1 : 0;
    player0elememt.classList.toggle('player--active');
    player1elememt.classList.toggle('player--active');
};
newgame.addEventListener("click", initial);
hold.addEventListener("click", function () {
    if (Playing) {
        Scores[currentPlayer] += currentScore;
        document.getElementById(`score--${currentPlayer}`).textContent = Scores[currentPlayer];
        if (Scores[currentPlayer] >= 100) {
            Playing = false;
            dice.classList.add('hidden');
            document.querySelector(`.player--${currentPlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${currentPlayer}`).classList.remove('player--active');
        }
        else {
            switchPlayer();
        }
    }
})
roll.addEventListener("click", function () {
    if (Playing) {
        const diceValue = Math.trunc(Math.random() * 6) + 1;
        dice.classList.remove('hidden');
        dice.src = `dice-${diceValue}.png`;
        if (diceValue !== 1) {
            currentScore += diceValue;
            document.getElementById(`current--${currentPlayer}`).textContent = currentScore;
        } else {
            switchPlayer();
        }
    }
})