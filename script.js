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

// Hamburger menu
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    const icon = menuToggle.querySelector('i');
    if (icon) {
      if (navLinks.classList.contains('show')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    }
  });
}

// Sluit menu bij klikken op link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('show');
    const icon = menuToggle?.querySelector('i');
    if (icon) {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });
});

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