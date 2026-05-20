document.getElementById('rsvpForm').addEventListener('submit',function(e){
    e.preventDefault();
    const n=document.getElementById('guestName').value.trim();
    const a=document.querySelector('input[name="attendance"]:checked');
    if(!n||!a){
        alert('Заполните имя и отметьте присутствие.');
        return;
    }
    document.getElementById('rsvpForm').style.display='none';
    document.getElementById('formSuccess').style.display='block';
});