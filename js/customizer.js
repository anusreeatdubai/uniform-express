/* =====================================================
   UNIFORM COLOR CUSTOMIZER — Interactive AI Feature
   ===================================================== */

(function () {
  'use strict';

  const COLORS = {
    'Navy Blue':    { hex: '#1e3a5f', name: 'Navy Blue' },
    'Charcoal':     { hex: '#2c3e50', name: 'Charcoal' },
    'Black':        { hex: '#1a1a1a', name: 'Black' },
    'White':        { hex: '#f5f5f5', name: 'White' },
    'Burgundy':     { hex: '#7b2d42', name: 'Burgundy' },
    'Forest Green': { hex: '#2d5a27', name: 'Forest Green' },
    'Royal Blue':   { hex: '#2255a4', name: 'Royal Blue' },
    'Teal':         { hex: '#17686e', name: 'Teal' },
    'Gold':         { hex: '#c9a84c', name: 'Gold' },
    'Sky Blue':     { hex: '#6bb5d6', name: 'Sky Blue' },
    'Beige':        { hex: '#d4b896', name: 'Beige' },
    'Maroon':       { hex: '#6b2121', name: 'Maroon' },
  };

  const ACCENT_COLORS = {
    'Gold':         '#c9a84c',
    'White':        '#f5f5f5',
    'Silver':       '#9e9e9e',
    'Black':        '#1a1a1a',
    'Red':          '#c0392b',
    'Sky Blue':     '#6bb5d6',
  };

  // Uniform SVG silhouettes for each category
  const UNIFORMS = {
    corporate: {
      label: 'Corporate',
      svg: (main, accent) => `
        <svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 8px 20px rgba(0,0,0,0.4))">
          <!-- Body/Jacket -->
          <path d="M60 120 L30 180 L30 280 L170 280 L170 180 L140 120 Z" fill="${main}" rx="4"/>
          <!-- Lapels -->
          <path d="M80 120 L100 160 L120 120 L110 115 L100 130 L90 115 Z" fill="${accent}" opacity="0.9"/>
          <!-- Shirt (white) -->
          <rect x="88" y="120" width="24" height="100" fill="#f0f0f0" rx="2"/>
          <!-- Tie -->
          <path d="M96 125 L104 125 L106 200 L100 208 L94 200 Z" fill="${accent}"/>
          <!-- Sleeves -->
          <path d="M60 120 L30 140 L28 180 L55 175 L65 155 Z" fill="${main}"/>
          <path d="M140 120 L170 140 L172 180 L145 175 L135 155 Z" fill="${main}"/>
          <!-- Cuffs -->
          <rect x="26" y="175" width="30" height="12" fill="${accent}" rx="3" opacity="0.7"/>
          <rect x="144" y="175" width="30" height="12" fill="${accent}" rx="3" opacity="0.7"/>
          <!-- Head -->
          <circle cx="100" cy="85" r="35" fill="#d4a574"/>
          <!-- Hair -->
          <path d="M65 75 Q100 50 135 75 L130 65 Q100 42 70 65 Z" fill="#3a2a1a"/>
          <!-- Collar -->
          <path d="M82 118 L100 135 L118 118 L114 112 L100 125 L86 112 Z" fill="#f0f0f0"/>
          <!-- Buttons -->
          <circle cx="100" cy="175" r="3" fill="${accent}" opacity="0.6"/>
          <circle cx="100" cy="195" r="3" fill="${accent}" opacity="0.6"/>
          <!-- Trousers -->
          <rect x="65" y="278" width="30" height="40" fill="#2c3e50" rx="3"/>
          <rect x="105" y="278" width="30" height="40" fill="#2c3e50" rx="3"/>
        </svg>
      `
    },
    hospitality: {
      label: 'Hospitality',
      svg: (main, accent) => `
        <svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 8px 20px rgba(0,0,0,0.4))">
          <!-- Main uniform body -->
          <path d="M60 120 L32 175 L32 280 L168 280 L168 175 L140 120 Z" fill="${main}"/>
          <!-- Vest/waistcoat -->
          <path d="M72 125 L100 125 L128 125 L122 250 L78 250 Z" fill="${accent}" opacity="0.85"/>
          <!-- White shirt sides -->
          <path d="M60 120 L72 125 L78 250 L45 250 L32 175 Z" fill="#f0f0f0"/>
          <path d="M140 120 L128 125 L122 250 L155 250 L168 175 Z" fill="#f0f0f0"/>
          <!-- Bow tie -->
          <path d="M92 120 L100 130 L108 120 L100 115 Z" fill="${accent}"/>
          <!-- Sleeves -->
          <path d="M60 120 L30 145 L28 185 L55 182 L68 155 Z" fill="${main}"/>
          <path d="M140 120 L170 145 L172 185 L145 182 L132 155 Z" fill="${main}"/>
          <!-- Head -->
          <circle cx="100" cy="85" r="34" fill="#d4a574"/>
          <!-- Hair -->
          <path d="M66 78 Q100 52 134 78" stroke="#3a2a1a" stroke-width="8" fill="none" stroke-linecap="round"/>
          <!-- Collar -->
          <path d="M84 118 L100 132 L116 118" stroke="#f0f0f0" stroke-width="3" fill="none"/>
          <!-- Pocket square -->
          <path d="M76 145 L86 145 L84 155 L78 155 Z" fill="${accent}" opacity="0.5"/>
          <!-- Buttons on vest -->
          <circle cx="100" cy="155" r="3" fill="${main}" opacity="0.5"/>
          <circle cx="100" cy="175" r="3" fill="${main}" opacity="0.5"/>
          <circle cx="100" cy="195" r="3" fill="${main}" opacity="0.5"/>
          <!-- Trousers -->
          <rect x="60" y="278" width="34" height="42" fill="#1a1a2e" rx="3"/>
          <rect x="106" y="278" width="34" height="42" fill="#1a1a2e" rx="3"/>
        </svg>
      `
    },
    medical: {
      label: 'Medical',
      svg: (main, accent) => `
        <svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 8px 20px rgba(0,0,0,0.4))">
          <!-- Scrub top -->
          <path d="M58 118 L30 165 L30 255 L170 255 L170 165 L142 118 Z" fill="${main}"/>
          <!-- V-neck -->
          <path d="M80 118 L100 148 L120 118 L110 112 L100 138 L90 112 Z" fill="${accent}" opacity="0.3"/>
          <!-- Sleeves -->
          <path d="M58 118 L28 145 L26 195 L55 190 L68 162 Z" fill="${main}"/>
          <path d="M142 118 L172 145 L174 195 L145 190 L132 162 Z" fill="${main}"/>
          <!-- Pocket -->
          <rect x="55" y="175" width="40" height="30" fill="${main}" rx="4" stroke="${accent}" stroke-width="1.5" stroke-opacity="0.4"/>
          <!-- Cross on pocket -->
          <rect x="72" y="182" width="6" height="16" fill="${accent}" rx="1" opacity="0.7"/>
          <rect x="66" y="188" width="18" height="6" fill="${accent}" rx="1" opacity="0.7"/>
          <!-- Scrub pants -->
          <rect x="62" y="253" width="32" height="67" fill="${main}" rx="4" style="filter: brightness(0.85)"/>
          <rect x="106" y="253" width="32" height="67" fill="${main}" rx="4" style="filter: brightness(0.85)"/>
          <!-- Drawstring -->
          <line x1="78" y1="256" x2="122" y2="256" stroke="${accent}" stroke-width="2" opacity="0.5"/>
          <!-- Head -->
          <circle cx="100" cy="83" r="35" fill="#d4a574"/>
          <!-- Hair/cap area -->
          <path d="M65 70 Q100 48 135 70 L135 78 Q100 58 65 78 Z" fill="#5a4a3a"/>
          <!-- Stethoscope -->
          <path d="M75 148 Q60 165 62 185 Q65 200 80 200 Q95 200 95 185" stroke="#c0c0c0" stroke-width="4" fill="none" stroke-linecap="round"/>
          <circle cx="95" cy="186" r="8" fill="${accent}" opacity="0.7" stroke="#f0f0f0" stroke-width="2"/>
        </svg>
      `
    },
    chef: {
      label: 'Chef/F&B',
      svg: (main, accent) => `
        <svg viewBox="0 0 200 340" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 8px 20px rgba(0,0,0,0.4))">
          <!-- Chef hat -->
          <ellipse cx="100" cy="38" rx="36" ry="12" fill="${main === '#f5f5f5' ? '#e0e0e0' : main}"/>
          <rect x="74" y="20" width="52" height="32" fill="${main === '#f5f5f5' ? '#f8f8f8' : main}" rx="4"/>
          <path d="M74 24 Q100 4 126 24" fill="${main === '#f5f5f5' ? '#f8f8f8' : main}"/>
          <ellipse cx="100" cy="22" rx="28" ry="14" fill="white" opacity="0.9"/>
          <!-- Chef coat body -->
          <path d="M62 118 L35 165 L35 285 L165 285 L165 165 L138 118 Z" fill="${main === '#f5f5f5' ? '#f4f4f4' : main}"/>
          <!-- Double-breasted buttons -->
          <circle cx="90" cy="150" r="5" fill="${accent}" opacity="0.8"/>
          <circle cx="110" cy="150" r="5" fill="${accent}" opacity="0.8"/>
          <circle cx="90" cy="175" r="5" fill="${accent}" opacity="0.8"/>
          <circle cx="110" cy="175" r="5" fill="${accent}" opacity="0.8"/>
          <circle cx="90" cy="200" r="5" fill="${accent}" opacity="0.8"/>
          <circle cx="110" cy="200" r="5" fill="${accent}" opacity="0.8"/>
          <!-- Collar -->
          <path d="M82 118 L100 140 L118 118" stroke="${accent}" stroke-width="2" fill="none" opacity="0.6"/>
          <!-- Sleeves -->
          <path d="M62 118 L32 145 L30 190 L58 188 L70 160 Z" fill="${main === '#f5f5f5' ? '#f4f4f4' : main}"/>
          <path d="M138 118 L168 145 L170 190 L142 188 L130 160 Z" fill="${main === '#f5f5f5' ? '#f4f4f4' : main}"/>
          <!-- Cuff stripes -->
          <rect x="28" y="185" width="32" height="5" fill="${accent}" rx="2" opacity="0.6"/>
          <rect x="140" y="185" width="32" height="5" fill="${accent}" rx="2" opacity="0.6"/>
          <!-- Pocket -->
          <rect x="120" y="155" width="30" height="22" fill="transparent" stroke="${accent}" stroke-width="1.5" opacity="0.4" rx="3"/>
          <!-- Head -->
          <circle cx="100" cy="92" r="32" fill="#d4a574"/>
          <!-- Checkered apron -->
          <rect x="70" y="215" width="60" height="70" fill="#2c3e50" opacity="0.15" rx="4"/>
          <!-- Trousers (black/white houndstooth suggestion) -->
          <rect x="62" y="283" width="32" height="57" fill="#1a1a1a" rx="3"/>
          <rect x="106" y="283" width="32" height="57" fill="#1a1a1a" rx="3"/>
        </svg>
      `
    },
    security: {
      label: 'Security',
      svg: (main, accent) => `
        <svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 8px 20px rgba(0,0,0,0.4))">
          <!-- Cap -->
          <ellipse cx="100" cy="55" rx="42" ry="10" fill="${main}" style="filter: brightness(0.8)"/>
          <rect x="60" y="44" width="80" height="16" fill="${main}" rx="3"/>
          <rect x="58" y="52" width="84" height="6" fill="${accent}" rx="2" opacity="0.8"/>
          <!-- Cap brim -->
          <path d="M55 58 L145 58 L148 65 L52 65 Z" fill="${main}" style="filter: brightness(0.7)"/>
          <!-- Badge on cap -->
          <path d="M100 46 L102 50 L106 50 L103 53 L104 57 L100 55 L96 57 L97 53 L94 50 L98 50 Z" fill="${accent}" opacity="0.9"/>
          <!-- Shirt/uniform body -->
          <path d="M60 120 L30 168 L30 278 L170 278 L170 168 L140 120 Z" fill="${main}"/>
          <!-- Epaulettes -->
          <rect x="28" y="120" width="36" height="12" fill="${accent}" rx="4" opacity="0.8"/>
          <rect x="136" y="120" width="36" height="12" fill="${accent}" rx="4" opacity="0.8"/>
          <!-- Front pocket & badge -->
          <rect x="105" y="150" width="42" height="30" fill="${main}" stroke="${accent}" stroke-width="1.5" opacity="0.6" rx="4"/>
          <path d="M126 158 L128 163 L133 163 L129 166 L131 171 L126 168 L121 171 L123 166 L119 163 L124 163 Z" fill="${accent}" opacity="0.85"/>
          <!-- Sleeves -->
          <path d="M60 120 L28 148 L26 190 L54 186 L68 155 Z" fill="${main}"/>
          <path d="M140 120 L172 148 L174 190 L146 186 L132 155 Z" fill="${main}"/>
          <!-- Stripes on sleeves -->
          <path d="M38 168 L60 158" stroke="${accent}" stroke-width="4" stroke-linecap="round" opacity="0.7"/>
          <path d="M38 178 L60 168" stroke="${accent}" stroke-width="4" stroke-linecap="round" opacity="0.7"/>
          <path d="M162 168 L140 158" stroke="${accent}" stroke-width="4" stroke-linecap="round" opacity="0.7"/>
          <path d="M162 178 L140 168" stroke="${accent}" stroke-width="4" stroke-linecap="round" opacity="0.7"/>
          <!-- Belt -->
          <rect x="30" y="245" width="140" height="14" fill="${accent}" rx="3" opacity="0.7"/>
          <rect x="93" y="246" width="14" height="12" fill="${main}" rx="2"/>
          <!-- Head -->
          <circle cx="100" cy="82" r="30" fill="#d4a574"/>
          <!-- Trousers -->
          <rect x="62" y="276" width="32" height="44" fill="${main}" rx="3" style="filter: brightness(0.85)"/>
          <rect x="106" y="276" width="32" height="44" fill="${main}" rx="3" style="filter: brightness(0.85)"/>
          <!-- Trouser stripe -->
          <line x1="78" y1="276" x2="78" y2="320" stroke="${accent}" stroke-width="3" opacity="0.6"/>
          <line x1="122" y1="276" x2="122" y2="320" stroke="${accent}" stroke-width="3" opacity="0.6"/>
        </svg>
      `
    },
    school: {
      label: 'School',
      svg: (main, accent) => `
        <svg viewBox="0 0 200 320" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 8px 20px rgba(0,0,0,0.4))">
          <!-- Blazer body -->
          <path d="M62 118 L34 165 L34 278 L166 278 L166 165 L138 118 Z" fill="${main}"/>
          <!-- White shirt -->
          <path d="M84 118 L100 118 L116 118 L116 260 L84 260 Z" fill="#f5f5f5"/>
          <!-- Lapels -->
          <path d="M84 118 L100 145 L116 118 L108 112 L100 138 L92 112 Z" fill="${main}"/>
          <!-- Tie -->
          <path d="M96 125 L104 125 L106 195 L100 202 L94 195 Z" fill="${accent}"/>
          <!-- Tie stripes -->
          <line x1="95" y1="140" x2="105" y2="140" stroke="white" stroke-width="2" opacity="0.5"/>
          <line x1="95" y1="155" x2="105" y2="155" stroke="white" stroke-width="2" opacity="0.5"/>
          <line x1="95" y1="170" x2="105" y2="170" stroke="white" stroke-width="2" opacity="0.5"/>
          <!-- Sleeves -->
          <path d="M62 118 L32 145 L30 185 L58 180 L72 152 Z" fill="${main}"/>
          <path d="M138 118 L168 145 L170 185 L142 180 L128 152 Z" fill="${main}"/>
          <!-- Cuffs (white) -->
          <rect x="28" y="180" width="32" height="10" fill="#f5f5f5" rx="3"/>
          <rect x="140" y="180" width="32" height="10" fill="#f5f5f5" rx="3"/>
          <!-- Chest pocket & logo -->
          <rect x="112" y="148" width="30" height="22" fill="${main}" stroke="${accent}" stroke-width="1.5" opacity="0.5" rx="3"/>
          <!-- School badge shape -->
          <path d="M127 153 L130 157 L135 157 L131 160 L133 165 L127 162 L121 165 L123 160 L119 157 L124 157 Z" fill="${accent}" opacity="0.7"/>
          <!-- Buttons -->
          <circle cx="100" cy="185" r="4" fill="${accent}" opacity="0.7"/>
          <circle cx="100" cy="205" r="4" fill="${accent}" opacity="0.7"/>
          <!-- Head -->
          <circle cx="100" cy="84" r="34" fill="#d4a574"/>
          <!-- Hair -->
          <path d="M66 76 Q100 52 134 76 L134 70 Q100 46 66 70 Z" fill="#3a2a1a"/>
          <!-- Trousers/skirt -->
          <rect x="60" y="276" width="34" height="44" fill="#2c3e50" rx="3"/>
          <rect x="106" y="276" width="34" height="44" fill="#2c3e50" rx="3"/>
        </svg>
      `
    }
  };

  let selectedCategory = 'corporate';
  let selectedMain = Object.values(COLORS)[0].hex;
  let selectedAccent = Object.values(ACCENT_COLORS)[0];
  let selectedMainName = Object.keys(COLORS)[0];
  let selectedAccentName = Object.keys(ACCENT_COLORS)[0];

  function init() {
    const canvas = document.querySelector('.preview-canvas');
    if (!canvas) return;

    buildColorSwatches();
    buildAccentSwatches();
    setupCategoryOptions();
    setupSendToCTA();
    renderPreview();
  }

  function buildColorSwatches() {
    const container = document.getElementById('main-color-swatches');
    if (!container) return;
    container.innerHTML = '';
    Object.entries(COLORS).forEach(([name, val], i) => {
      const swatch = document.createElement('div');
      swatch.className = 'color-swatch' + (i === 0 ? ' active' : '');
      swatch.style.background = val.hex;
      swatch.title = name;
      swatch.addEventListener('click', () => {
        container.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
        swatch.classList.add('active');
        selectedMain = val.hex;
        selectedMainName = name;
        animatePreview();
      });
      container.appendChild(swatch);
    });
  }

  function buildAccentSwatches() {
    const container = document.getElementById('accent-color-swatches');
    if (!container) return;
    container.innerHTML = '';
    Object.entries(ACCENT_COLORS).forEach(([name, hex], i) => {
      const swatch = document.createElement('div');
      swatch.className = 'color-swatch' + (i === 0 ? ' active' : '');
      swatch.style.background = hex;
      swatch.title = name;
      swatch.addEventListener('click', () => {
        container.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
        swatch.classList.add('active');
        selectedAccent = hex;
        selectedAccentName = name;
        animatePreview();
      });
      container.appendChild(swatch);
    });
  }

  function setupCategoryOptions() {
    const options = document.querySelectorAll('.ctrl-opt[data-category]');
    options.forEach(opt => {
      opt.addEventListener('click', () => {
        options.forEach(o => o.classList.remove('active'));
        opt.classList.add('active');
        selectedCategory = opt.getAttribute('data-category');
        animatePreview();
      });
    });
  }

  function renderPreview() {
    const canvas = document.querySelector('.preview-canvas');
    const silhouette = canvas?.querySelector('.uniform-silhouette');
    if (!silhouette) return;
    const uniform = UNIFORMS[selectedCategory] || UNIFORMS.corporate;
    silhouette.innerHTML = uniform.svg(selectedMain, selectedAccent);
    updatePreviewLabel();
  }

  function animatePreview() {
    const silhouette = document.querySelector('.uniform-silhouette');
    if (!silhouette) return;
    silhouette.style.opacity = '0';
    silhouette.style.transform = 'scale(0.95)';
    setTimeout(() => {
      renderPreview();
      silhouette.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      silhouette.style.opacity = '1';
      silhouette.style.transform = 'scale(1)';
    }, 200);
  }

  function updatePreviewLabel() {
    const label = document.getElementById('preview-label');
    if (label) {
      const cat = UNIFORMS[selectedCategory]?.label || selectedCategory;
      label.innerHTML = `<span style="color:var(--gold)">${cat}</span> · ${selectedMainName} + ${selectedAccentName} accents`;
    }
  }

  function setupSendToCTA() {
    const btn = document.getElementById('send-to-contact');
    if (!btn) return;
    btn.addEventListener('click', () => {
      const cat = UNIFORMS[selectedCategory]?.label || selectedCategory;
      const msg = document.getElementById('contact-message');
      if (msg) {
        msg.value = `I'm interested in ${cat} uniforms in ${selectedMainName} with ${selectedAccentName} accents. Please provide a quote.`;
      }
      document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ---- Initialize on DOM ready ----
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
