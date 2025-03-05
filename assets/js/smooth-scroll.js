/**
 * Enhanced smooth scrolling functionality for Ploceus website
 * This script ensures all anchor links scroll smoothly to their target sections
 */

document.addEventListener('DOMContentLoaded', function() {
  // Select all anchor links that point to an ID on the page
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  
  // Add click event listener to each anchor link
  anchorLinks.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Get the target element ID from the href attribute
      const targetId = this.getAttribute('href');
      
      // Skip if the href is just "#" (empty anchor)
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      
      // Only scroll if the target element exists
      if (targetElement) {
        // Close mobile menu if it's open
        const mobileMenu = document.getElementById('mobileMenu');
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
          mobileMenu.classList.add('hidden');
        }
        
        // Calculate offset to account for fixed header
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        
        // Scroll to the target element with smooth behavior
        window.scrollTo({
          top: targetPosition - headerHeight - 20, // Extra 20px padding for visual comfort
          behavior: 'smooth'
        });
        
        // Update URL hash without scrolling (modern browsers)
        history.pushState(null, null, targetId);
      }
    });
  });
  
  // Handle initial page load with hash in URL
  if (window.location.hash) {
    const targetElement = document.querySelector(window.location.hash);
    if (targetElement) {
      // Delay the scroll slightly to ensure page is fully loaded
      setTimeout(() => {
        const headerHeight = document.querySelector('header').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        
        window.scrollTo({
          top: targetPosition - headerHeight - 20,
          behavior: 'smooth'
        });
      }, 300);
    }
  }
});
