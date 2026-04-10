// script.js - Volledig werkend hamburger menu voor ALLE browsers (inclusief Google Chrome)

// Wacht tot de DOM volledig geladen is (belangrijk voor Chrome!)
document.addEventListener('DOMContentLoaded', function() {
  console.log('Script geladen'); // Debug - check of script werkt
  
  // HAMBURGER MENU
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  
  if (menuToggle && navLinks) {
    console.log('Menu elementen gevonden'); // Debug
    
    // Open/sluiten bij klikken op hamburger icoon
    menuToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      // Toggle de 'show' klasse
      if (navLinks.classList.contains('show')) {
        navLinks.classList.remove('show');
        menuToggle.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      } else {
        navLinks.classList.add('show');
        menuToggle.classList.add('active');
        const icon = menuToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-bars');
          icon.classList.add('fa-times');
        }
      }
    });
    
    // Sluit menu wanneer op een link wordt geklikt
    const navLinkItems = document.querySelectorAll('.nav-links a');
    navLinkItems.forEach(link => {
      link.addEventListener('click', function() {
        navLinks.classList.remove('show');
        menuToggle.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
      });
    });
    
    // Sluit menu wanneer er buiten geklikt wordt
    document.addEventListener('click', function(e) {
      if (navLinks.classList.contains('show')) {
        if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
          navLinks.classList.remove('show');
          menuToggle.classList.remove('active');
          const icon = menuToggle.querySelector('i');
          if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
          }
        }
      }
    });
  } else {
    console.error('Menu elementen niet gevonden! Check ID names.');
  }
  
  // SCROLL REVEAL ANIMATIE
  const reveals = document.querySelectorAll('.reveal');
  function reveal() {
    reveals.forEach(el => {
      const windowHeight = window.innerHeight;
      const revealTop = el.getBoundingClientRect().top;
      const revealPoint = 120;
      if (revealTop < windowHeight - revealPoint) {
        el.classList.add('visible');
      }
    });
  }
  window.addEventListener('scroll', reveal);
  reveal(); // Eerste check
  
  // FORM SUBMIT MET AJAX
  const form = document.getElementById('offerteForm');
  const successDiv = document.getElementById('formSuccess');
  
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = form.querySelector('.submit-btn');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.6';
      submitBtn.innerHTML = '<span>Versturen...</span><span>⏳</span>';
      
      const formData = new FormData(form);
      
      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });
        
        if (response.ok) {
          form.style.display = 'none';
          if (successDiv) successDiv.style.display = 'block';
          form.reset();
        } else {
          alert('Er is een fout opgetreden. Probeer het later opnieuw of mail direct naar Camiel@Theeuwes-Solutions.com');
        }
      } catch (error) {
        alert('Verbinding mislukt. Controleer je internetverbinding of mail direct naar Camiel@Theeuwes-Solutions.com');
      } finally {
        submitBtn.disabled = false;
        submitBtn.style.opacity = '1';
        submitBtn.innerHTML = originalText;
      }
    });
  }
  
  // NAVBAR BACKGROUND BIJ SCROLL
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        nav.style.background = 'rgba(250,250,247,0.95)';
        nav.style.backdropFilter = 'blur(20px)';
      } else {
        nav.style.background = 'rgba(250,250,247,0.88)';
        nav.style.backdropFilter = 'blur(20px)';
      }
    });
  }
});