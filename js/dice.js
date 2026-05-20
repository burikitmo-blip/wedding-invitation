const emojis=['⚀','⚁','⚂','⚃','⚄','⚅'];
const playground=document.getElementById('dicePlayground');

function getRandomPosition(die){
    const pw=playground.clientWidth,ph=playground.clientHeight,dw=die.clientWidth,dh=die.clientHeight;
    return {x:Math.random()*(pw-dw-20)+10,y:Math.random()*(ph-dh-20)+10};
}

function rollDice(die){
    if(die.classList.contains('rolling'))return;
    die.classList.add('rolling');
    const pos=getRandomPosition(die);
    die.style.left=pos.x+'px';
    die.style.top=pos.y+'px';
    die.textContent=emojis[Math.floor(Math.random()*6)];
    setTimeout(()=>die.classList.remove('rolling'),800);
}

document.getElementById('dice1').addEventListener('click',function(){rollDice(this);});
document.getElementById('dice2').addEventListener('click',function(){rollDice(this);});

(function initDice(){
    const d1=document.getElementById('dice1'),d2=document.getElementById('dice2');
    d1.style.left='30px';d1.style.top='80px';
    d2.style.left=(playground.clientWidth-90)+'px';d2.style.top='80px';
})();

window.addEventListener('devicemotion',function(e){
    const acc=e.accelerationIncludingGravity;
    if(acc&&(Math.abs(acc.x)>15||Math.abs(acc.y)>15||Math.abs(acc.z)>15)){
        rollDice(document.getElementById('dice1'));
        rollDice(document.getElementById('dice2'));
    }
});