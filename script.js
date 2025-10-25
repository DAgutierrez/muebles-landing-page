// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a nav link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Navbar background on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Gallery modal functionality
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Create modal elements
    const modal = document.createElement('div');
    modal.className = 'gallery-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            <img class="modal-image" src="" alt="">
            <div class="modal-info">
                <h3 class="modal-title"></h3>
                <p class="modal-description"></p>
            </div>
            <div class="modal-nav">
                <button class="modal-prev">❮</button>
                <button class="modal-next">❯</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    // Modal styles
    const modalStyles = `
        .gallery-modal {
            display: none;
            position: fixed;
            z-index: 2000;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            animation: fadeIn 0.3s ease;
        }
        
        .modal-content {
            position: relative;
            margin: auto;
            padding: 20px;
            width: 90%;
            max-width: 800px;
            top: 50%;
            transform: translateY(-50%);
            text-align: center;
        }
        
        .modal-image {
            max-width: 100%;
            max-height: 70vh;
            border-radius: 10px;
            margin-bottom: 20px;
        }
        
        .modal-info {
            color: white;
            margin-bottom: 20px;
        }
        
        .modal-title {
            font-size: 1.5rem;
            margin-bottom: 10px;
        }
        
        .modal-description {
            font-size: 1rem;
            opacity: 0.8;
        }
        
        .modal-close {
            position: absolute;
            top: 10px;
            right: 25px;
            color: white;
            font-size: 35px;
            font-weight: bold;
            cursor: pointer;
            transition: color 0.3s ease;
        }
        
        .modal-close:hover {
            color: #8B4513;
        }
        
        .modal-nav {
            display: flex;
            justify-content: space-between;
            position: absolute;
            top: 50%;
            width: 100%;
            left: 0;
            padding: 0 20px;
            transform: translateY(-50%);
        }
        
        .modal-prev, .modal-next {
            background: rgba(139, 69, 19, 0.8);
            color: white;
            border: none;
            padding: 10px 15px;
            cursor: pointer;
            border-radius: 50%;
            font-size: 18px;
            transition: all 0.3s ease;
        }
        
        .modal-prev:hover, .modal-next:hover {
            background: #8B4513;
            transform: scale(1.1);
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    
    // Add modal styles to head
    const styleSheet = document.createElement('style');
    styleSheet.textContent = modalStyles;
    document.head.appendChild(styleSheet);
    
    let currentImageIndex = 0;
    
    // Gallery item click handlers
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            currentImageIndex = index;
            openModal(index);
        });
    });
    
    function openModal(index) {
        const item = galleryItems[index];
        const img = item.querySelector('img');
        const overlay = item.querySelector('.gallery-overlay');
        const title = overlay.querySelector('h4').textContent;
        const description = overlay.querySelector('p').textContent;
        
        document.querySelector('.modal-image').src = img.src;
        document.querySelector('.modal-title').textContent = title;
        document.querySelector('.modal-description').textContent = description;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    // Modal event listeners
    document.querySelector('.modal-close').addEventListener('click', closeModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    document.querySelector('.modal-prev').addEventListener('click', function() {
        currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
        openModal(currentImageIndex);
    });
    
    document.querySelector('.modal-next').addEventListener('click', function() {
        currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
        openModal(currentImageIndex);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (modal.style.display === 'block') {
            if (e.key === 'Escape') {
                closeModal();
            } else if (e.key === 'ArrowLeft') {
                currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
                openModal(currentImageIndex);
            } else if (e.key === 'ArrowRight') {
                currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
                openModal(currentImageIndex);
            }
        }
    });
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const nombre = formData.get('nombre');
        const email = formData.get('email');
        const telefono = formData.get('telefono');
        const servicio = formData.get('servicio');
        const mensaje = formData.get('mensaje');
        
        // Create WhatsApp message
        const whatsappMessage = `Hola, soy ${nombre}.%0A%0A` +
            `Email: ${email}%0A` +
            `Teléfono: ${telefono}%0A` +
            `Servicio de interés: ${servicio}%0A%0A` +
            `Mensaje: ${mensaje}`;
        
        // Open WhatsApp with the message
        const whatsappURL = `https://wa.me/1234567890?text=${whatsappMessage}`;
        window.open(whatsappURL, '_blank');
        
        // Show success message
        showNotification('¡Mensaje enviado! Te redirigimos a WhatsApp.', 'success');
        
        // Reset form
        contactForm.reset();
    });
    
    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Notification styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#28a745' : '#8B4513'};
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 1001;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 5000);
    }
    
    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.service-card, .gallery-item, .contact-item').forEach(el => {
        observer.observe(el);
    });
    
    // Counter animation for stats (if you want to add stats section)
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            element.textContent = Math.floor(current);
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 50);
    }
    
    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero-image img');
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });
    
    // Smooth reveal animations on scroll
    const revealElements = document.querySelectorAll('.service-card, .gallery-item, .contact-item');
    
    function reveal() {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', reveal);
    reveal(); // Check on load
    
    // Add loading animation
    window.addEventListener('load', function() {
        const loader = document.createElement('div');
        loader.className = 'page-loader';
        loader.innerHTML = '<div class="loader-spinner"></div>';
        
        const loaderStyles = `
            .page-loader {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: white;
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 9999;
                opacity: 1;
                transition: opacity 0.5s ease;
            }
            
            .loader-spinner {
                width: 50px;
                height: 50px;
                border: 3px solid #f3f3f3;
                border-top: 3px solid #8B4513;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        
        const loaderStyleSheet = document.createElement('style');
        loaderStyleSheet.textContent = loaderStyles;
        document.head.appendChild(loaderStyleSheet);
        
        // Remove loader after everything is loaded
        setTimeout(() => {
            if (document.querySelector('.page-loader')) {
                document.querySelector('.page-loader').style.opacity = '0';
                setTimeout(() => {
                    const loaderElement = document.querySelector('.page-loader');
                    if (loaderElement) {
                        loaderElement.remove();
                    }
                }, 500);
            }
        }, 1000);
    });
    
});

// Service worker for offline functionality (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(error) {
                console.log('ServiceWorker registration failed');
            });
    });
}
