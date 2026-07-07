// ============================================================
// COUNTERS.JS — АНИМИРОВАННЫЕ СЧЁТЧИКИ
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    const counters = document.querySelectorAll('.counter-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    counters.forEach(counter => observer.observe(counter));
});

function animateCounter(element) {
    const target = parseFloat(element.getAttribute('data-target'));
    const duration = 2500;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        const current = eased * target;
        
        let displayValue;
        if (target >= 1000000000) {
            displayValue = (current / 1000000000).toFixed(1) + 'B';
        } else if (target >= 1000000) {
            displayValue = (current / 1000000).toFixed(1) + 'M';
        } else if (target >= 1000) {
            displayValue = Math.floor(current).toLocaleString();
        } else {
            displayValue = Math.floor(current).toString();
        }
        
        element.textContent = displayValue;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            let finalValue;
            if (target >= 1000000000) {
                finalValue = (target / 1000000000).toFixed(1) + 'B';
            } else if (target >= 1000000) {
                finalValue = (target / 1000000).toFixed(1) + 'M';
            } else if (target >= 1000) {
                finalValue = target.toLocaleString();
            } else {
                finalValue = target.toString();
            }
            element.textContent = finalValue;
        }
    }
    
    requestAnimationFrame(updateCounter);
}
