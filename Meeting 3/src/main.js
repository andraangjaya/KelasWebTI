document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    if (!menuToggle || !mobileMenu) {
        console.error('menuToggle or mobileMenu not found');
        return;
    }

    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
});
