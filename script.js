// Scroll reveal
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
reveal();

// HAMBURGER MENU - Werkt op alle telefoons
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
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
  
  // OPTIONEEL: Sluit menu wanneer er buiten geklikt wordt (verbeterde gebruikservaring)
  document.addEventListener('click', function(e) {
    if (navLinks.classList.contains('show')) {
      // Check of de klik buiten het menu en buiten de toggle knop is
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
}

// Form submit met AJAX (voorkomt page refresh en toont success)
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
        successDiv.style.display = 'block';
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

// Navbar background bij scroll
window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  if (window.scrollY > 50) {
    nav.style.background = 'rgba(250,250,247,0.95)';
    nav.style.backdropFilter = 'blur(20px)';
  } else {
    nav.style.background = 'rgba(250,250,247,0.88)';
    nav.style.backdropFilter = 'blur(20px)';
  }
});