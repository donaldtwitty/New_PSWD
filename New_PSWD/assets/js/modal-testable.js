// Testable version of modal.js
function openDCModal() {
    const modal = document.getElementById('dc-modal');
    if (modal) {
        modal.style.display = 'flex';
    }
}

function closeDCModal() {
    const modal = document.getElementById('dc-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function handleClickOutside(event) {
    const modal = document.getElementById('dc-modal');
    if (event.target === modal) {
        closeDCModal();
    }
}

function handleEscapeKey(event) {
    if (event.key === 'Escape') {
        const modal = document.getElementById('dc-modal');
        if (modal && modal.style.display === 'flex') {
            closeDCModal();
        }
    }
}

module.exports = {
    openDCModal,
    closeDCModal,
    handleClickOutside,
    handleEscapeKey
};