// ============================================
// LIKLUK AUTOMOTIVE TECHNOLOGY
// main.js - Site-wide JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ---------- HEADER SCROLL STATE ----------
  const header = document.getElementById('siteHeader');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // ---------- MOBILE NAV ----------
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      // Animate hamburger
      const spans = hamburger.querySelectorAll('span');
      if (mobileNav.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });
    // Close on link click
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      });
    });
  }

  // ---------- COUNTER ANIMATION ----------
  const counters = document.querySelectorAll('[data-target]');
  if (counters.length > 0) {
    const countUp = (el) => {
      const target = parseInt(el.getAttribute('data-target'));
      const duration = 1800;
      const start = performance.now();
      const animate = (time) => {
        const elapsed = time - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target).toLocaleString();
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          countUp(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
  }

  // ---------- SCROLL REVEAL ----------
  const reveals = document.querySelectorAll('.product-card, .market-card, .wf-item, .stat-item, .product-item-card, .tl-item, .ppg-card');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, 60 * (entry.target.dataset.delay || 0));
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    el.dataset.delay = i % 4; // stagger within rows
    revealObserver.observe(el);
  });

  // ---------- HERO PRODUCT SHOWCASE SWITCHER ----------
  const hpsMain = document.querySelector('.hps-main img');
  const hpsThumbs = document.querySelectorAll('.hps-thumb');
  if (hpsMain && hpsThumbs.length > 0) {
    hpsThumbs.forEach((thumb, index) => {
      thumb.addEventListener('click', () => {
        const thumbImg = thumb.querySelector('img');
        if (!thumbImg) return;
        const mainSrc = hpsMain.src;
        const mainAlt = hpsMain.alt;
        // Swap
        hpsMain.style.opacity = '0';
        setTimeout(() => {
          hpsMain.src = thumbImg.src;
          hpsMain.alt = thumbImg.alt;
          thumbImg.src = mainSrc;
          thumbImg.alt = mainAlt;
          hpsMain.style.opacity = '1';
        }, 200);
      });
    });
    hpsMain.style.transition = 'opacity 0.2s ease';
  }



  // ---------- SMOOTH ANCHOR SCROLL ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 140; // header + sticky tab height
        const y = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
  });

  // ---------- ACTIVE NAV TAB HIGHLIGHT ----------
  const navTabs = document.querySelectorAll('[href^="#"]');
  const sections = [];
  navTabs.forEach(tab => {
    const id = tab.getAttribute('href').replace('#', '');
    const section = document.getElementById(id);
    if (section) sections.push({ tab, section });
  });

  if (sections.length > 0) {
    const activeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const match = sections.find(s => s.section === entry.target);
        if (match) {
          if (entry.isIntersecting) {
            navTabs.forEach(t => t.style.color = '');
            match.tab.style.color = 'var(--accent)';
          }
        }
      });
    }, { threshold: 0.3 });
    sections.forEach(({ section }) => activeObserver.observe(section));
  }

});

// ---------- INQUIRY FORM SUBMIT ----------
function handleSubmit(e) {
  e.preventDefault();
  const form = document.getElementById('inquiryForm');
  const successMsg = document.getElementById('successMsg');
  const confirmEmail = document.getElementById('confirmEmail');
  const emailVal = document.getElementById('email');
  const submitBtn = document.getElementById('submitBtn');

  if (!form || !successMsg) return;

  // Simulate sending
  submitBtn.textContent = 'Sending...';
  submitBtn.disabled = true;

  setTimeout(() => {
    if (confirmEmail && emailVal) {
      confirmEmail.textContent = emailVal.value;
    }
    form.style.display = 'none';
    successMsg.style.display = 'block';
  }, 1200);

  // In production: replace with actual form submission
  // e.g. fetch('/api/inquiry', { method: 'POST', body: new FormData(form) })
}
