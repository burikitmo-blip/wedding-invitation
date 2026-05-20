document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('rsvpForm');
    var success = document.getElementById('formSuccess');
    if (!form || !success) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        var name = document.getElementById('guestName').value.trim();
        var attendance = document.querySelector('input[name="attendance"]:checked');
        if (!name || !attendance) {
            alert('Заполните имя и отметьте присутствие.');
            return;
        }
        form.style.display = 'none';
        success.style.display = 'block';
    });
});