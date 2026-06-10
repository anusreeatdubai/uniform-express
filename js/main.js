/* =====================================================
   MAIN JS — Navigation, Scroll, Counters, Theme, Particles
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Page Loader ----
  const loader = document.getElementById('page-loader');
  setTimeout(() => {
    if (loader) loader.classList.add('hidden');
  }, 1500);

  // ---- Scroll Progress Bar ----
  const progressBar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    if (progressBar) progressBar.style.width = progress + '%';
  });

  // ---- Navbar Scroll Effect ----
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveNavLink();
  });

  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) current = section.getAttribute('id');
    });
    navLinks.forEach(a => {
      a.classList.remove('active');
      if (a.getAttribute('href') === '#' + current) a.classList.add('active');
    });
  }

  // ---- Mobile Hamburger ----
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('nav-links');
  let mobileOpen = false;

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      mobileOpen = !mobileOpen;
      mobileNav.classList.toggle('mobile-open', mobileOpen);
      hamburger.classList.toggle('open', mobileOpen);
      document.body.style.overflow = mobileOpen ? 'hidden' : '';
    });
  }

  if (mobileNav) {
    mobileNav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileOpen = false;
        mobileNav.classList.remove('mobile-open');
        hamburger?.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ---- Smooth Scroll ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ---- Theme Toggle ----
  const themeToggle = document.getElementById('theme-toggle');
  let isDark = true;

  const savedTheme = localStorage.getItem('ue-theme');
  if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    isDark = savedTheme === 'dark';
    updateThemeIcon();
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      isDark = !isDark;
      const theme = isDark ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('ue-theme', theme);
      updateThemeIcon();
    });
  }

  function updateThemeIcon() {
    if (themeToggle) {
      themeToggle.textContent = isDark ? '☀️' : '🌙';
      themeToggle.title = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
    }
  }

  // ---- Particles ----
  const particleContainer = document.querySelector('.hero-particles');
  if (particleContainer) {
    for (let i = 0; i < 35; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const x = Math.random() * 100;
      const dur = (Math.random() * 10 + 6).toFixed(1);
      const delay = (Math.random() * 8).toFixed(1);
      const drift = (Math.random() * 80 - 40).toFixed(0);
      const size = (Math.random() * 3 + 1).toFixed(1);
      p.style.cssText = `
        left: ${x}%;
        bottom: ${Math.random() * 20}%;
        width: ${size}px;
        height: ${size}px;
        --dur: ${dur}s;
        --delay: ${delay}s;
        --drift: ${drift}px;
        opacity: 0;
      `;
      particleContainer.appendChild(p);
    }
  }

  // ---- Hero Stats Counter ----
  const heroStats = document.querySelectorAll('.hero-stat-num[data-target]');
  heroStats.forEach(el => {
    const target = parseInt(el.getAttribute('data-target'));
    const suffix = el.getAttribute('data-suffix') || '';
    el.textContent = '0' + suffix;
    setTimeout(() => animateCounter(el, target, suffix, 1800), 1500);
  });

  // ---- Intersection Observer — Reveal on scroll ----
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal, .stagger-children').forEach(el => {
    revealObserver.observe(el);
  });

  // ---- Stats Counters (Why Us section) ----
  const statNums = document.querySelectorAll('.stat-num[data-target]');
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'));
        const suffix = el.getAttribute('data-suffix') || '';
        animateCounter(el, target, suffix, 2000);
        statsObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  statNums.forEach(el => statsObserver.observe(el));

  // ---- Process Line Animation ----
  const processLine = document.querySelector('.process-line-fill');
  if (processLine) {
    const pObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          processLine.style.width = '100%';
          pObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    pObserver.observe(document.querySelector('.process-grid'));
  }

  // ---- Counter animation utility ----
  function animateCounter(el, target, suffix, duration) {
    const start = 0;
    const startTime = performance.now();
    const hasSuffix = suffix;
    const prefix = el.getAttribute('data-prefix') || '';

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      el.textContent = prefix + current.toLocaleString() + hasSuffix;
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = prefix + target.toLocaleString() + hasSuffix;
    }
    requestAnimationFrame(update);
  }

  // ---- Testimonials Carousel ----
  const trackWrap = document.querySelector('.testimonials-track-wrap');
  const track     = document.querySelector('.testimonials-track');
  const prevBtn   = document.getElementById('t-prev');
  const nextBtn   = document.getElementById('t-next');
  const dots      = document.querySelectorAll('.t-dot');
  let currentSlide   = 0;
  let slidesToShow   = 3;
  const totalSlides  = track ? track.querySelectorAll('.testimonial-card').length : 0;

  function getSlidesToShow() {
    if (window.innerWidth <= 640)  return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  }

  function getCardWidth() {
    // Derive card width from the wrapper, not the card element (avoids chicken-and-egg sizing issues)
    const wrapWidth = trackWrap ? trackWrap.clientWidth : 0;
    const gap = 28;
    return (wrapWidth - gap * (slidesToShow - 1)) / slidesToShow;
  }

  function sizeCards() {
    if (!track) return;
    slidesToShow = getSlidesToShow();
    const w = getCardWidth();
    track.querySelectorAll('.testimonial-card').forEach(c => {
      c.style.width    = w + 'px';
      c.style.minWidth = w + 'px';
      c.style.maxWidth = w + 'px';
    });
  }

  function updateCarousel() {
    if (!track) return;
    const maxSlide = Math.max(0, totalSlides - slidesToShow);
    currentSlide   = Math.max(0, Math.min(currentSlide, maxSlide));

    const w   = getCardWidth();
    const gap = 28;
    track.style.transform = `translateX(-${currentSlide * (w + gap)}px)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));

    // Disable/style buttons at boundaries
    if (prevBtn) prevBtn.style.opacity = currentSlide === 0 ? '0.35' : '1';
    if (nextBtn) nextBtn.style.opacity = currentSlide >= maxSlide ? '0.35' : '1';
  }

  function initCarousel() {
    sizeCards();
    updateCarousel();
  }

  prevBtn?.addEventListener('click', () => {
    if (currentSlide > 0) { currentSlide--; updateCarousel(); }
  });

  nextBtn?.addEventListener('click', () => {
    const maxSlide = Math.max(0, totalSlides - slidesToShow);
    if (currentSlide < maxSlide) { currentSlide++; updateCarousel(); }
  });

  dots.forEach((d, i) => d.addEventListener('click', () => { currentSlide = i; updateCarousel(); }));

  window.addEventListener('resize', () => { initCarousel(); });
  initCarousel();

  // ---- Product Filter ----
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');
  let filterBusy = false;

  // Set initial state so every card has explicit opacity/transform
  productCards.forEach(card => {
    card.style.opacity = '1';
    card.style.transform = 'translateY(0) scale(1)';
  });

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (filterBusy) return;
      filterBusy = true;

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');

      const toShow = [];
      const toHide = [];

      productCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        (filter === 'all' || cat === filter ? toShow : toHide).push(card);
      });

      // ── Phase 1: Smoothly fade out cards that don't match ──
      const FADE_OUT = 260;
      const FADE_IN  = 340;

      toHide.forEach(card => {
        card.style.transition = `opacity ${FADE_OUT}ms ease, transform ${FADE_OUT}ms ease`;
        card.style.opacity    = '0';
        card.style.transform  = 'translateY(12px) scale(0.96)';
      });

      // ── Phase 2: After fade-out finishes, collapse hidden cards
      //            then prepare the cards-to-show in invisible state ──
      setTimeout(() => {
        toHide.forEach(card => {
          card.style.display = 'none';
          // Reset so they're ready for next filter without lingering style
          card.style.transition = '';
        });

        toShow.forEach(card => {
          if (card.style.display === 'none' || card.style.opacity === '0') {
            card.style.transition = 'none';          // disable transition temporarily
            card.style.opacity    = '0';
            card.style.transform  = 'translateY(14px) scale(0.96)';
            card.style.display    = '';              // make it part of layout
          }
        });

        // ── Phase 3: Double rAF guarantees the browser has painted
        //            the invisible-but-displayed cards before we animate ──
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            toShow.forEach((card, i) => {
              const delay = i * 65; // stagger each card by 65 ms
              card.style.transition = `opacity ${FADE_IN}ms cubic-bezier(0.4,0,0.2,1) ${delay}ms,
                                       transform ${FADE_IN}ms cubic-bezier(0.4,0,0.2,1) ${delay}ms`;
              card.style.opacity   = '1';
              card.style.transform = 'translateY(0) scale(1)';
            });

            // Unlock after the last card finishes animating
            const lastDelay = (toShow.length - 1) * 65 + FADE_IN + 40;
            setTimeout(() => {
              // Clean up inline transition so CSS hover transitions work normally again
              toShow.forEach(card => { card.style.transition = ''; });
              filterBusy = false;
            }, lastDelay);
          });
        });

      }, FADE_OUT + 20); // tiny buffer after fade-out
    });
  });

  // ---- Contact Form — Validation ----
  const contactForm = document.getElementById('contact-form');

  // Helper: show an error message beneath a field
  function showFieldError(el, message) {
    const group = el.closest('.form-group');
    if (!group) return;
    group.classList.add('has-error');
    // Remove any existing error first
    const existing = group.querySelector('.form-error');
    if (existing) existing.remove();
    const err = document.createElement('p');
    err.className = 'form-error';
    err.setAttribute('role', 'alert');
    err.innerHTML = `⚠ ${message}`;
    group.appendChild(err);
  }

  // Helper: clear error from a field
  function clearFieldError(el) {
    const group = el.closest('.form-group');
    if (!group) return;
    group.classList.remove('has-error');
    const err = group.querySelector('.form-error');
    if (err) err.remove();
  }

  // Validate a UAE/international phone number (at least 7 digits)
  function isValidPhone(val) {
    return /^[\d\s\+\-\(\)]{7,20}$/.test(val);
  }

  if (contactForm) {
    // Real-time: clear error the moment user starts correcting a field
    contactForm.querySelectorAll('input, select, textarea').forEach(field => {
      field.addEventListener('input',  () => clearFieldError(field));
      field.addEventListener('change', () => clearFieldError(field));
    });

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Define required fields + their validation rules
      const rules = [
        {
          el:      document.getElementById('contact-name'),
          empty:   'Full name is required',
          invalid: null,
          check:   null,
        },
        {
          el:      document.getElementById('contact-company'),
          empty:   'Company name is required',
          invalid: null,
          check:   null,
        },
        {
          el:      document.getElementById('contact-email'),
          empty:   'Email address is required',
          invalid: 'Please enter a valid email address',
          check:   val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
        },
        {
          el:      document.getElementById('contact-phone'),
          empty:   'WhatsApp / phone number is required',
          invalid: 'Please enter a valid phone number (e.g. +971 50 000 0000)',
          check:   isValidPhone,
        },
      ];

      let firstErrorEl = null;
      let isValid = true;

      rules.forEach(({ el, empty, invalid, check }) => {
        clearFieldError(el);
        const val = el.value.trim();

        if (!val) {
          showFieldError(el, empty);
          if (!firstErrorEl) firstErrorEl = el;
          isValid = false;
        } else if (check && !check(val)) {
          showFieldError(el, invalid);
          if (!firstErrorEl) firstErrorEl = el;
          isValid = false;
        }
      });

      if (!isValid) {
        // Scroll to & focus the first invalid field
        firstErrorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => firstErrorEl.focus(), 400);
        return;
      }

      // ✅ All valid — proceed with submission
      const btn = contactForm.querySelector('.form-submit');
      const originalText = btn.innerHTML;
      btn.innerHTML = '<span>Sending…</span>';
      btn.disabled = true;

      setTimeout(() => {
        contactForm.style.display = 'none';
        document.getElementById('form-success').style.display = 'block';
      }, 1800);
    });
  }

  // ---- Magnetic Button Effect ----
  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  // ---- Hamburger animation ----
  document.querySelector('#hamburger')?.addEventListener('click', function () {
    const spans = this.querySelectorAll('span');
    this.classList.toggle('open');
    if (this.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  // ---- Quote range slider ----
  const quantitySlider = document.getElementById('quantity-slider');
  const quantityDisplay = document.querySelector('.quantity-display');
  const tiers = document.querySelectorAll('.quote-tier');

  if (quantitySlider) {
    quantitySlider.addEventListener('input', () => {
      const val = parseInt(quantitySlider.value);
      if (quantityDisplay) quantityDisplay.innerHTML = `<span>×</span>${val.toLocaleString()}`;
      updateTier(val);
      updateSliderTrack(quantitySlider);
    });
    updateSliderTrack(quantitySlider);
  }

  function updateTier(val) {
    tiers.forEach(tier => {
      const min = parseInt(tier.getAttribute('data-min'));
      const max = parseInt(tier.getAttribute('data-max'));
      tier.classList.toggle('active', val >= min && val <= max);
    });
    const result = document.querySelector('.result-value');
    if (result) {
      if (val < 50) result.textContent = 'Starter Pricing — Contact for Quote';
      else if (val < 200) result.textContent = 'Volume Discount Eligible — Contact for Quote';
      else if (val < 500) result.textContent = 'Premium Bulk Rate — Contact for Quote';
      else result.textContent = 'Enterprise Pricing — Special Rate Available';
    }
  }

  // ---- "Get Exact Quote" button — pre-fills contact form quantity ----
  const quoteGetBtn = document.getElementById('quote-get-quote-btn');
  if (quoteGetBtn && quantitySlider) {
    quoteGetBtn.addEventListener('click', (e) => {
      e.preventDefault();

      const val = parseInt(quantitySlider.value);
      const contactQty = document.getElementById('contact-quantity');

      if (contactQty) {
        // Map slider value → matching select option value
        let optionValue = '';
        if (val >= 500)       optionValue = '500+';
        else if (val >= 200)  optionValue = '200-499';
        else if (val >= 50)   optionValue = '50-199';
        else                  optionValue = '25-49';

        contactQty.value = optionValue;

        // Scroll to contact section
        document.querySelector('#contact').scrollIntoView({ behavior: 'smooth', block: 'start' });

        // After scroll settles, flash-highlight the quantity field so user notices it was filled
        setTimeout(() => {
          contactQty.style.transition = 'border-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease';
          contactQty.style.borderColor = 'var(--gold)';
          contactQty.style.boxShadow   = '0 0 0 4px rgba(201,168,76,0.25)';
          contactQty.style.background  = 'rgba(201,168,76,0.08)';

          // Fade the highlight back to normal after 1.8 s
          setTimeout(() => {
            contactQty.style.borderColor = '';
            contactQty.style.boxShadow   = '';
            contactQty.style.background  = '';
          }, 1800);
        }, 700); // wait for scroll to land
      }
    });
  }

  function updateSliderTrack(slider) {
    const min = slider.min || 0;
    const max = slider.max || 100;
    const val = slider.value;
    const pct = ((val - min) / (max - min)) * 100;
    slider.style.background = `linear-gradient(to right, var(--gold) ${pct}%, var(--glass-border) ${pct}%)`;
  }

  console.log('✨ Uniform Express LLC — Powered by passion & craft');
});
