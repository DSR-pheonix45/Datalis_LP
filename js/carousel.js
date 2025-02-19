document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.testimonial-track');
    const cards = document.querySelectorAll('.testimonial-card');
    let currentIndex = 0;

    // Clone first and last cards for infinite loop effect
    const firstCardClone = cards[0].cloneNode(true);
    const lastCardClone = cards[cards.length - 1].cloneNode(true);
    track.appendChild(firstCardClone);
    track.prepend(lastCardClone);

    // Update active card
    function updateActiveCard() {
        cards.forEach(card => card.classList.remove('active'));
        cards[currentIndex].classList.add('active');
    }

    // Move to next slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % cards.length;
        const offset = -(currentIndex + 1) * (cards[0].offsetWidth + 32); // 32px is the gap
        track.style.transform = `translateX(${offset}px)`;
        updateActiveCard();
    }

    // Move to previous slide
    function prevSlide() {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        const offset = -(currentIndex + 1) * (cards[0].offsetWidth + 32);
        track.style.transform = `translateX(${offset}px)`;
        updateActiveCard();
    }

    // Auto-advance slides
    setInterval(nextSlide, 5000);

    // Initialize first active card
    updateActiveCard();
});