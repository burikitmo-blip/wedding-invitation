(function() {
    var playground = document.getElementById('dicePlayground');
    var dice1 = document.getElementById('dice1');
    var dice2 = document.getElementById('dice2');
    if (!playground || !dice1 || !dice2) return;
    
    var emojis = ['⚀','⚁','⚂','⚃','⚄','⚅'];
    
    function getRandomPosition(die) {
        var pw = playground.clientWidth;
        var ph = playground.clientHeight;
        var dw = die.clientWidth;
        var dh = die.clientHeight;
        return {
            x: Math.random() * (pw - dw - 20) + 10,
            y: Math.random() * (ph - dh - 20) + 10
        };
    }
    
    function rollDice(die) {
        if (die.classList.contains('rolling')) return;
        die.classList.add('rolling');
        var pos = getRandomPosition(die);
        die.style.left = pos.x + 'px';
        die.style.top = pos.y + 'px';
        die.textContent = emojis[Math.floor(Math.random() * 6)];
        setTimeout(function() { die.classList.remove('rolling'); }, 800);
    }
    
    dice1.addEventListener('click', function() { rollDice(dice1); });
    dice2.addEventListener('click', function() { rollDice(dice2); });
    
    dice1.style.left = '30px';
    dice1.style.top = '80px';
    dice2.style.left = (playground.clientWidth - 90) + 'px';
    dice2.style.top = '80px';
    
    window.addEventListener('devicemotion', function(e) {
        var acc = e.accelerationIncludingGravity;
        if (acc && (Math.abs(acc.x) > 15 || Math.abs(acc.y) > 15 || Math.abs(acc.z) > 15)) {
            rollDice(dice1);
            rollDice(dice2);
        }
    });
})();