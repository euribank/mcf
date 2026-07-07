// ============================================================
// MAIN.JS — НАВИГАЦИЯ ПО 12 СТРАНИЦАМ
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Скрыть все страницы, показать текущую
    function showPage(pageId) {
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        const target = document.getElementById(pageId);
        if (target) target.classList.add('active');
    }
    
    // Обработчики кликов по ссылкам
    document.querySelectorAll('.nav-links a, .page-links a, .page-navigation a').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const pageId = href.substring(1);
                showPage(pageId);
                window.scrollTo({ top: 0, behavior: 'smooth' });
                // Обновить URL
                history.pushState(null, '', href);
            }
        });
    });
    
    // Обработка назад/вперёд
    window.addEventListener('popstate', function() {
        const pageId = window.location.hash.substring(1) || 'home';
        showPage(pageId);
    });
    
    // Загрузка с хешем
    if (window.location.hash) {
        const pageId = window.location.hash.substring(1);
        showPage(pageId);
    }
    
    // Мобильное меню
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.querySelector('.nav-links');
    if (mobileBtn) {
        mobileBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
        });
    }
    
    // Плавный скролл
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
    
    // Копирование адреса
    window.copyAddress = function() {
        const address = '33r46gDzoXfYijXWS4JgWcUcPWbTGphBnJGnApW77fsX';
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(address).then(() => {
                showCopySuccess();
            }).catch(() => fallbackCopy(address));
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
        document.querySelectorAll('.copy-btn').forEach(btn => {
            const original = btn.textContent;
            btn.textContent = '✅';
            setTimeout(() => { btn.textContent = original; }, 2000);
        });
    }
    
    // Кнопка наверх
    const scrollBtn = document.getElementById('scrollTopBtn');
    window.addEventListener('scroll', function() {
        scrollBtn.classList.toggle('visible', window.pageYOffset > 300);
    });
    
    window.scrollToTop = function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    console.log('🚀 MCF Website with 12 pages loaded!');
    console.log('📍 Mint Address:', '33r46gDzoXfYijXWS4JgWcUcPWbTGphBnJGnApW77fsX');
});
