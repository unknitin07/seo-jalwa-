// Jalwa Games - Progressive Enhancement Script
// Mobile nav toggle and social share functionality

document.addEventListener('DOMContentLoaded', function() {
  
  // Mobile Navigation Toggle
  const navToggle = document.querySelector('.jg-nav__toggle');
  const navList = document.getElementById('jg-nav__list');
  
  if (navToggle && navList) {
    navToggle.addEventListener('click', function() {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      navList.classList.toggle('active');
    });

    // Close nav when clicking outside
    document.addEventListener('click', function(e) {
      if (!navToggle.contains(e.target) && !navList.contains(e.target)) {
        navList.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close nav when pressing Escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && navList.classList.contains('active')) {
        navList.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Login Button Action Hook
  // TODO: Replace with actual login redirect or modal
  document.querySelectorAll('.jg-btn[data-action="login"]').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      // Uncomment to prevent default and add custom behavior
      // e.preventDefault();
      // Example: Open login modal or redirect
      console.log('Login button clicked');
      // window.location.href = '/login';
    });
  });

  // Registration Button Action Hook
  // TODO: Replace with actual registration redirect or modal
  document.querySelectorAll('.jg-btn[data-action="register"]').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      // Uncomment to prevent default and add custom behavior
      // e.preventDefault();
      // Example: Open registration modal or redirect
      console.log('Registration button clicked');
      // window.location.href = '/register';
    });
  });

  // Social Share Buttons
  document.querySelectorAll('.jg-share-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const platform = btn.getAttribute('data-share');
      const url = encodeURIComponent(window.location.href);
      const title = encodeURIComponent(document.title);
      
      let shareUrl = '';
      
      switch(platform) {
        case 'facebook':
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
          break;
        case 'twitter':
          shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
          break;
        case 'whatsapp':
          shareUrl = `https://wa.me/?text=${title}%20${url}`;
          break;
      }
      
      if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
      }
    });
  });

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Update URL without jumping
        history.pushState(null, null, targetId);
        
        // Close mobile nav if open
        if (navList && navList.classList.contains('active')) {
          navList.classList.remove('active');
          if (navToggle) {
            navToggle.setAttribute('aria-expanded', 'false');
          }
        }
      }
    });
  });

  // Lazy load optimization (if needed for images)
  if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
      img.src = img.dataset.src || img.src;
    });
  } else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
  }

  // Add active state to current nav item based on scroll position
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.jg-nav__link');
  
  function highlightNav() {
    let scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNav);
  highlightNav(); // Initial call

  // Performance: Log page load time (for debugging)
  window.addEventListener('load', function() {
    if (window.performance) {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      console.log(`Page load time: ${pageLoadTime}ms`);
    }
  });

});

// Analytics placeholder
// TODO: Replace with your actual analytics code (Google Analytics, etc.)
function trackEvent(category, action, label) {
  console.log('Event tracked:', category, action, label);
  // Example: ga('send', 'event', category, action, label);
}