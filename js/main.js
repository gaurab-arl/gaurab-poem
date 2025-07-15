// main.js

document.addEventListener('DOMContentLoaded', function () {
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

  // Smooth scroll for navigation
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

  // Enhanced poem filtering with animations
  function filterPoems(category) {
    const poems = document.querySelectorAll('.poem-card');
    
    // Show/hide poems without complex animations that might break display
    poems.forEach((poem) => {
      if (category === 'all' || poem.dataset.category === category) {
        poem.style.display = 'flex';
        poem.style.opacity = '1';
        poem.style.visibility = 'visible';
      } else {
        poem.style.display = 'none';
      }
    });
  }

  const categorySelect = document.getElementById('poem-category');
  if (categorySelect) {
    categorySelect.addEventListener('change', function () {
      filterPoems(this.value);
    });
  }

  // Initialize with all poems showing
  filterPoems('all');

  // Add hover sound effect (optional)
  const poemCards = document.querySelectorAll('.poem-card');
  poemCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      // Add subtle scale animation
      this.style.transform = 'translateY(-12px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Add intersection observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
      }
    });
  }, observerOptions);

  // Observe poem cards for scroll animations
  document.querySelectorAll('.poem-card').forEach(card => {
    observer.observe(card);
  });
  
  // Smooth scroll to top for home button
  const homeButton = document.querySelector('.home-button-fixed');
  if (homeButton) {
    homeButton.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});