document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navDrawer = document.querySelector('.nav-drawer');
    const body = document.body;

    if (menuToggle && navDrawer) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navDrawer.classList.toggle('active');
            body.classList.toggle('drawer-active');
        });

        // Close drawer when clicking a nav link
        const navLinks = navDrawer.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navDrawer.classList.remove('active');
                body.classList.remove('drawer-active');
            });
        });

        // Close drawer when clicking outside
        document.addEventListener('click', function(e) {
            if (!navDrawer.contains(e.target) && !menuToggle.contains(e.target)) {
                menuToggle.classList.remove('active');
                navDrawer.classList.remove('active');
                body.classList.remove('drawer-active');
            }
        });
    }
});