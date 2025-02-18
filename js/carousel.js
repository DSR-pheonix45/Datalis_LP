document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.testimonial-track');
    const cards = document.querySelectorAll('.testimonial-card');
    const totalCards = cards.length;

    let currentIndex = 2;
    let isTransitioning = false;

    function updateSlide(transition = true) {
        const offset = currentIndex * (100 / totalCards);
        track.style.transition = transition ? 'transform 0.5s ease' : 'none';
        track.style.transform = `translateX(-${offset}%)`;
    }

    function nextSlide() {
        if (isTransitioning) return;
        isTransitioning = true;
        currentIndex++;
        updateSlide(true);

        if (currentIndex >= totalCards - 2) {
            setTimeout(() => {
                track.style.transition = 'none';
                currentIndex = 2;
                updateSlide(false);
                isTransitioning = false;
            }, 500);
        } else {
            setTimeout(() => {
                isTransitioning = false;
            }, 500);
        }
    }

    // Initialize position
    updateSlide(false);

    // Auto-slide every 3 seconds
    setInterval(nextSlide, 3000);

    // Handle resize
    window.addEventListener('resize', () => {
        updateSlide(false);
    });
});