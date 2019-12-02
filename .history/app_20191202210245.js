/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;

init();

// Document の querySelector() メソッドは、指定されたセレクターまたはセレクターのグループに一致する、文書内の最初の Element を返します。一致するものが見つからない場合は null を返します。
// addEventListener()は、3つの引数を取ります。基本的な動作は、第1引数に指定したイベントが発生した際に、第2引数で指定した関数が実行されます。第1引数は、イベントのタイプを指定します。例えば、クリックイベントであれば click となりますが、イベントハンドラとは名称が異なる部分があるので注意が必要です。第2引数は、イベントが発生した際に実行する関数を指定します。イベントリスナとも呼ばれます。第3引数は、キャプチャリングフェーズもしくはバブリングフェーズのどちらで実行するかを真偽値で指定します。初期値は false で、バブリングフェーズで実行されます。省略した場合は、falseと見なされます。
document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        // 1. Random number,Math.floor() メソッドは、引数として与えた数以下の最大の整数を返します。
        var dice = Math.floor(Math.random() * 6) + 1;

        //2. Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';


        //3. Update the round score IF the rolled number was NOT a 1
        if (dice !== 1) {
            //Add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            //Next player
            nextPlayer();
        }
    }
});


document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Check if player won the game
        if (scores[activePlayer] >= 100) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        } else {
            //Next player
            nextPlayer();
        }
    }
});

function nextPlayer() {
    //Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    // Document の getElementById() メソッドは、 id プロパティが指定された文字列に一致する要素を表す Element オブジェクトを返します。要素の ID は指定されていれば固有であることが求められているため、特定の要素にすばやくアクセスするには便利な方法です。
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;
    
    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}