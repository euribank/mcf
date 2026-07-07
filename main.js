// ============================================================
// MAIN.JS — ПОЛНАЯ ВЕРСИЯ (ИСПРАВЛЕНА)
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    
    // НАВИГАЦИЯ — SCROLL
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // МОБИЛЬНОЕ МЕНЮ
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileBtn) {
        mobileBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
        });
    }
    
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            if (mobileBtn) mobileBtn.textContent = '☰';
        });
    });
    
    // ПЛАВНЫЙ СКРОЛЛ
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        });
    });
    
    // 3D TILT
    document.querySelectorAll('.tilt, .counter-item, .staking-card, .eco-card').forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            this.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
            this.style.transition = 'transform 0.05s ease';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)';
            this.style.transition = 'transform 0.3s ease';
        });
    });
    
    // КНОПКА НАВЕРХ
    const scrollBtn = document.getElementById('scrollTopBtn');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 400) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
    
    window.scrollToTop = function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    // REVEAL ON SCROLL
    const revealElements = document.querySelectorAll('.reveal, .slide-in-left, .slide-in-right, .zoom-in');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(el => observer.observe(el));
    
    // FAQ ACCORDION
    window.toggleFaq = function(button) {
        const item = button.parentElement;
        const isActive = item.classList.contains('active');
        
        document.querySelectorAll('.faq-item').forEach(faq => {
            faq.classList.remove('active');
        });
        
        if (!isActive) {
            item.classList.add('active');
        }
    };
    
    // КОПИРОВАНИЕ
    window.copyAddress = function() {
        const address = '33r46gDzoXfYijXWS4JgWcUcPWbTGphBnJGnApW77fsX';
        
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(address).then(() => {
                showCopySuccess();
            }).catch(() => {
                fallbackCopy(address);
            });
        } else {
            fallbackCopy(address);
        }
    };
    
    function fallbackCopy(text) {
        const input = document.createElement('input');
        input.value = text;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
        showCopySuccess();
    }
    
    function showCopySuccess() {
        const btns = document.querySelectorAll('.copy-btn');
        btns.forEach(btn => {
            const originalText = btn.textContent;
            btn.textContent = '✅';
            btn.style.color = '#14F195';
            setTimeout(() => {
                btn.textContent = '📋';
                btn.style.color = '';
            }, 2000);
        });
    }
    
    // ПОДПИСКА
    const subscribeForm = document.getElementById('subscribeForm');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const input = this.querySelector('input');
            const email = input.value.trim();
            
            if (email) {
                const btn = this.querySelector('button');
                const originalText = btn.textContent;
                btn.textContent = '✅ Sent!';
                btn.style.background = '#14F195';
                btn.style.color = '#0D0D1A';
                
                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = '';
                    btn.style.color = '';
                    input.value = '';
                }, 3000);
            }
        });
    }
    
    // АКТИВНЫЕ КНОПКИ ГРАФИКА
    document.querySelectorAll('.chart-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.chart-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    console.log('🚀 MCF Website loaded successfully!');
    console.log('📍 Mint Address: 33r46gDzoXfYijXWS4JgWcUcPWbTGphBnJGnApW77fsX');
});
