/* =====================================================
   AI CHATBOT — Smart FAQ + Lead Capture
   ===================================================== */

(function () {
  'use strict';

  // ---- Configuration ----
  const BOT_NAME = 'UniBot';
  const TYPING_DELAY_MIN = 700;
  const TYPING_DELAY_MAX = 1400;
  const GROQ_API_KEY = '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'; // Replace with your actual gsk_... key

  // ---- Knowledge Base ----
  const KB = {
    greetings: {
      patterns: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'howdy', 'salaam', 'مرحبا'],
      response: () => `Hello! 👋 Welcome to **Uniform Express LLC**, Dubai's premier uniform solutions provider.\n\nI'm UniBot, your AI assistant. How can I help you today?`,
      quickReplies: ['Our Products', 'Get a Quote', 'Industries We Serve', 'Contact Details']
    },
    products: {
      patterns: ['product', 'uniform', 'what do you sell', 'catalog', 'range', 'type', 'offer', 'make'],
      response: () => `We offer a comprehensive range of premium uniforms: 🎽\n\n• **🏨 Hotel & Hospitality** — Front desk, housekeeping, F&B\n• **🏥 Medical & Healthcare** — Scrubs, lab coats, surgical\n• **💼 Corporate & Office** — Formal workwear, blazers\n• **🍳 F&B & Restaurants** — Chef coats, waiter uniforms\n• **🏫 Schools & Academies** — Smart school uniforms\n• **🔒 Security & Industrial** — Hi-vis vests, coveralls\n\nAll uniforms are fully customizable with your logo & brand colors!`,
      quickReplies: ['Customization Options', 'MOQ Details', 'Get a Quote', 'See Gallery']
    },
    quote: {
      patterns: ['price', 'cost', 'quote', 'pricing', 'how much', 'rate', 'estimate', 'budget'],
      response: () => `Our pricing depends on quantity, choice of fabric, and custom design details. 💰\n\nTo request an accurate quote, please:\n• Fill out our online **Quote Form** or use the **Quote Estimator** below\n• Call or WhatsApp us at **04 341 1178**\n• Visit our showroom at **Building, Al Waha Community - No.1015 - Dubai Festival City - Dubai**`,
      quickReplies: ['Use Quote Estimator', 'Contact Sales Team', 'MOQ Details', 'Fabric Options']
    },
    moq: {
      patterns: ['moq', 'minimum', 'min order', 'minimum order', 'how many', 'quantity'],
      response: () => `Our Minimum Order Quantities: 📦\n\n• **25 pcs** — Small businesses & startups\n• **50-100 pcs** — Standard orders (volume discount applies)\n• **200+ pcs** — Premium bulk pricing\n• **500+ pcs** — Enterprise tier with special rates\n\nWe cater to businesses of all sizes — from boutique hotels to large healthcare chains!`,
      quickReplies: ['Get a Quote', 'Delivery Time', 'Customization Options']
    },
    customization: {
      patterns: ['custom', 'logo', 'brand', 'color', 'design', 'embroider', 'print', 'personalize'],
      response: () => `All our uniforms are fully customizable (logo embroidery, screen printing, custom fabric matching)! 🎨\n\nTo submit a customization request:\n• Fill out our online **Quote Form** below\n• Call or WhatsApp our design team at **04 341 1178**\n• Visit us at **Building, Al Waha Community - No.1015 - Dubai Festival City - Dubai**`,
      quickReplies: ['Try Customizer', 'Fabric Options', 'Get a Quote']
    },
    order: {
      patterns: ['order', 'buy', 'purchase', 'place order', 'deal', 'ordering', 'shop', 'get uniform'],
      response: () => `To place an order or buy custom uniforms for your team: 🛍️\n\n• Fill out the online **Request a Free Quote** form below\n• Call or WhatsApp us directly at **04 341 1178**\n• Visit our office at **Building, Al Waha Community - No.1015 - Dubai Festival City - Dubai**\n\nOur team will assist you from concept and sizing to final delivery!`,
      quickReplies: ['Get a Quote', 'WhatsApp Us', 'MOQ Details', 'See Products']
    },
    delivery: {
      patterns: ['delivery', 'lead time', 'how long', 'ship', 'timeline', 'when', 'days', 'weeks'],
      response: () => `Our production & delivery timelines: 🚚\n\n• **Sample/Proto** — 7-10 business days\n• **Standard Order** — 3-4 weeks after approval\n• **Bulk Orders (500+)** — 5-6 weeks\n• **Express (Rush)** — 2 weeks (surcharge applies)\n\nWe deliver across the **UAE**. Free delivery for orders above AED 5,000 within Dubai!`,
      quickReplies: ['Get a Quote', 'Contact Us', 'MOQ Details']
    },
    contact: {
      patterns: ['contact', 'phone', 'email', 'address', 'location', 'visit', 'reach', 'whatsapp', 'call'],
      response: () => `Get in touch with us: 📞\n\n📍 **Location:** Building, Al Waha Community - No.1015 - Dubai Festival City - Dubai\n📧 **Email:** info@uniformexpress.ae\n📱 **Phone / WhatsApp:** 04 341 1178\n🕒 **Hours:** Mon-Sat, 7:30 AM – 4:30 PM GST\n\nYou can also fill out the **Contact Form** on our website and our team will respond within 2 hours!`,
      quickReplies: ['Open Contact Form', 'WhatsApp Us', 'Get a Quote']
    },
    industries: {
      patterns: ['industry', 'hotel', 'hospital', 'restaurant', 'school', 'aviation', 'corporate', 'security', 'who do you serve'],
      response: () => `We proudly serve these industries across the UAE: 🌟\n\n🏨 **Hospitality** — 5-star hotels, resorts, serviced apartments\n🏥 **Healthcare** — Hospitals, clinics, pharmacies\n💼 **Corporate** — Offices, banks, real estate firms\n✈️ **Aviation** — Ground crew, cabin crew accessories\n🍽️ **F&B** — Fine dining, cafes, catering companies\n🏫 **Education** — International schools, universities\n🔒 **Security** — Guard uniforms, industrial workwear\n\nNo matter your sector, we have the perfect solution!`,
      quickReplies: ['Try Industry Quiz', 'See Products', 'Get a Quote']
    },
    quality: {
      patterns: ['quality', 'fabric', 'material', 'durable', 'washable', 'standard', 'certificate', 'iso'],
      response: () => `Quality is our foundation: 🏆\n\n**Fabric Standards:**\n• ISO-certified fabric suppliers\n• Anti-wrinkle & easy-care finishes\n• Breathable for UAE's climate\n• Fade-resistant color technology\n\n**Our Standards:**\n• Strict quality control at every stage\n• Pre-shipment inspection & approval\n• 90-day quality guarantee\n• Free replacements for manufacturing defects\n\nWe've served 500+ businesses with a 98% satisfaction rate!`,
      quickReplies: ['Get a Quote', 'Our Certifications', 'Contact Us']
    },
    thanks: {
      patterns: ['thank', 'thanks', 'appreciate', 'great', 'awesome', 'perfect', 'helpful', 'good'],
      response: () => `You're very welcome! 😊 It's our pleasure to assist you.\n\nIs there anything else I can help you with? We're always here to ensure you get the **perfect uniform solution** for your business!`,
      quickReplies: ['Get a Quote', 'Contact Sales', 'Browse Products']
    },
    fallback: {
      response: () => `That's a great question! I'm still learning some details. 🤔\n\nFor the most accurate answer, I recommend:\n\n1. **Browse** our website sections above\n2. **Contact our team** directly via WhatsApp or email\n3. **Fill out** the contact form — we respond in 2 hours!\n\nOur human experts will be happy to assist you personally! 😊`,
      quickReplies: ['Contact Our Team', 'WhatsApp Us', 'See Products', 'Get a Quote']
    }
  };

  // ---- Action handlers for quick replies ----
  const QUICK_ACTIONS = {
    'Our Products': () => { scrollToSection('#products'); addMessage('bot', "I've scrolled to our **Products** section — check out our full range!"); },
    'Get a Quote': () => { scrollToSection('#contact'); addMessage('bot', "I've scrolled you to our **Request Quote form**! Please fill in your details and our team will get back to you with an exact quote."); },
    'Industries We Serve': () => { scrollToSection('#industries'); addMessage('bot', "Check out the **Industries** section to see all the sectors we serve!"); },
    'Contact Details': () => { scrollToSection('#contact'); addMessage('bot', "Our full **contact information** is right there — or send a WhatsApp!"); },
    'Try Customizer': () => { scrollToSection('#customizer'); addMessage('bot', "Opening our **Uniform Customizer** — pick your colors and style!"); },
    'Try Industry Quiz': () => { scrollToSection('#quiz'); addMessage('bot', "Our **Industry Quiz** will recommend the perfect uniform for you!"); },
    'Use Quote Estimator': () => { scrollToSection('#quote'); addMessage('bot', "Use the slider to estimate your order — our team will provide an exact quote!"); },
    'Open Contact Form': () => { scrollToSection('#contact'); addMessage('bot', "Scrolled to the contact form! Fill it in and we'll respond within 2 hours. ✉️"); },
    'WhatsApp Us': () => { window.open('https://wa.me/97143411178', '_blank'); addMessage('bot', "Opening WhatsApp — our team will respond shortly! 📱"); },
    'See Gallery': () => { scrollToSection('#gallery'); addMessage('bot', "Here's our **Lookbook Gallery** — browse our work!"); },
    'See Products': () => { scrollToSection('#products'); addMessage('bot', "Here's our **Products** section!"); },
    'Contact Sales Team': () => { scrollToSection('#contact'); addMessage('bot', "Opening the contact section — let's connect you with our sales team!"); },
    'Contact Us': () => { scrollToSection('#contact'); addMessage('bot', "Here's our contact information. We'd love to hear from you!"); },
    'Contact Our Team': () => { scrollToSection('#contact'); addMessage('bot', "Our team is ready to help! Fill in the contact form or WhatsApp us."); },
    'Browse Products': () => { scrollToSection('#products'); addMessage('bot', "Here's everything we offer!"); },
    'MOQ Details': () => { processMessage('moq details'); },
    'Customization Options': () => { processMessage('customization options'); },
    'Fabric Options': () => { processMessage('fabric and material options'); },
    'Delivery Time': () => { processMessage('delivery timeline'); },
    'Our Certifications': () => { processMessage('quality certifications'); },
  };

  // ---- State ----
  let chatOpen    = false;
  let chatMinimized = false;
  let messageCount = 0;
  let greeted     = false;

  // ---- DOM Elements ----
  const trigger   = document.getElementById('chat-trigger');
  const chatWindow= document.getElementById('chat-window');
  const chatBody  = document.querySelector('.chat-body');
  const chatInput = document.getElementById('chat-input');
  const chatSend  = document.getElementById('chat-send');
  const minimizeBtn = chatWindow?.querySelector('.chat-action-btn');

  if (!trigger || !chatWindow) return;

  // ---- Init ----
  function init() {
    trigger.addEventListener('click', toggleChat);
    chatSend.addEventListener('click', handleSend);
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    });
    chatInput.addEventListener('input', () => {
      chatInput.style.height = 'auto';
      chatInput.style.height = Math.min(chatInput.scrollHeight, 80) + 'px';
    });

    // Minimize button — collapses body/footer but keeps header visible
    minimizeBtn?.addEventListener('click', (e) => {
      if (e) e.stopPropagation();
      chatMinimized = !chatMinimized;
      chatWindow.classList.toggle('minimized', chatMinimized);
      
      const body   = chatWindow.querySelector('.chat-body');
      const footer = chatWindow.querySelector('.chat-footer');
      if (chatMinimized) {
        if (body) body.style.display = 'none';
        if (footer) footer.style.display = 'none';
        minimizeBtn.innerHTML = '&#x25A2;'; // restore icon (square)
        minimizeBtn.title = 'Restore chat';
        minimizeBtn.setAttribute('aria-label', 'Restore chat');
      } else {
        if (body) body.style.display = '';
        if (footer) footer.style.display = '';
        minimizeBtn.innerHTML = '&mdash;'; // minimize icon (dash)
        minimizeBtn.title = 'Minimize chat';
        minimizeBtn.setAttribute('aria-label', 'Minimize chat');
      }
    });

    // Also toggle minimize when clicking the header background
    const chatHeader = chatWindow.querySelector('.chat-header');
    chatHeader?.addEventListener('click', (e) => {
      if (e.target.closest('.chat-action-btn')) return;
      minimizeBtn?.click();
    });

    // Escape key closes the chat
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && chatOpen) toggleChat();
    });
  }

  function toggleChat() {
    chatOpen = !chatOpen;
    trigger.classList.toggle('open', chatOpen);
    chatWindow.classList.toggle('open', chatOpen);

    // If closing chat, restore minimize state so it starts fresh next time
    if (!chatOpen && chatMinimized) {
      chatMinimized = false;
      chatWindow.classList.remove('minimized');
      const body   = chatWindow.querySelector('.chat-body');
      const footer = chatWindow.querySelector('.chat-footer');
      if (body) body.style.display = '';
      if (footer) footer.style.display = '';
      if (minimizeBtn) {
        minimizeBtn.innerHTML = '&mdash;';
        minimizeBtn.title = 'Minimize chat';
        minimizeBtn.setAttribute('aria-label', 'Minimize chat');
      }
    }

    if (chatOpen && !greeted) {
      greeted = true;
      setTimeout(() => {
        addDateDivider();
        const removeTyping = showTypingIndicator();
        setTimeout(() => {
          removeTyping();
          addMessage('bot',
            `👋 Hi! I'm **UniBot**, your AI assistant at **Uniform Express LLC**.\n\nI can help you with product information, pricing, customization, and more. What can I assist you with today?`,
            ['Our Products', 'Get a Quote', 'Industries We Serve', 'Contact Details']
          );
        }, 1000);
      }, 400);
    }

    if (chatOpen) chatInput.focus();
  }

  function handleSend() {
    const text = chatInput.value.trim();
    if (!text) return;
    chatInput.value = '';
    chatInput.style.height = 'auto';
    addMessage('user', text);
    processMessage(text);
  }

  // ---- Groq AI Integration ----
  const SYSTEM_PROMPT = `You are UniBot, the premium, professional, and friendly AI assistant for Uniform Express LLC in Dubai, UAE (established in 2005).

Your guidelines:
1. Provide accurate details about Uniform Express's custom uniform manufacturing services for:
   - Hospitality & Hotels (front desk, housekeeping, F&B)
   - Healthcare & Medical (scrubs, lab coats, surgical wear)
   - Corporate & Office (blazers, shirts, formal workwear)
   - Food & Beverage (chef coats, waiter uniforms)
   - Education & Schools (school uniforms)
   - Security & Industrial (hi-vis, coveralls)
2. Always keep your tone professional, business-focused, and welcoming.
3. Keep responses concise, well-formatted, and easy to read using Markdown (e.g. bullet points and bold text). Emojis are welcome.
4. Business Policies:
   - Minimum Order Quantity (MOQ): 25 pieces per category.
   - Lead time: 3-4 weeks standard, 2 weeks express (rush surcharge).
   - Customization: Full logo embroidery, printing, and brand color customizer available.
5. Sizing, Ordering, Customization, & Quote Requests:
   - If the user asks about placing an order, buying uniforms, customizing uniforms, requesting quotes, pricing, order process, or similar transaction-related inquiries, you MUST instruct them to:
     a) Use our online "Request a Free Quote" form / "Quote Estimator" on the website.
     b) Call or WhatsApp us at: 04 341 1178.
     c) Visit us at our physical location: Building, Al Waha Community - No.1015 - Dubai Festival City - Dubai.
     Example instruction: "Please fill out our Request Quote form on the page, call us at 04 341 1178, or visit our office at Building, Al Waha Community - No.1015 - Dubai Festival City - Dubai."
6. Content Moderation & Respectful Behavior:
   - If the user uses rude words, slang, profanity (e.g. "shit", "fuck", or other insults), or behaves inappropriately, DO NOT reply with standard template fallback answers.
   - Instead, politely, firmly, and professionally remind them that you are here to assist with uniform solutions for their business, and request that they maintain a professional conversation. Example response: "I am here to assist you with high-quality uniform solutions for your business. Please let me know if you have any questions about our products, customization options, or quote estimator."
7. Always return your output in JSON format with the following keys:
   - "response": Your formatted text response to the user.
   - "quickReplies": An array of 2 to 4 short button labels (2-3 words max each) relevant to the context, such as ["Our Products", "Get a Quote", "Contact Us"].
   
Example JSON output:
{
  "response": "Hello! How can I assist you today?",
  "quickReplies": ["Our Products", "Get a Quote", "Contact Details"]
}`;

  async function fetchGroqResponse(text, apiKey) {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: text }
        ],
        response_format: { type: 'json_object' },
        temperature: 0.5,
        max_tokens: 600
      })
    });

    if (!response.ok) {
      throw new Error(`Groq API responded with status ${response.status}`);
    }

    const data = await response.json();
    const parsed = JSON.parse(data.choices[0].message.content.trim());
    return {
      text: parsed.response,
      quickReplies: parsed.quickReplies || []
    };
  }

  async function processMessage(text) {
    const removeTyping = showTypingIndicator();
    
    // Simulate natural typing delay (minimum 600ms)
    const delayPromise = new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 600));
    
    let botResponse = null;
    let quickReplies = null;
    
    // Retrieve Groq API key (checks the constant first, then falls back to localStorage)
    const apiKey = (GROQ_API_KEY && GROQ_API_KEY !== 'YOUR_GROQ_API_KEY') ? GROQ_API_KEY : localStorage.getItem('GROQ_API_KEY');
    
    if (apiKey && apiKey !== 'YOUR_GROQ_API_KEY') {
      try {
        const groqData = await fetchGroqResponse(text, apiKey);
        botResponse = groqData.text;
        quickReplies = groqData.quickReplies;
      } catch (err) {
        console.error('Groq API failed, falling back to local KB:', err);
      }
    }
    
    if (!botResponse) {
      const normalized = text.toLowerCase();
      let matched = null;
      for (const [key, entry] of Object.entries(KB)) {
        if (key === 'fallback') continue;
        if (entry.patterns && entry.patterns.some(p => normalized.includes(p))) {
          matched = entry;
          break;
        }
      }
      if (!matched) matched = KB.fallback;
      botResponse = matched.response();
      quickReplies = matched.quickReplies || KB.fallback.quickReplies;
    }
    
    // Wait for the minimal typing delay to look natural
    await delayPromise;
    
    removeTyping();
    addMessage('bot', botResponse, quickReplies);
  }

  function addMessage(role, text, quickReplies = null) {
    const msg = document.createElement('div');
    msg.className = `chat-msg ${role}`;

    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble';
    bubble.innerHTML = formatText(text);

    const time = document.createElement('div');
    time.className = 'chat-time';
    time.textContent = getCurrentTime();

    msg.appendChild(bubble);
    msg.appendChild(time);

    if (quickReplies && role === 'bot') {
      const qr = document.createElement('div');
      qr.className = 'quick-replies';
      quickReplies.forEach(reply => {
        const btn = document.createElement('button');
        btn.className = 'quick-reply';
        btn.textContent = reply;
        btn.addEventListener('click', () => {
          addMessage('user', reply);
          if (QUICK_ACTIONS[reply]) {
            QUICK_ACTIONS[reply]();
          } else {
            processMessage(reply);
          }
        });
        qr.appendChild(btn);
      });
      msg.appendChild(qr);
    }

    chatBody.appendChild(msg);
    scrollToBottom();
    messageCount++;
  }

  function showTypingIndicator() {
    const typing = document.createElement('div');
    typing.className = 'chat-msg bot';
    typing.id = 'typing-indicator';
    const indicator = document.createElement('div');
    indicator.className = 'typing-indicator';
    for (let i = 0; i < 3; i++) {
      const dot = document.createElement('div');
      dot.className = 'typing-dot';
      indicator.appendChild(dot);
    }
    typing.appendChild(indicator);
    chatBody.appendChild(typing);
    scrollToBottom();

    return () => {
      const t = document.getElementById('typing-indicator');
      if (t) t.remove();
    };
  }

  function addDateDivider() {
    const div = document.createElement('div');
    div.className = 'chat-date';
    div.textContent = 'Today';
    chatBody.appendChild(div);
  }

  function scrollToBottom() {
    requestAnimationFrame(() => {
      chatBody.scrollTop = chatBody.scrollHeight;
    });
  }

  function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  }

  function formatText(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>');
  }

  function scrollToSection(selector) {
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Optionally close chat on mobile
      if (window.innerWidth <= 768) {
        chatOpen = false;
        trigger.classList.remove('open');
        chatWindow.classList.remove('open');
      }
    }
  }

  init();

  console.log("%c🤖 UniBot AI Enabled! To configure advanced Llama 3.1 AI via Groq, run: localStorage.setItem('GROQ_API_KEY', 'your_key_here')", "color: #E07B39; font-weight: bold;");

})();
