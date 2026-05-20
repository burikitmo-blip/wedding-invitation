const weddingDate=new Date('2026-07-24T15:00:00').getTime();
setInterval(()=>{
    const n=new Date().getTime(),d=weddingDate-n;
    if(d<0){
        ['days','hours','minutes','seconds'].forEach(id=>document.getElementById(id).textContent='00');
        return;
    }
    document.getElementById('days').textContent=String(Math.floor(d/86400000)).padStart(2,'0');
    document.getElementById('hours').textContent=String(Math.floor((d%86400000)/3600000)).padStart(2,'0');
    document.getElementById('minutes').textContent=String(Math.floor((d%3600000)/60000)).padStart(2,'0');
    document.getElementById('seconds').textContent=String(Math.floor((d%60000)/1000)).padStart(2,'0');
},1000);