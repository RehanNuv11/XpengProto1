// ========== GENERATE PLACEHOLDER IMAGES ========== 
function generatePlaceholderImage(width, height, text, bgColor = '#d4d4d8', textColor = '#fff') {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    
    // Background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);
    
    // Text
    ctx.fillStyle = textColor;
    ctx.font = `bold ${Math.min(width, height) * 0.08}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, width / 2, height / 2);
    
    return canvas.toDataURL();
}

// ========== NAVBAR SCROLL EFFECT ========== 
function handleNavbarScroll() {
    const navbar = document.getElementById('navbar');
    
    if (!navbar) return;
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        
        // Add scrolled class when scrolling down
        if (scrollPosition > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ========== MOBILE MENU TOGGLE ========== 
function handleMobileMenu() {
    const navbarToggle = document.getElementById('navbarToggle');
    const navbarMenu = document.getElementById('navbarMenu');
    
    if (!navbarToggle || !navbarMenu) return;
    
    navbarToggle.addEventListener('click', () => {
        navbarMenu.classList.toggle('active');
        navbarToggle.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    const menuLinks = navbarMenu.querySelectorAll('a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbarMenu.classList.remove('active');
            navbarToggle.classList.remove('active');
        });
    });

    // Handle dropdown menu clicks for model switching
    const dropdownLinks = document.querySelectorAll('.navbar-dropdown-menu a[data-model]');
    dropdownLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const model = link.getAttribute('data-model');
            // Scroll to models section
            document.getElementById('models')?.scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// ========== MODEL CARDS VIDEO HOVER ========== 
function handleModelCards() {
    const modelCards = document.querySelectorAll('.model-card');
    
    modelCards.forEach(card => {
        const video = card.querySelector('.model-video');
        const modelType = card.getAttribute('data-model');
        
        // Add click handler for both X9 and G6 cards
        if (modelType === 'x9' || modelType === 'g6') {
            card.addEventListener('click', (e) => {
                // Don't navigate if clicking the arrow link
                if (!e.target.closest('.model-card-link')) {
                    const modelParam = modelType === 'x9' ? 'x9' : 'G6';
                    window.location.href = `models/?model=${modelParam}`;
                }
            });
            card.style.cursor = 'pointer';
        }
        
        card.addEventListener('mouseenter', () => {
            if (video) {
                video.play();
            }
        });
        
        card.addEventListener('mouseleave', () => {
            if (video) {
                video.pause();
                video.currentTime = 0;
            }
        });
    });
}

// ========== INITIALIZE ========== 
document.addEventListener('DOMContentLoaded', () => {
    // Initialize navbar scroll effect and mobile menu
    handleNavbarScroll();
    handleMobileMenu();
    handleModelCards();

    // ========== SMOOTH SCROLL TO SECTIONS ========== 
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    // ========== BUTTON CLICK HANDLERS ========== 
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });

    // ========== INTERSECTION OBSERVER FOR ANIMATIONS ========== 
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // ========== TOUCH SUPPORT FOR MOBILE ========== 
    if (carouselWrapper) {
        carouselWrapper.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
        }, false);

        carouselWrapper.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            const swipeDistance = touchStartX - touchEndX;
            const minSwipeDistance = 50;

            if (Math.abs(swipeDistance) > minSwipeDistance) {
                if (swipeDistance > 0) {
                    // Swiped left - next model
                    currentIndex = (currentIndex + 1) % models.length;
                } else {
                    // Swiped right - prev model
                    currentIndex = (currentIndex - 1 + models.length) % models.length;
                }
                switchModel(models[currentIndex]);
            }
        }, false);
    }

    // Observe sections for fade-in animations
    document.querySelectorAll('.model-carousel-section, .about, .gallery, .cta-section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // ========== GENERATE GALLERY PLACEHOLDER IMAGES ========== 
    const galleryItems = [
        { id: 'gal1', text: 'CONTROLS', color: '#1a1a2e' },
        { id: 'gal2', text: 'JOURNEY', color: '#0066ff' },
        { id: 'gal3', text: 'INTERIOR', color: '#16a34a' },
        { id: 'gal4', text: 'DRIVE', color: '#d4a52a' },
        { id: 'gal5', text: 'DESIGN', color: '#8b5cf6' },
        { id: 'gal6', text: 'MOBILITY', color: '#ec4899' }
    ];
    
    galleryItems.forEach(item => {
        const galElement = document.getElementById(item.id);
        if (galElement) {
            const img = galElement.querySelector('.gallery-img');
            if (img) {
                img.src = generatePlaceholderImage(500, 350, item.text, item.color);
            }
        }
    });

    // ========== GENERATE ABOUT CARD IMAGES ========== 
    const aboutCards = [
        { selector: '#card1', text: 'INNOVATION', color: '#1a1a2e' },
        { selector: '#card2', text: 'SUSTAINABILITY', color: '#16a34a' },
        { selector: '#card3', text: 'TECHNOLOGY', color: '#0066ff' }
    ];
    
    aboutCards.forEach(card => {
        const element = document.querySelector(card.selector);
        if (element) {
            const img = element.querySelector('.about-img');
            if (img) {
                img.src = generatePlaceholderImage(500, 300, card.text, card.color);
            }
        }
    });

    // Generate gallery items
    const galleryData = [
        { title: 'Advanced Controls', text: 'CONTROLS', color: '#1e40af' },
        { title: 'Scenic Journeys', text: 'JOURNEYS', color: '#059669' },
        { title: 'Smart Interior', text: 'INTERIOR', color: '#d97706' },
        { title: 'Performance Drive', text: 'PERFORMANCE', color: '#dc2626' },
        { title: 'Design Detail', text: 'DESIGN', color: '#7c3aed' },
        { title: 'Urban Mobility', text: 'URBAN', color: '#0891b2' }
    ];
    
    const galleryGrid = document.getElementById('galleryGrid');
    if (galleryGrid) {
        galleryData.forEach(item => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            
            const img = document.createElement('img');
            img.className = 'gallery-img';
            img.src = generatePlaceholderImage(500, 400, item.text, item.color);
            img.alt = item.title;
            
            const overlay = document.createElement('div');
            overlay.className = 'gallery-overlay';
            overlay.innerHTML = `<h3>${item.title}</h3>`;
            
            galleryItem.appendChild(img);
            galleryItem.appendChild(overlay);
            galleryGrid.appendChild(galleryItem);
        });
    }

    // ========== PROMO VIDEO AUTO-PLAY ON SCROLL ==========
    const promoVideo = document.getElementById('promoVideo');
    if (promoVideo) {
        const promoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    promoVideo.play();
                } else {
                    promoVideo.pause();
                }
            });
        }, { threshold: 0.3 });
        promoObserver.observe(promoVideo);
    }

    console.log('XPENG Landing Page Loaded ✓');
});
