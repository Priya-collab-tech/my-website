document.addEventListener('DOMContentLoaded', () => {

    const confettiColors = ['#ff00ff', '#ff33cc', '#00ffff', '#f1c40f', '#9400d3']; // Neon theme

    // --- Birthday Countdown ---
    const countdownElement = document.getElementById('countdown');
    const currentYear = new Date().getFullYear();
    // !!! IMPORTANT: CHANGE THIS DATE to your boyfriend's birthday !!!
    const birthdayDate = new Date(`May 16, ${currentYear} 00:00:00`).getTime();
    let countdownInterval;

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = birthdayDate - now;

        if (distance < 0) {
            const today = new Date();
            const birthDateThisYear = new Date(birthdayDate);
            if (today.getDate() === birthDateThisYear.getDate() &&
                today.getMonth() === birthDateThisYear.getMonth() &&
                today.getFullYear() === birthDateThisYear.getFullYear()) {
                 countdownElement.innerHTML = "🎉 It's YOUR Neon Day! 🎉";
                 if (typeof confetti === 'function') {
                    // Big neon confetti burst for birthday
                    const duration = 5 * 1000; // 5 seconds
                    const animationEnd = Date.now() + duration;
                    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 10001, colors: confettiColors, shapes: ['circle', 'square', 'heart'] };

                    function randomInRange(min, max) { return Math.random() * (max - min) + min; }

                    const interval = setInterval(function() {
                        const timeLeft = animationEnd - Date.now();
                        if (timeLeft <= 0) return clearInterval(interval);

                        const particleCount = 50 * (timeLeft / duration);
                        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
                        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
                    }, 250);
                 }
            } else {
                countdownElement.innerHTML = "Hope you had an EPIC birthday! 💖";
            }
            clearInterval(countdownInterval);
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `Neon Party: ${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    if (countdownElement) {
        const now = new Date().getTime();
        if (birthdayDate >= now || (new Date(birthdayDate).toDateString() === new Date().toDateString())) {
            updateCountdown();
            countdownInterval = setInterval(updateCountdown, 1000);
        } else {
            updateCountdown();
        }
    }

    // --- Surprise Modal ---
    const revealBtn = document.getElementById('revealSurpriseBtn');
    const modalOverlay = document.getElementById('surpriseModalOverlay');
    const closeModalBtn = document.getElementById('closeSurpriseModalBtn');

    if (revealBtn && modalOverlay && closeModalBtn) {
        // Replace button text with cake emoji
        revealBtn.innerHTML = '🎂';
        revealBtn.style.fontSize = '2.5rem';
        revealBtn.style.padding = '15px 30px';

        revealBtn.addEventListener('click', () => {
            modalOverlay.classList.add('active');
            revealBtn.style.display = 'none';

            // Create cake with candles and birthday message
            const modalContent = modalOverlay.querySelector('.surprise-modal-content');
            modalContent.innerHTML = `
                <div class="birthday-message">Happy Birthday! 🎉</div>
                <div class="cake-container">
                    <div class="cake"></div>
                    <div class="candle"></div>
                    <div class="candle"></div>
                    <div class="candle"></div>
                </div>
                <div class="surprise-text">Wishing you a day filled with happiness and joy! 💖</div>
            `;

            // Add confetti effect
            if (typeof confetti === 'function') {
                const rect = modalContent.getBoundingClientRect();
                const x = (rect.left + rect.right) / 2 / window.innerWidth;
                const y = (rect.top + rect.bottom) / 2 / window.innerHeight;

                // Center burst
                confetti({
                    particleCount: 150,
                    spread: 90,
                    origin: { x: x, y: y - 0.1 },
                    colors: confettiColors,
                    shapes: ['heart', 'star'],
                    scalar: 1.2
                });

                // Left burst
                setTimeout(() => confetti({
                    particleCount: 70,
                    angle: 60,
                    spread: 70,
                    origin: { x: 0, y: y },
                    colors: confettiColors,
                    shapes: ['heart']
                }), 200);

                // Right burst
                setTimeout(() => confetti({
                    particleCount: 70,
                    angle: 120,
                    spread: 70,
                    origin: { x: 1, y: y },
                    colors: confettiColors,
                    shapes: ['heart']
                }), 200);
            }
        });

        closeModalBtn.addEventListener('click', () => {
            modalOverlay.classList.remove('active');
        });

        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.classList.remove('active');
            }
        });
    }

    // --- Scroll Animations for content sections & reasons list ---
    const sections = document.querySelectorAll('.content-section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // For staggered animation in reasons list
                if (entry.target.id === 'why-youre-awesome') {
                    const listItems = entry.target.querySelectorAll('ul li');
                    listItems.forEach((li, index) => {
                        li.style.transitionDelay = `${index * 0.15}s`; // Apply staggered delay
                    });
                }
                // observer.unobserve(entry.target); // Uncomment to animate only once
            } else {
                // entry.target.classList.remove('visible'); // Uncomment to re-animate on scroll out/in
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // --- Smooth scroll for scroll-down indicator ---
    const scrollIndicator = document.querySelector('.scroll-down-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', (e) => {
            e.preventDefault();
            const firstSection = document.querySelector('main section:first-of-type');
            if (firstSection) {
                firstSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

    // --- Add small hearts next to H2 titles ---
    document.querySelectorAll('.content-section h2').forEach(h2 => {
        h2.innerHTML = `<span class="heart-icon">💖</span> ${h2.innerHTML} <span class="heart-icon">💖</span>`;
    });

    // --- Floating Heart Particles ---
    const heartContainer = document.getElementById('heart-particle-container');
    function createHeartParticle() {
        if (!heartContainer) return;
        const heart = document.createElement('div');
        heart.classList.add('heart-particle');
        heart.innerHTML = ['❤️', '💖', '💕', '💗'][Math.floor(Math.random() * 4)];
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.fontSize = `${0.8 + Math.random() * 1}rem`; // Random size
        heart.style.animationDuration = `${3 + Math.random() * 4}s`; // Random duration
        heart.style.opacity = `${0.5 + Math.random() * 0.5}`;

        // Start from bottom
        heart.style.bottom = `-${Math.random() * 10 + 5}vh`; // Start slightly below screen
        heart.style.animationName = 'floatUpFadeOut'; // Ensure this matches CSS

        heartContainer.appendChild(heart);

        // Remove heart after animation to prevent too many DOM elements
        setTimeout(() => {
            heart.remove();
        }, parseFloat(heart.style.animationDuration) * 1000 + 500); // Add buffer
    }

    // Create a few hearts initially and then periodically
    for(let i=0; i<5; i++) { setTimeout(createHeartParticle, Math.random() * 1000); }
    setInterval(createHeartParticle, 1500); // Create a new heart every 1.5 seconds

    // --- Gallery Image Heart Overlay ---
    document.querySelectorAll('.photo-item').forEach(item => {
        const heartOverlay = document.createElement('span');
        heartOverlay.classList.add('overlay-heart');
        heartOverlay.innerHTML = '💖';
        item.appendChild(heartOverlay);
    });

    // Gallery Functionality
    const photoGrid = document.querySelector('.photo-grid');
    const photoItems = document.querySelectorAll('.photo-item');
    const popup = document.getElementById('imagePopup');
    const popupImg = popup.querySelector('img');
    const closeBtn = popup.querySelector('.popup-close-btn');
    const popupPrevBtn = popup.querySelector('.popup-prev');
    const popupNextBtn = popup.querySelector('.popup-next');
    let currentIndex = 0;
    let isAnimating = false;

    // Initialize gallery
    function initGallery() {
        setupEventListeners();
    }

    // Setup event listeners
    function setupEventListeners() {
        // Photo click events
        photoItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                currentIndex = index;
                showPopupImage(index);
            });
        });

        // Popup close button
        closeBtn.addEventListener('click', () => {
            popup.classList.remove('active');
            document.body.style.overflow = '';
        });

        // Close popup when clicking outside
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                popup.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Popup navigation
        popupPrevBtn.addEventListener('click', () => {
            if (isAnimating) return;
            currentIndex = (currentIndex - 1 + photoItems.length) % photoItems.length;
            showPopupImage(currentIndex);
        });

        popupNextBtn.addEventListener('click', () => {
            if (isAnimating) return;
            currentIndex = (currentIndex + 1) % photoItems.length;
            showPopupImage(currentIndex);
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (popup.classList.contains('active')) {
                if (e.key === 'ArrowLeft') {
                    popupPrevBtn.click();
                } else if (e.key === 'ArrowRight') {
                    popupNextBtn.click();
                } else if (e.key === 'Escape') {
                    closeBtn.click();
                }
            }
        });
    }

    // Show popup image
    function showPopupImage(index) {
        if (isAnimating) return;
        isAnimating = true;

        // Add loading state
        popup.classList.add('active');
        popupImg.parentElement.classList.add('loading');
        document.body.style.overflow = 'hidden';
        
        // Load image
        const imgSrc = photoItems[index].querySelector('img').src;
        const newImg = new Image();
        newImg.onload = () => {
            popupImg.src = imgSrc;
            popupImg.parentElement.classList.remove('loading');
            
            // Add slide animation
            popupImg.classList.remove('slide-left', 'slide-right');
            void popupImg.offsetWidth; // Force reflow
            popupImg.classList.add('slide-right');
            
            setTimeout(() => {
                isAnimating = false;
                popupImg.classList.remove('slide-right');
            }, 500);
        };
        newImg.src = imgSrc;
    }

    // Initialize gallery when DOM is loaded
    initGallery();

    // Surprise Animation Functionality
    function createSurpriseAnimation() {
        // Create container for surprise elements
        const container = document.createElement('div');
        container.className = 'surprise-container';
        document.body.appendChild(container);

        // Create cakes and balloons
        for (let i = 0; i < 15; i++) {
            // Create cake
            const cake = document.createElement('div');
            cake.className = `cake cake-${Math.random() < 0.5 ? '1' : '2'}`;
            cake.style.left = `${Math.random() * 100}%`;
            cake.style.animationDelay = `${Math.random() * 2}s`;
            container.appendChild(cake);

            // Create balloon
            const balloon = document.createElement('div');
            balloon.className = `balloon balloon-${Math.random() < 0.5 ? '1' : '2'}`;
            balloon.style.left = `${Math.random() * 100}%`;
            balloon.style.animationDelay = `${Math.random() * 2}s`;
            container.appendChild(balloon);
        }

        // Remove container after animation
        setTimeout(() => {
            container.remove();
        }, 6000);
    }

});