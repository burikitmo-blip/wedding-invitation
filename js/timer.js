(function() {
    var weddingDate = new Date('2026-07-24T15:00:00').getTime();
    var daysEl = document.getElementById('days');
    var hoursEl = document.getElementById('hours');
    var minutesEl = document.getElementById('minutes');
    var secondsEl = document.getElementById('seconds');
    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;
    
    setInterval(function() {
        var now = new Date().getTime();
        var distance = weddingDate - now;
        if (distance < 0) {
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            return;
        }
        daysEl.textContent = String(Math.floor(distance / 86400000)).padStart(2, '0');
        hoursEl.textContent = String(Math.floor((distance % 86400000) / 3600000)).padStart(2, '0');
        minutesEl.textContent = String(Math.floor((distance % 3600000) / 60000)).padStart(2, '0');
        secondsEl.textContent = String(Math.floor((distance % 60000) / 1000)).padStart(2, '0');
    }, 1000);
})();