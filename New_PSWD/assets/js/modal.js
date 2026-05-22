function openDCModal() {
    const modal = document.getElementById('dc-modal');
    if (!modal) return;
    modal.classList.remove('js-hidden');
}

function closeDCModal() {
    const modal = document.getElementById('dc-modal');
    if (!modal) return;
    modal.classList.add('js-hidden');
}

document.addEventListener('DOMContentLoaded', function () {
    const closeBtn = document.querySelector('#dc-modal .close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeDCModal);
    }
});

window.addEventListener('click', function (event) {
    const modal = document.getElementById('dc-modal');
    if (modal && event.target === modal) {
        closeDCModal();
    }
});

window.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        const modal = document.getElementById('dc-modal');
        if (modal && !modal.classList.contains('js-hidden')) {
            closeDCModal();
        }
    }
});
