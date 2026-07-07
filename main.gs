// ============================================================
// MAIN.JS — ИНИЦИАЛИЗАЦИЯ ВСЕХ МОДУЛЕЙ
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================================
    // 1. НАВИГАЦИЯ — SCROLL EFFECT
    // ============================================================
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // ============================================================
    // 2. МОБИЛЬНОЕ МЕНЮ
    // ============================================================
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileBtn) {
        mobileBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
        });
    }
    
    // Закрытие меню при клике на ссылку
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            if (mobileBtn) mobileBtn.textContent = '☰';
        });
    });
    
    // ============================================================
    // 3. ПЛАВНЫЙ СКРОЛЛ ПО ЯКОРЯМ
    // ============================================================
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
    
    // ============================================================
    // 4. 3D TILT ДЛЯ КАРТОЧЕК
    // ============================================================
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
    
    // ============================================================
    // 5. КНОПКА "НАВЕРХ"
    // ============================================================
    const scrollBtn = document.getElementById('scrollTopBtn');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 400) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
    
    // ============================================================
    // 6. REVEAL ON SCROLL
    // ============================================================
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
    
    // ============================================================
    // 7. ЧАРТ — АКТИВНЫЕ КНОПКИ
    // ============================================================
    document.querySelectorAll('.chart-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.chart-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            // Здесь можно добавить обновление данных графика
        });
    });
    
    // ============================================================
    // 8. FAQ — ACCORDION
    // ============================================================
    window.toggleFaq = function(button) {
        const item = button.parentElement;
        const isActive = item.classList.contains('active');
        
        // Закрыть все
        document.querySelectorAll('.faq-item').forEach(faq => {
            faq.classList.remove('active');
        });
        
        if (!isActive) {
            item.classList.add('active');
        }
    };
    
    // ============================================================
    // 9. КОПИРОВАНИЕ ADDRESS
    // ============================================================
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
    
    // ============================================================
    // 10. SUBSCRIBE FORM
    // ============================================================
    const subscribeForm = document.getElementById('subscribeForm');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const input = this.querySelector('input');
            const email = input.value.trim();
            
            if (email) {
                const btn = this.querySelector('button');
                const originalText = btn.textContent;
                btn.textContent = '✅ Отправлено!';
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
    
    // ============================================================
    // 11. SCROLL TO TOP
    // ============================================================
    window.scrollToTop = function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    console.log('🚀 MCF Website loaded successfully!');
    console.log('📍 Mint Address: 33r46gDzoXfYijXWS4JgWcUcPWbTGphBnJGnApW77fsX');
    console.log('🌐 https://goldtether.github.io/mcf/');
});
