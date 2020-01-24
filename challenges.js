
var scores, roundScore, activePlayer, gamePlaying, prevRoll;

init();

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (gamePlaying) {
        //Random Dice number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        //Display Result
        var dice1DOM = document.getElementById('dice-1');
        var dice2DOM = document.getElementById('dice-2');
        dice1DOM.style.display = 'block';
        dice2DOM.style.display = 'block';
        dice1DOM.src = 'dice-' + dice1 + '.png';
        dice2DOM.src = 'dice-' + dice2 + '.png';
        //Update Scores
        // if (prevRoll === 6 && dice === 6) {
        //     scores[activePlayer] = 0;
        //     document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        //     //console.log('You\'ve Rolled 6 twice in a ROW!!');
        //     nextPlayer();
        // }
        console.log(dice1, dice2);
        if ((dice1 === 1 && dice2 !== 1) || (dice1 === 6 && dice2 === 6)) {
            nextPlayer();
        }
        else if ((dice1 !== 1 && dice2 === 1) || (dice1 === 6 && dice2 === 6)) {
            nextPlayer();
        }
        else {
            roundScore += dice1 + dice2;
            document.getElementById('current-' + activePlayer).textContent = roundScore;
        }
        //console.log('You\'ve Rolled a ONE!!')
        //console.log(dice1, dice2);
        //prevRoll = dice
    }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        scores[activePlayer] += roundScore;

        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector('.final-score').value;
        var limit;
        //undefined, null, 0, "" are COERCED to false(FALSY)
        //Anything else are COERCED to true(TRUTHY)
        if (input !== 'Final Score') {
            limit = input;
        }
        else {
            limit = 100;
        }

        if (scores[activePlayer] >= limit) {
            document.getElementById('name-' + activePlayer).textContent = 'Winner!!';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        }
        else {
            nextPlayer();
        }
    }
});

function nextPlayer() {
    roundScore = 0;
    document.getElementById('current-' + activePlayer).textContent = roundScore;
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.final-score').value = 'Final Score';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');
}

