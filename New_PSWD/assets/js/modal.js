// eslint-disable-next-line no-unused-vars
function openDCModal() {
    const modal = document.getElementById('dc-modal');
    modal.style.display = 'flex';
}

function closeDCModal() {
    const modal = document.getElementById('dc-modal');
    modal.style.display = 'none';
}

// Close modal when clicking outside
window.addEventListener('click', function (event) {
    const modal = document.getElementById('dc-modal');
    if (event.target === modal) {
        closeDCModal();
    }
});

// Close modal with Escape key
window.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        const modal = document.getElementById('dc-modal');
        if (modal.style.display === 'flex') {
            closeDCModal();
        }
    }
});
