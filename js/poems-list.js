document.addEventListener('DOMContentLoaded', function() {
    // Navigation dropdown functionality
    const navDropdown = document.getElementById('navDropdown');
    const navToggle = document.getElementById('navToggle');
    
    if (navToggle && navDropdown) {
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navDropdown.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function() {
            navDropdown.classList.remove('active');
        });
        
        // Prevent dropdown from closing when clicking inside menu
        const navMenu = navDropdown.querySelector('.nav-menu');
        if (navMenu) {
            navMenu.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        }
    }
    
    // Search functionality
    const searchInput = document.getElementById('poemSearch');
    const alphabetSections = document.querySelectorAll('.alphabet-section');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            
            alphabetSections.forEach(section => {
                const poemLinks = section.querySelectorAll('.poem-link');
                let hasVisiblePoems = false;
                
                poemLinks.forEach(link => {
                    const poemTitle = link.textContent.toLowerCase();
                    
                    if (searchTerm === '' || poemTitle.includes(searchTerm)) {
                        link.classList.remove('hidden');
                        hasVisiblePoems = true;
                    } else {
                        link.classList.add('hidden');
                    }
                });
                
                // Hide/show entire section based on whether it has visible poems
                if (hasVisiblePoems) {
                    section.classList.remove('hidden');
                } else {
                    section.classList.add('hidden');
                }
            });
        });
    }
    
    // Smooth scroll for any anchor links
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
    
    // Add staggered animation to alphabet sections
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.animation = 'fadeInScale 0.8s ease forwards';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    alphabetSections.forEach(section => {
        observer.observe(section);
    });
});