const groomEl=document.getElementById('groomSilhouette');
const brideEl=document.getElementById('brideSilhouette');
const frisbeeDisc=document.getElementById('frisbeeDisc');
const frisbeeShadow=document.getElementById('frisbeeShadow');
const heartsContainer=document.getElementById('heartsContainer');
const frisbeeScene=document.getElementById('frisbeeScene');
let frisbeeActive=false;

function spawnHearts(x,y){
    for(let i=0;i<10;i++){
        const heart=document.createElement('div');
        heart.className='heart-particle';
        heart.textContent=['💕','💖','💗','✨','♥️','💝'][Math.floor(Math.random()*6)];
        heart.style.left=x+'px';
        heart.style.top=y+'px';
        const angle=Math.random()*Math.PI*2;
        const dist=35+Math.random()*55;
        heart.style.setProperty('--dx',Math.cos(angle)*dist+'px');
        heart.style.setProperty('--dy',Math.sin(angle)*dist-20+'px');
        heart.style.setProperty('--dx2',Math.cos(angle)*dist*0.4+'px');
        heart.style.setProperty('--dy2',Math.sin(angle)*dist*0.4-60+'px');
        heart.classList.add('active');
        heartsContainer.appendChild(heart);
        setTimeout(()=>heart.remove(),1500);
    }
}

function animateFrisbee(){
    if(frisbeeActive)return;
    frisbeeActive=true;
    const sceneRect=frisbeeScene.getBoundingClientRect();
    const startX=sceneRect.width*0.16, startY=sceneRect.height*0.35;
    const endX=sceneRect.width*0.70, endY=sceneRect.height*0.32;

    groomEl.classList.add('throwing');
    setTimeout(()=>groomEl.classList.remove('throwing'),500);

    setTimeout(()=>{
        frisbeeDisc.style.opacity='1';
        frisbeeDisc.style.left=startX+'px';
        frisbeeDisc.style.top=startY+'px';
        frisbeeDisc.style.transition='all 1s cubic-bezier(0.25, 0.1, 0.25, 1)';
        frisbeeDisc.style.left=endX+'px';
        frisbeeDisc.style.top=endY+'px';
        frisbeeDisc.style.transform='rotate(720deg)';
        frisbeeShadow.style.opacity='1';
        frisbeeShadow.style.left=startX+'px';
        frisbeeShadow.style.top=(startY+85)+'px';
        frisbeeShadow.style.transition='all 1s cubic-bezier(0.25, 0.1, 0.25, 1)';
        frisbeeShadow.style.left=endX+'px';
        frisbeeShadow.style.top=(endY+35)+'px';
        frisbeeShadow.style.width='60px';
        frisbeeShadow.style.filter='blur(8px)';
    },200);

    setTimeout(()=>{
        brideEl.classList.add('catching');
        spawnHearts(endX,endY);
        setTimeout(()=>brideEl.classList.remove('catching'),500);
    },1200);

    setTimeout(()=>{
        frisbeeDisc.style.transition='all 1s cubic-bezier(0.25, 0.1, 0.25, 1)';
        frisbeeDisc.style.left=startX+'px';
        frisbeeDisc.style.top=startY+'px';
        frisbeeDisc.style.transform='rotate(1440deg)';
        frisbeeShadow.style.transition='all 1s cubic-bezier(0.25, 0.1, 0.25, 1)';
        frisbeeShadow.style.left=startX+'px';
        frisbeeShadow.style.top=(startY+85)+'px';
        frisbeeShadow.style.width='50px';
        frisbeeShadow.style.filter='blur(5px)';
    },2400);

    setTimeout(()=>{
        groomEl.classList.add('throwing');
        spawnHearts(startX,startY);
        setTimeout(()=>groomEl.classList.remove('throwing'),500);
    },3400);

    setTimeout(()=>{
        frisbeeDisc.style.opacity='0';
        frisbeeShadow.style.opacity='0';
        frisbeeDisc.style.transition='none';
        frisbeeShadow.style.transition='none';
        frisbeeActive=false;
    },4000);
}

const frisbeeObserver=new IntersectionObserver(e=>{
    e.forEach(e=>{if(e.isIntersecting)animateFrisbee();});
},{threshold:0.5});
frisbeeObserver.observe(frisbeeScene);

setInterval(()=>{
    const rect=frisbeeScene.getBoundingClientRect();
    if(rect.top<window.innerHeight&&rect.bottom>0&&!frisbeeActive&&Math.random()<0.06)animateFrisbee();
},4000);