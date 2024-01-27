let score = 20, highscore = 0;
let numberGenerated = Math.trunc((Math.random() * 20)) + 1;
let finalnumber = document.querySelector(".number");
let message = document.querySelector('.message');
let scoreelement = document.querySelector('.score');
let highscoreelement = document.querySelector('.highscore');
document.querySelector('.check').addEventListener("click", function () {
    let guess = Number(document.querySelector('.guess').value);
    if (!guess) {
        message.textContent = "Please enter a Number"
    }
    else if (guess !== numberGenerated) {
        if (score > 1) {
            guess > numberGenerated ? message.textContent = "Please select a smaller number" : message.textContent = "Please select a bigger number"
            score--;
            scoreelement.textContent = score;
        }
        else {
            message.textContent = "You Lost the Game!!";
            scoreelement.textContent = 0;
        }
    }
    else if (guess === numberGenerated) {
        message.textContent = "You won ";
        document.querySelector('body').style.backgroundColor = '#60b347';
        finalnumber.style.width = '30rem';
        finalnumber.textContent = guess;
        if (score > highscore) {
            highscore = score;
            highscoreelement.textContent = highscore;
        }
    }
})
document.querySelector(".again").addEventListener("click", function () {
    document.querySelector('.guess').value = '';
    score = 20;
    numberGenerated = Math.trunc((Math.random() * 20)) + 1;
    message.textContent = "Start guessing...";
    scoreelement.textContent = score;
    document.querySelector('body').style.backgroundColor = '#222';
    finalnumber.style.width = '15rem';
    finalnumber.textContent = "?";
})