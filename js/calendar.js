(function(){
    const grid=document.getElementById('calendarGrid');
    ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'].forEach(d=>{
        const h=document.createElement('div');
        h.className='day-header';
        h.textContent=d;
        grid.appendChild(h);
    });
    for(let i=0;i<2;i++){
        const e=document.createElement('div');
        e.className='day other-month';
        grid.appendChild(e);
    }
    for(let d=1;d<=31;d++){
        const c=document.createElement('div');
        c.className='day';
        c.textContent=d;
        if(d===24){
            c.classList.add('wedding-day');
            c.innerHTML='24 <span style="font-size:0.5rem;display:block;">♥</span>';
        }
        grid.appendChild(c);
    }
})();