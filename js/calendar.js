(function() {
    var grid = document.getElementById('calendarGrid');
    if (!grid) return;
    
    var days = ['Пн','Вт','Ср','Чт','Пт','Сб','Вс'];
    days.forEach(function(d) {
        var h = document.createElement('div');
        h.className = 'day-header';
        h.textContent = d;
        grid.appendChild(h);
    });
    
    for (var i = 0; i < 2; i++) {
        var e = document.createElement('div');
        e.className = 'day other-month';
        grid.appendChild(e);
    }
    
    for (var d = 1; d <= 31; d++) {
        var c = document.createElement('div');
        c.className = 'day';
        if (d === 24) {
            c.classList.add('wedding-day');
            c.textContent = '24';
        } else {
            c.textContent = d;
        }
        grid.appendChild(c);
    }
})();