/**
 * Mood&Food — Main JavaScript
 * Handles: Navigation, Form Validation, Scroll Animations,
 *          Mobile Menu, Active Nav State, Accessibility
 */

'use strict';

/* ═══════════════════════════════════════════════════
   1. DOM Ready
═══════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initScrollEffects();
  initScrollReveal();
  initActiveNavLink();
  initHeroAnimation();

  // Page-specific inits
  if (document.getElementById('reservationForm')) {
    initReservationForm();
  }
  if (document.querySelector('.menu-tabs')) {
    initMenuTabs();
  }
});

/* ═══════════════════════════════════════════════════
   2. Navigation
═══════════════════════════════════════════════════ */
function initNavigation() {
  const header  = document.querySelector('.site-header');
  const toggle  = document.getElementById('navToggle');
  const navList = document.getElementById('navList');

  if (!header || !toggle || !navList) return;

  /* Hamburger toggle */
  toggle.addEventListener('click', () => {
    const isOpen = navList.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  /* Close on nav link click (mobile) */
  navList.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      navList.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  /* Close on outside click */
  document.addEventListener('click', e => {
    if (!header.contains(e.target) && navList.classList.contains('open')) {
      navList.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  /* Close on Escape key */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navList.classList.contains('open')) {
      navList.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
      document.body.style.overflow = '';
    }
  });

  /* Trap focus within nav when open (mobile a11y) */
  navList.addEventListener('keydown', e => {
    if (!navList.classList.contains('open')) return;
    const focusable = navList.querySelectorAll('a, button');
    if (!focusable.length) return;
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    }
  });
}

/* ═══════════════════════════════════════════════════
   3. Scroll Effects (Sticky header shadow)
═══════════════════════════════════════════════════ */
function initScrollEffects() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once
}

/* ═══════════════════════════════════════════════════
   4. Scroll Reveal Animation
═══════════════════════════════════════════════════ */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  // Respect reduced motion preference
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    elements.forEach(el => el.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach(el => observer.observe(el));
}

/* ═══════════════════════════════════════════════════
   5. Active Navigation Link
═══════════════════════════════════════════════════ */
function initActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath ||
        (currentPath === '' && href === 'index.html') ||
        (currentPath === 'index.html' && href === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
}

/* ═══════════════════════════════════════════════════
   6. Hero Ken Burns Effect
═══════════════════════════════════════════════════ */
function initHeroAnimation() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  // Trigger loaded class to start subtle scale animation
  requestAnimationFrame(() => {
    setTimeout(() => hero.classList.add('loaded'), 100);
  });
}

/* ═══════════════════════════════════════════════════
   7. Menu Tabs Filter
═══════════════════════════════════════════════════ */
function initMenuTabs() {
  const tabs       = document.querySelectorAll('.menu-tab');
  const categories = document.querySelectorAll('.menu-category');

  if (!tabs.length || !categories.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.category;

      // Update tabs
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      // Show/hide categories
      categories.forEach(cat => {
        if (target === 'all' || cat.dataset.category === target) {
          cat.hidden = false;
          cat.classList.remove('reveal');
          void cat.offsetWidth; // reflow
          cat.style.animation = 'fadeUp 0.4s ease forwards';
        } else {
          cat.hidden = true;
        }
      });
    });
  });
}

/* ═══════════════════════════════════════════════════
   8. Reservation Form Validation
═══════════════════════════════════════════════════ */
function initReservationForm() {
  const form    = document.getElementById('reservationForm');
  const success = document.getElementById('formSuccess');
  if (!form) return;

  /* Validate a single field */
  function validateField(field) {
    const errorEl = document.getElementById(`${field.id}-error`);
    let message = '';

    const val = field.value.trim();

    if (field.required && !val) {
      message = 'This field is required.';
    } else if (field.type === 'email' && val) {
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      if (!emailRe.test(val)) message = 'Please enter a valid email address.';
    } else if (field.type === 'tel' && val) {
      const telRe = /^[\d\s+\-().]{7,15}$/;
      if (!telRe.test(val)) message = 'Please enter a valid phone number.';
    } else if (field.id === 'guests' && val) {
      const n = parseInt(val, 10);
      if (isNaN(n) || n < 1 || n > 20) message = 'Guests must be between 1 and 20.';
    } else if (field.type === 'date' && val) {
      const selected = new Date(val);
      const today    = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) message = 'Please select a future date.';
    }

    if (errorEl) {
      errorEl.textContent = message;
    }
    field.classList.toggle('error',   !!message);
    field.classList.toggle('success', !message && !!val);
    field.setAttribute('aria-invalid', message ? 'true' : 'false');
    return !message;
  }

  /* Live validation on blur */
  form.querySelectorAll('.form-control').forEach(field => {
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.classList.contains('error')) validateField(field);
    });
  });

  /* Form submit */
  form.addEventListener('submit', e => {
    e.preventDefault();

    let allValid = true;
    const fields = form.querySelectorAll('.form-control');

    fields.forEach(field => {
      if (!validateField(field)) allValid = false;
    });

    if (!allValid) {
      // Focus first invalid field and announce error
      const firstError = form.querySelector('.form-control.error');
      if (firstError) firstError.focus();

      const liveRegion = document.getElementById('formAnnounce');
      if (liveRegion) {
        liveRegion.textContent = 'Please fix the errors below before submitting.';
      }
      return;
    }

    /* Simulate async submission */
    const submitBtn = form.querySelector('[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    setTimeout(() => {
      form.style.display = 'none';
      if (success) {
        success.classList.add('visible');
        success.focus();
        // Announce to screen readers
        const liveRegion = document.getElementById('formAnnounce');
        if (liveRegion) {
          liveRegion.textContent = 'Your reservation has been confirmed! We will send a confirmation to your email shortly.';
        }
      }
    }, 1200);
  });

  /* Date input: set min to today */
  const dateInput = document.getElementById('date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }
}

/* ═══════════════════════════════════════════════════
   9. Smooth Scroll for anchor links
═══════════════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navHeight = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--nav-height'),
        10
      ) || 80;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
      window.scrollTo({ top, behavior: 'smooth' });
      // Move focus to target for accessibility
      if (!target.hasAttribute('tabindex')) {
        target.setAttribute('tabindex', '-1');
      }
      target.focus({ preventScroll: true });
    }
  });
});

/* ═══════════════════════════════════════════════════
   10. Accessible Image Lazy-load fallback
═══════════════════════════════════════════════════ */
document.querySelectorAll('img[data-src]').forEach(img => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        img.src = img.dataset.src;
        observer.unobserve(img);
      }
    });
  }, { rootMargin: '200px' });
  observer.observe(img);
});

/* ═══════════════════════════════════════════════════
   11. Current year in footer
═══════════════════════════════════════════════════ */
document.querySelectorAll('.js-year').forEach(el => {
  el.textContent = new Date().getFullYear();
});
