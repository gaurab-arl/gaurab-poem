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
  const categorySelect = document.getElementById('poem-category');
  if (categorySelect) {
    categorySelect.addEventListener('change', function () {
      if (window.poemPagination) {
        window.poemPagination.currentFilter = this.value;
        window.poemPagination.filterPoems();
        window.poemPagination.currentPage = 1;
        window.poemPagination.render();
      }
    });
  }

  // Add hover sound effect (optional)
  document.addEventListener('click', function(e) {
    if (e.target.closest('.poem-card')) {
      const card = e.target.closest('.poem-card');
      card.style.transform = 'translateY(-12px) scale(1.02)';
      setTimeout(() => {
        card.style.transform = '';
      }, 200);
    }
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
  const observeCards = () => {
    document.querySelectorAll('.poem-card').forEach(card => {
      observer.observe(card);
    });
  };
  
  // Initial observation
  setTimeout(observeCards, 100);
  
  // Re-observe when pagination changes
  const originalRender = window.poemPagination?.render;
  if (originalRender) {
    window.poemPagination.render = function() {
      originalRender.call(this);
      setTimeout(observeCards, 100);
    };
  }
  
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