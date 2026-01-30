

// Helper functions
const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => Array.from(parent.querySelectorAll(selector));

// Toast notification system
class Toast {
  constructor() {
    this.toast = $('#toast');
    this.timeout = null;
  }
  
  show(message, type = 'info', duration = 3000) {
    // Clear any existing timeout
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    
    // Set message and type
    this.toast.textContent = message;
    this.toast.className = 'toast';
    this.toast.classList.add(type);
    
    // Show toast
    this.toast.classList.add('show');
    
    // Auto hide after duration
    this.timeout = setTimeout(() => {
      this.hide();
    }, duration);
  }
  
  hide() {
    this.toast.classList.remove('show');
  }
}

const toast = new Toast();

// Current year in footer
$('#year').textContent = new Date().getFullYear();

// Mobile navigation
const burger = $('#burger');
const nav = $('#nav');

burger.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  burger.setAttribute('aria-expanded', isOpen);
  burger.classList.toggle('active');
  
  // Update burger animation
  const spans = $$('span', burger);
  if (isOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
  } else {
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  }
});

// Close mobile nav when clicking a link
$$('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    burger.classList.remove('active');
    const spans = $$('span', burger);
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  });
});

// Theme toggle
const themeBtn = $('#themeBtn');
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  
  // Update button text
  const dot = $('.dot', themeBtn);
  const text = $('span:last-child', themeBtn);
  
  if (theme === 'night') {
    dot.style.background = 'linear-gradient(135deg, #fbbf24, #f59e0b)';
    text.textContent = 'Light Mode';
    toast.show('Night mode enabled', 'success');
  } else {
    dot.style.background = 'linear-gradient(135deg, var(--primary), var(--secondary))';
    text.textContent = 'Dark Mode';
    toast.show('Light mode enabled', 'success');
  }
}

// Initialize theme
const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);

themeBtn.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'night' ? 'light' : 'night';
  setTheme(newTheme);
});

// Scroll reveal animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
    }
  });
}, observerOptions);

// Observe all elements with data-reveal attribute
$$('[data-reveal]').forEach(el => observer.observe(el));

// Animated counters
function animateCounter(element, target, duration = 2000) {
  const start = parseFloat(element.textContent) || 0;
  const increment = target / (duration / 16); // 60fps
  
  let current = start;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target.toFixed(target % 1 === 0 ? 0 : 1);
      clearInterval(timer);
    } else {
      element.textContent = current.toFixed(target % 1 === 0 ? 0 : 1);
    }
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const element = entry.target;
      const target = parseFloat(element.getAttribute('data-count'));
      
      if (!element.hasAttribute('data-animated')) {
        element.setAttribute('data-animated', 'true');
        animateCounter(element, target);
      }
    }
  });
}, { threshold: 0.5 });

// Observe counter elements
$$('.stat-number[data-count]').forEach(el => counterObserver.observe(el));

// Form handling
$('#bookingForm').addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Get form data
  const formData = new FormData(e.target);
  const service = formData.get('service') || $('#service').value;
  const location = $('#location').value;
  
  // Simulate API call
  toast.show(`Searching for ${service} providers in ${location}...`, 'info');
  
  // Show loading state
  const submitBtn = $('button[type="submit"]', e.target);
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';
  submitBtn.disabled = true;
  
  // Simulate delay
  setTimeout(() => {
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
    
    // Show results toast
    toast.show('Found 5 available providers! Redirecting...', 'success');
    
    // Redirect to booking page (simulated)
    setTimeout(() => {
      window.location.hash = '#providers-list';
    }, 1500);
  }, 2000);
});

// Lead form
$('#leadForm').addEventListener('submit', (e) => {
  e.preventDefault();
  
  const email = e.target.querySelector('input[type="email"]').value;
  const name = e.target.querySelector('input[type="text"]')?.value || 'there';
  
  // Show loading
  const submitBtn = $('button[type="submit"]', e.target);
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
  submitBtn.disabled = true;
  
  // Simulate API call
  setTimeout(() => {
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
    e.target.reset();
    
    // Show success message
    toast.show(`Welcome ${name}! Check your email for next steps.`, 'success');
    
    // Track conversion (simulated)
    console.log('Lead captured:', { email, name, timestamp: new Date().toISOString() });
  }, 1500);
});

// Pricing toggle
const pricingToggle = $('#pricingToggle');
if (pricingToggle) {
  pricingToggle.addEventListener('change', (e) => {
    const isYearly = e.target.checked;
    const monthlyPrices = [0, 9, 29];
    const yearlyPrices = monthlyPrices.map(price => Math.floor(price * 12 * 0.8));
    
    $$('.price-amount').forEach((element, index) => {
      const price = isYearly ? yearlyPrices[index] : monthlyPrices[index];
      element.textContent = `$${price}`;
      
      // Animate price change
      element.style.transform = 'scale(1.1)';
      setTimeout(() => {
        element.style.transform = 'scale(1)';
      }, 300);
    });
    
    // Update period text
    $$('.price-period').forEach(element => {
      element.textContent = isYearly ? '/year' : '/month';
    });
  });
}

// FAQ accordion
$$('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const item = question.parentElement;
    const isActive = item.classList.contains('active');
    
    // Close all other items
    $$('.faq-item').forEach(otherItem => {
      if (otherItem !== item) {
        otherItem.classList.remove('active');
      }
    });
    
    // Toggle current item
    item.classList.toggle('active', !isActive);
  });
});

// Chat functionality
const chatWidget = $('#chatWidget');
const chatModal = $('#chatModal');
const closeChat = $('#closeChat');

chatWidget.addEventListener('click', () => {
  chatModal.classList.add('active');
  chatWidget.style.opacity = '0.5';
});

closeChat.addEventListener('click', () => {
  chatModal.classList.remove('active');
  chatWidget.style.opacity = '1';
});

// Close chat when clicking outside
document.addEventListener('click', (e) => {
  if (!chatModal.contains(e.target) && !chatWidget.contains(e.target)) {
    chatModal.classList.remove('active');
    chatWidget.style.opacity = '1';
  }
});

// Auto-reply in chat
const sendBtn = $('.send-btn');
const chatInput = $('.chat-input input');

sendBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
  const message = chatInput.value.trim();
  if (!message) return;
  
  // Add user message
  addMessage(message, 'user');
  chatInput.value = '';
  
  // Auto-reply after delay
  setTimeout(() => {
    const replies = [
      "I can help you book a service! What type of service do you need?",
      "Our providers are available 24/7. Would you like to see available time slots?",
      "You can book instantly through our platform. Need help with a specific service?",
      "We offer a 100% satisfaction guarantee on all bookings. How can I assist you today?"
    ];
    const randomReply = replies[Math.floor(Math.random() * replies.length)];
    addMessage(randomReply, 'bot');
  }, 1000);
}

function addMessage(text, sender) {
  const chatBody = $('.chat-body');
  const messageDiv = document.createElement('div');
  messageDiv.className = `chat-message ${sender}`;
  
  messageDiv.innerHTML = `
    <div class="message-avatar">${sender === 'bot' ? 'B' : 'U'}</div>
    <div class="message-content">
      <div class="message-text">${text}</div>
      <div class="message-time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
    </div>
  `;
  
  chatBody.appendChild(messageDiv);
  chatBody.scrollTop = chatBody.scrollHeight;
}

// Video player
const playButton = $('#playVideo');
if (playButton) {
  playButton.addEventListener('click', () => {
    // In a real implementation, this would play a video
    toast.show('Playing demo video...', 'info');
    
    // Simulate video play
    playButton.innerHTML = '<i class="fas fa-pause"></i>';
    playButton.style.background = 'rgba(0,0,0,0.7)';
    
    // Reset after "video ends"
    setTimeout(() => {
      playButton.innerHTML = '<i class="fas fa-play"></i>';
      playButton.style.background = '';
    }, 5000);
  });
}

// Location chips
$$('.location-chip').forEach(chip => {
  chip.addEventListener('click', () => {
    $('#location').value = chip.textContent;
    toast.show(`Location set to ${chip.textContent}`, 'success');
  });
});

// Smooth scroll for anchor links
$$('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    
    e.preventDefault();
    const target = $(href);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth'
      });
      
      // Update URL hash
      history.pushState(null, null, href);
    }
  });
});

// Newsletter form
const newsletterForm = $('.newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = $('input[type="email"]', newsletterForm).value;
    
    // Simulate subscription
    toast.show('Subscribed to newsletter!', 'success');
    newsletterForm.reset();
    
    // Track subscription
    console.log('Newsletter subscription:', email);
  });
}

// Initialize counters on page load
document.addEventListener('DOMContentLoaded', () => {
  // Trigger initial animations for elements already in view
  $$('[data-reveal]').forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight * 0.8) {
      el.classList.add('revealed');
    }
  });
  
  // Add CSS for animations
  const style = document.createElement('style');
  style.textContent = `
    [data-reveal] {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    [data-reveal].revealed {
      opacity: 1;
      transform: translateY(0);
    }
    
    .burger span {
      transition: transform 0.3s ease, opacity 0.3s ease;
    }
    
    .price-amount {
      transition: transform 0.3s ease;
    }
    
    .chat-modal {
      transition: transform 0.3s ease, opacity 0.3s ease;
    }
  `;
  document.head.appendChild(style);
});

// Performance optimization: Lazy load images
document.addEventListener('DOMContentLoaded', () => {
  const lazyImages = $$('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.getAttribute('data-src');
        img.removeAttribute('data-src');
        imageObserver.unobserve(img);
      }
    });
  });
  
  lazyImages.forEach(img => imageObserver.observe(img));
});
