/**
 * Soul Fine Dine - Main JavaScript
 * Handles interactivity and animations for the restaurant website
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initScrollEffects();
    initChatWidget();
    initTestimonialSlider();
    initFaqAccordion();
    initGalleryFilter();
    initLightbox();
    
    // Initialize form validation if the reservation form exists
    const reservationForm = document.getElementById('reservation-form');
    if (reservationForm) {
        initReservationForm(reservationForm);
    }
    
    // Initialize contact form validation if it exists
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        initContactForm(contactForm);
    }
});

/**
 * Mobile Navigation Toggle
 */
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            // Toggle navigation menu
            navLinks.classList.toggle('active');
            
            // Animate hamburger icon
            this.classList.toggle('active');
            
            // If hamburger is active, transform bars to X shape
            const bars = this.querySelectorAll('.bar');
            if (this.classList.contains('active')) {
                bars[0].style.transform = 'translateY(8px) rotate(45deg)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'translateY(-8px) rotate(-45deg)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
        
        // Close mobile menu when clicking on a link
        const navItems = navLinks.querySelectorAll('a');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('active');
                    
                    const bars = hamburger.querySelectorAll('.bar');
                    bars[0].style.transform = 'none';
                    bars[1].style.opacity = '1';
                    bars[2].style.transform = 'none';
                }
            });
        });
    }
}

/**
 * Scroll Effects
 * - Header shrink on scroll
 * - Reveal animations for sections
 */
function initScrollEffects() {
    const header = document.querySelector('header');
    const sections = document.querySelectorAll('section');
    
    // Header shrink effect
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Reveal animations for sections
    if (sections.length) {
        const revealSection = function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        };
        
        const sectionObserver = new IntersectionObserver(revealSection, {
            root: null,
            threshold: 0.15
        });
        
        sections.forEach(section => {
            section.classList.add('section-hidden');
            sectionObserver.observe(section);
        });
    }
}

/**
 * Chat Widget Functionality
 */
function initChatWidget() {
    const chatToggle = document.querySelector('.chat-toggle');
    const chatContainer = document.querySelector('.chat-container');
    const chatClose = document.querySelector('.chat-close');
    const chatInput = document.querySelector('.chat-input input');
    const chatSendBtn = document.querySelector('.chat-input button');
    const chatBody = document.querySelector('.chat-body');
    
    if (chatToggle && chatContainer) {
        // Toggle chat widget
        chatToggle.addEventListener('click', function() {
            chatContainer.classList.add('active');
            chatInput.focus();
        });
        
        // Close chat widget
        if (chatClose) {
            chatClose.addEventListener('click', function() {
                chatContainer.classList.remove('active');
            });
        }
        
        // Send message functionality
        if (chatSendBtn && chatInput && chatBody) {
            const sendMessage = function() {
                const message = chatInput.value.trim();
                if (message) {
                    // Add user message
                    const userMessage = document.createElement('div');
                    userMessage.classList.add('chat-message', 'user');
                    userMessage.innerHTML = `<p>${message}</p>`;
                    chatBody.appendChild(userMessage);
                    
                    // Clear input
                    chatInput.value = '';
                    
                    // Scroll to bottom
                    chatBody.scrollTop = chatBody.scrollHeight;
                    
                    // Simulate response after a short delay
                    setTimeout(function() {
                        const responseMessage = document.createElement('div');
                        responseMessage.classList.add('chat-message', 'system');
                        responseMessage.innerHTML = `<p>Thank you for your message. One of our staff members will respond shortly. For immediate assistance, please call us at +91 40 1234 5678.</p>`;
                        chatBody.appendChild(responseMessage);
                        
                        // Scroll to bottom again
                        chatBody.scrollTop = chatBody.scrollHeight;
                    }, 1000);
                }
            };
            
            // Send message on button click
            chatSendBtn.addEventListener('click', sendMessage);
            
            // Send message on Enter key
            chatInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    sendMessage();
                }
            });
        }
    }
}

/**
 * Testimonial Slider
 * Simple auto-rotating testimonials
 */
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial');
    
    if (testimonials.length > 1) {
        let currentIndex = 0;
        
        // Hide all testimonials except the first one
        testimonials.forEach((testimonial, index) => {
            if (index !== 0) {
                testimonial.style.display = 'none';
            }
        });
        
        // Function to show next testimonial
        const showNextTestimonial = () => {
            testimonials[currentIndex].style.opacity = '0';
            
            setTimeout(() => {
                testimonials[currentIndex].style.display = 'none';
                
                currentIndex = (currentIndex + 1) % testimonials.length;
                
                testimonials[currentIndex].style.opacity = '0';
                testimonials[currentIndex].style.display = 'block';
                
                setTimeout(() => {
                    testimonials[currentIndex].style.opacity = '1';
                }, 50);
            }, 500);
        };
        
        // Auto-rotate testimonials every 5 seconds
        setInterval(showNextTestimonial, 5000);
    }
}

/**
 * Reservation Form Validation
 */
function initReservationForm(form) {
    form.addEventListener('submit', function(e) {
        let isValid = true;
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        const dateInput = document.getElementById('date');
        const timeInput = document.getElementById('time');
        const guestsInput = document.getElementById('guests');
        
        // Reset previous error messages
        const errorMessages = form.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.remove());
        
        // Validate name
        if (!nameInput.value.trim()) {
            showError(nameInput, 'Please enter your name');
            isValid = false;
        }
        
        // Validate email
        if (!validateEmail(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate phone
        if (!phoneInput.value.trim()) {
            showError(phoneInput, 'Please enter your phone number');
            isValid = false;
        }
        
        // Validate date
        if (!dateInput.value) {
            showError(dateInput, 'Please select a date');
            isValid = false;
        } else {
            const selectedDate = new Date(dateInput.value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                showError(dateInput, 'Please select a future date');
                isValid = false;
            }
        }
        
        // Validate time
        if (!timeInput.value) {
            showError(timeInput, 'Please select a time');
            isValid = false;
        }
        
        // Validate guests
        if (!guestsInput.value || guestsInput.value < 1) {
            showError(guestsInput, 'Please enter the number of guests');
            isValid = false;
        }
        
        if (!isValid) {
            e.preventDefault();
        } else {
            // For demo purposes, prevent actual form submission and show success message
            e.preventDefault();
            
            const successMessage = document.createElement('div');
            successMessage.classList.add('success-message');
            successMessage.textContent = 'Reservation request submitted successfully! We will confirm your reservation shortly.';
            
            form.innerHTML = '';
            form.appendChild(successMessage);
        }
    });
    
    // Helper function to validate email
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Helper function to show error message
    function showError(input, message) {
        const errorDiv = document.createElement('div');
        errorDiv.classList.add('error-message');
        errorDiv.textContent = message;
        
        input.parentNode.appendChild(errorDiv);
        input.classList.add('error');
    }
}

/**
 * Add smooth scroll behavior for anchor links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        if (targetId !== '#') {
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

/**
 * FAQ Accordion Functionality
 */
function initFaqAccordion() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    if (faqQuestions.length) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', function() {
                const faqItem = this.parentElement;
                
                // Close all other FAQ items
                document.querySelectorAll('.faq-item').forEach(item => {
                    if (item !== faqItem) {
                        item.classList.remove('active');
                    }
                });
                
                // Toggle current FAQ item
                faqItem.classList.toggle('active');
            });
        });
    }
}

/**
 * Gallery Filter Functionality
 */
function initGalleryFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterButtons.length && galleryItems.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Filter gallery items
                galleryItems.forEach(item => {
                    if (filterValue === 'all' || item.classList.contains(filterValue)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
}

/**
 * Lightbox Functionality
 */
function initLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    
    if (galleryItems.length && lightbox) {
        let currentIndex = 0;
        const galleryImages = [];
        
        // Collect all gallery images and their captions
        galleryItems.forEach((item, index) => {
            const img = item.querySelector('img');
            const caption = item.querySelector('.gallery-info h3').textContent;
            const description = item.querySelector('.gallery-info p').textContent;
            
            galleryImages.push({
                src: img.src,
                alt: img.alt,
                caption: caption,
                description: description
            });
            
            // Add click event to gallery icon
            const galleryIcon = item.querySelector('.gallery-icon');
            if (galleryIcon) {
                galleryIcon.addEventListener('click', function(e) {
                    e.preventDefault();
                    openLightbox(index);
                });
            }
        });
        
        // Open lightbox function
        function openLightbox(index) {
            currentIndex = index;
            updateLightboxContent();
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        
        // Close lightbox function
        function closeLightbox() {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        // Update lightbox content
        function updateLightboxContent() {
            const image = galleryImages[currentIndex];
            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt;
            lightboxCaption.innerHTML = `<h3>${image.caption}</h3><p>${image.description}</p>`;
        }
        
        // Navigate to previous image
        function prevImage() {
            currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
            updateLightboxContent();
        }
        
        // Navigate to next image
        function nextImage() {
            currentIndex = (currentIndex + 1) % galleryImages.length;
            updateLightboxContent();
        }
        
        // Event listeners
        if (lightboxClose) {
            lightboxClose.addEventListener('click', closeLightbox);
        }
        
        if (lightboxPrev) {
            lightboxPrev.addEventListener('click', prevImage);
        }
        
        if (lightboxNext) {
            lightboxNext.addEventListener('click', nextImage);
        }
        
        // Close lightbox on outside click
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (!lightbox.classList.contains('active')) return;
            
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                prevImage();
            } else if (e.key === 'ArrowRight') {
                nextImage();
            }
        });
    }
}

/**
 * Contact Form Validation
 */
function initContactForm(form) {
    form.addEventListener('submit', function(e) {
        let isValid = true;
        const nameInput = document.getElementById('contact-name');
        const emailInput = document.getElementById('contact-email');
        const subjectInput = document.getElementById('contact-subject');
        const messageInput = document.getElementById('contact-message');
        
        // Reset previous error messages
        const errorMessages = form.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.remove());
        
        // Validate name
        if (!nameInput.value.trim()) {
            showError(nameInput, 'Please enter your name');
            isValid = false;
        }
        
        // Validate email
        if (!validateEmail(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate subject
        if (!subjectInput.value.trim()) {
            showError(subjectInput, 'Please enter a subject');
            isValid = false;
        }
        
        // Validate message
        if (!messageInput.value.trim()) {
            showError(messageInput, 'Please enter your message');
            isValid = false;
        }
        
        if (!isValid) {
            e.preventDefault();
        } else {
            // For demo purposes, prevent actual form submission and show success message
            e.preventDefault();
            
            const successMessage = document.createElement('div');
            successMessage.classList.add('success-message');
            successMessage.textContent = 'Your message has been sent successfully! We will get back to you soon.';
            
            form.innerHTML = '';
            form.appendChild(successMessage);
        }
    });
    
    // Helper function to validate email
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Helper function to show error message
    function showError(input, message) {
        const errorDiv = document.createElement('div');
        errorDiv.classList.add('error-message');
        errorDiv.textContent = message;
        
        input.parentNode.appendChild(errorDiv);
        input.classList.add('error');
    }
}

/**
 * Add CSS class for section reveal animations
 */
document.addEventListener('DOMContentLoaded', function() {
    // Add CSS for section reveal animations
    const style = document.createElement('style');
    style.textContent = `
        .section-hidden {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 1s, transform 1s;
        }
        
        .revealed {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
});
