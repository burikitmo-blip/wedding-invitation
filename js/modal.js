function openModal(){
    document.getElementById('dressModal').classList.add('active');
    document.body.style.overflow='hidden';
}
function closeModal(){
    document.getElementById('dressModal').classList.remove('active');
    document.body.style.overflow='';
}
document.getElementById('dressModal').addEventListener('click',function(e){
    if(e.target===this)closeModal();
});