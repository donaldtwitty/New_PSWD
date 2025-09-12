function openDCModal() {
    document.getElementById('dc-modal').classList.add('show');
}

function closeDCModal() {
    document.getElementById('dc-modal').classList.remove('show');
}

window.onclick = function(event) {
    const modal = document.getElementById('dc-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}