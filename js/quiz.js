/* =====================================================
   INDUSTRY QUIZ — 3-Step Interactive Feature
   ===================================================== */

(function () {
  'use strict';

  const QUIZ_DATA = {
    steps: [
      {
        id: 'industry',
        question: 'What industry are you in?',
        sub: 'Select the category that best describes your business',
        options: [
          { value: 'hospitality', label: 'Hospitality & Hotels', icon: '🏨' },
          { value: 'medical', label: 'Healthcare & Medical', icon: '🏥' },
          { value: 'corporate', label: 'Corporate & Office', icon: '💼' },
          { value: 'fb', label: 'Food & Beverage', icon: '🍽️' },
          { value: 'education', label: 'Education & Schools', icon: '🏫' },
          { value: 'security', label: 'Security & Industrial', icon: '🔒' },
        ]
      },
      {
        id: 'size',
        question: 'How large is your team?',
        sub: 'This helps us recommend the right package',
        options: [
          { value: 'small', label: '1 – 25 Staff', icon: '👥' },
          { value: 'medium', label: '26 – 100 Staff', icon: '🏢' },
          { value: 'large', label: '101 – 500 Staff', icon: '🏗️' },
          { value: 'enterprise', label: '500+ Staff', icon: '🌐' },
        ]
      },
      {
        id: 'priority',
        question: 'What matters most to you?',
        sub: 'We\'ll tailor our recommendation to your priority',
        options: [
          { value: 'quality', label: 'Premium Quality', icon: '⭐' },
          { value: 'price', label: 'Best Value', icon: '💰' },
          { value: 'speed', label: 'Fast Delivery', icon: '🚀' },
          { value: 'custom', label: 'Full Customization', icon: '🎨' },
        ]
      }
    ],
    results: {
      hospitality: {
        small:      { title: 'Boutique Hospitality Package', desc: 'Perfect for small hotels, B&Bs, or guesthouses. We offer elegant front-desk, housekeeping, and F&B uniforms with custom embroidery from 25 pieces.', tags: ['Front Desk', 'Housekeeping', 'F&B Service', 'Custom Logo'] },
        medium:     { title: 'Hotel Standard Package', desc: 'Ideal for mid-size hotels and resorts. Full range of hospitality uniforms with volume discounts and dedicated account manager.', tags: ['All Departments', 'Volume Discount', 'Account Manager', 'Fast Turnaround'] },
        large:      { title: 'Resort Premium Package', desc: 'For large hotel chains and resorts. Enterprise pricing, multi-location delivery, and priority production slots.', tags: ['Enterprise Pricing', 'Multi-location', 'Priority Production', 'Brand Compliance'] },
        enterprise: { title: 'Hotel Chain Enterprise', desc: 'For large hotel chains. Dedicated design team, SLA agreements, and distribution across all 7 Emirates of the UAE.', tags: ['Dedicated Team', 'SLA Agreement', 'UAE Distribution', 'Custom Fabric'] },
      },
      medical: {
        small:      { title: 'Clinic Starter Pack', desc: 'For small clinics and practices. Clean, professional medical scrubs, lab coats, and nursing uniforms from 25 pieces.', tags: ['Scrubs', 'Lab Coats', 'Easy-Care Fabric', 'Color-coded'] },
        medium:     { title: 'Medical Center Package', desc: 'For hospitals and medical centers. Department-specific color coding, antimicrobial fabrics, and embroidered logos.', tags: ['Antimicrobial', 'Color-coded Depts', 'Embroidery', 'Bulk Pricing'] },
        large:      { title: 'Hospital Enterprise Pack', desc: 'For large hospitals. ISO-certified fabrics, infection-control approved materials, and mass production capability.', tags: ['ISO Certified', 'Infection Control', 'Mass Production', 'Regulatory Compliant'] },
        enterprise: { title: 'Healthcare Network Solution', desc: 'For healthcare networks and chains. Centralized ordering, department budgeting, and nationwide distribution.', tags: ['Centralized Ordering', 'Budget Management', 'Nationwide Delivery', 'Dedicated Support'] },
      },
      corporate: {
        small:      { title: 'Startup Corporate Pack', desc: 'For startups and small offices. Professional corporate uniforms with your brand identity from a small quantity.', tags: ['Brand Identity', 'Smart Casuals', 'Formal Options', 'Quick Turnaround'] },
        medium:     { title: 'Business Corporate Suite', desc: 'For mid-size corporates. Full uniform suite with seasonal variations, employee sizing portal, and volume pricing.', tags: ['Seasonal Range', 'Size Portal', 'Volume Pricing', 'Multiple Styles'] },
        large:      { title: 'Enterprise Corporate Program', desc: 'For large organizations. Annual contract pricing, on-site measurement, and dedicated relationship manager.', tags: ['Annual Contract', 'On-site Service', 'Relationship Manager', 'Priority Stock'] },
        enterprise: { title: 'Corporate Mega Enterprise', desc: 'For MNCs and large corporations. Global branding compliance, multi-country sourcing, and ESG-friendly fabric options.', tags: ['Global Compliance', 'ESG Fabrics', 'Multi-country', 'Premium SLA'] },
      },
      fb: {
        small:      { title: 'Restaurant Starter Kit', desc: 'For cafes and small restaurants. Chef coats, waiter uniforms, and aprons with your logo from 25 pieces.', tags: ['Chef Coats', 'Waiter Uniforms', 'Aprons', 'Logo Embroidery'] },
        medium:     { title: 'F&B Mid-Scale Package', desc: 'For restaurant groups and catering companies. Food-safe fabrics, stain-resistant finishes, and custom color palettes.', tags: ['Stain Resistant', 'Food Safe', 'Custom Colors', 'Volume Discount'] },
        large:      { title: 'Restaurant Chain Package', desc: 'For restaurant chains. Standardized branding across locations, central ordering, and replacement programs.', tags: ['Standardized Branding', 'Chain-wide', 'Replacement Program', 'Fast Restock'] },
        enterprise: { title: 'F&B Enterprise Solution', desc: 'For hotel F&B operations and large catering firms. Celebrity chef brand collaborations and premium fabric options.', tags: ['Premium Fabrics', 'Celebrity Chefs', 'Full Customization', 'SLA Service'] },
      },
      education: {
        small:      { title: 'School Starter Package', desc: 'For small schools and academies. Smart, durable school uniforms with your school crest from 25 pieces.', tags: ['School Crest', 'Durable Fabric', 'Blazers & Ties', 'Multiple Sizes'] },
        medium:     { title: 'Academy Uniform Program', desc: 'For mid-size schools. Full uniform range including sports kits, PE uniforms, and formal attire with central ordering.', tags: ['Sports Kits', 'PE Uniforms', 'Central Ordering', 'Parent Portal'] },
        large:      { title: 'International School Suite', desc: 'For international schools. Premium fabrics, house color options, and GEMS/ADEK standard compliance.', tags: ['International Standards', 'House Colors', 'Regulatory Compliant', 'Premium Quality'] },
        enterprise: { title: 'Education Group Solution', desc: 'For school groups and university networks. Annual programs, multi-campus distribution, and scholarship uniform grants.', tags: ['Annual Program', 'Multi-campus', 'University Network', 'Scholarship Options'] },
      },
      security: {
        small:      { title: 'Security Startup Pack', desc: 'For small security firms. Professional security uniforms, hi-vis vests, and tactical accessories from 25 pieces.', tags: ['Security Uniforms', 'Hi-vis Vests', 'Tactical Gear', 'Custom Patches'] },
        medium:     { title: 'Security Company Package', desc: 'For security companies. Compliant uniforms with epaulettes, badges, and identification elements.', tags: ['SIRA Compliant', 'Epaulettes', 'Badge Holders', 'Rank Insignia'] },
        large:      { title: 'Security Enterprise Package', desc: 'For large security operations. Industrial workwear, personal protective equipment, and bulk uniform management.', tags: ['PPE Compliant', 'Industrial Grade', 'Bulk Management', 'UAE Standards'] },
        enterprise: { title: 'Security Mega Contract', desc: 'For national security and facility management companies. Government-level compliance and nationwide delivery infrastructure.', tags: ['Government Level', 'Nationwide Delivery', 'Full Compliance', 'Dedicated Account'] },
      },
    }
  };

  let currentStep = 0;
  let answers = {};

  function init() {
    const quizContainer = document.getElementById('quiz-container');
    if (!quizContainer) return;

    renderStep(0);
  }

  function renderStep(stepIndex) {
    const container = document.getElementById('quiz-container');
    if (!container) return;

    // Update progress
    const progressFill = document.getElementById('quiz-progress-fill');
    const stepLabel = document.getElementById('quiz-step-label');
    if (progressFill) progressFill.style.width = `${((stepIndex) / QUIZ_DATA.steps.length) * 100}%`;
    if (stepLabel) stepLabel.textContent = `Step ${stepIndex + 1} of ${QUIZ_DATA.steps.length}`;

    const step = QUIZ_DATA.steps[stepIndex];
    container.innerHTML = `
      <div class="quiz-screen active" id="quiz-step-${stepIndex}">
        <div class="quiz-question">${step.question}</div>
        <div class="quiz-sub">${step.sub}</div>
        <div class="quiz-options" id="quiz-options-${stepIndex}">
          ${step.options.map(opt => `
            <div class="quiz-option" data-value="${opt.value}" role="button" tabindex="0" aria-label="${opt.label}">
              <div class="quiz-opt-icon">${opt.icon}</div>
              <div class="quiz-opt-text">${opt.label}</div>
            </div>
          `).join('')}
        </div>
        <div class="quiz-btn-row">
          ${stepIndex > 0 ? `<button class="btn-outline" id="quiz-back" style="padding:12px 24px;font-size:13px">← Back</button>` : ''}
          <button class="btn-primary" id="quiz-next" disabled style="padding:12px 24px;font-size:13px">
            ${stepIndex === QUIZ_DATA.steps.length - 1 ? 'See My Recommendation →' : 'Next →'}
          </button>
        </div>
      </div>
    `;

    // Bind option clicks
    const options = container.querySelectorAll('.quiz-option');
    options.forEach(opt => {
      const activate = () => {
        options.forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
        answers[step.id] = opt.getAttribute('data-value');
        document.getElementById('quiz-next').disabled = false;
      };
      opt.addEventListener('click', activate);
      opt.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') activate(); });
    });

    // Next button
    document.getElementById('quiz-next')?.addEventListener('click', () => {
      if (!answers[step.id]) return;
      if (stepIndex < QUIZ_DATA.steps.length - 1) {
        currentStep++;
        renderStep(currentStep);
      } else {
        showResult();
      }
    });

    // Back button
    document.getElementById('quiz-back')?.addEventListener('click', () => {
      currentStep--;
      renderStep(currentStep);
    });
  }

  function showResult() {
    const container = document.getElementById('quiz-container');
    if (!container) return;

    const progressFill = document.getElementById('quiz-progress-fill');
    const stepLabel = document.getElementById('quiz-step-label');
    if (progressFill) progressFill.style.width = '100%';
    if (stepLabel) stepLabel.textContent = 'Complete!';

    const industry = answers.industry || 'corporate';
    const size = answers.size || 'medium';
    const resultData = QUIZ_DATA.results[industry]?.[size] || {
      title: 'Custom Uniform Solution',
      desc: 'Based on your answers, our team will create a fully customized proposal tailored to your needs.',
      tags: ['Custom Solution', 'Expert Consultation', 'Premium Quality', 'Competitive Pricing']
    };

    const industryOption = QUIZ_DATA.steps[0].options.find(o => o.value === industry);
    const icon = industryOption?.icon || '✨';

    container.innerHTML = `
      <div class="quiz-result">
        <div class="quiz-result-icon">${icon}</div>
        <div class="quiz-result-title">${resultData.title}</div>
        <div class="quiz-result-text">${resultData.desc}</div>
        <div class="quiz-result-tags">
          ${resultData.tags.map(tag => `<span class="result-tag">${tag}</span>`).join('')}
        </div>
        <div style="display:flex; gap:12px; justify-content:center; flex-wrap:wrap;">
          <button class="btn-primary" id="quiz-get-quote" style="padding:14px 28px; font-size:14px">
            <span>Get My Quote</span> →
          </button>
          <button class="btn-outline" id="quiz-restart" style="padding:13px 28px; font-size:13px">
            Start Over
          </button>
        </div>
      </div>
    `;

    // Pre-fill contact form with quiz result
    const contactMsg = document.getElementById('contact-message');
    if (contactMsg) {
      const sizeLabels = { small: '1-25', medium: '26-100', large: '101-500', enterprise: '500+' };
      contactMsg.value = `Quiz Result: ${resultData.title}\n\nIndustry: ${industryOption?.label || industry}\nTeam Size: ${sizeLabels[size] || size} staff\nPriority: ${answers.priority || 'quality'}\n\nPlease provide a tailored quote for our uniform requirements.`;
    }

    document.getElementById('quiz-get-quote')?.addEventListener('click', () => {
      document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
    });

    document.getElementById('quiz-restart')?.addEventListener('click', () => {
      currentStep = 0;
      answers = {};
      renderStep(0);
    });
  }

  // Initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
