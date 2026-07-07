// ============================================================
// TICKER.JS — БЕГУЩИЕ СТРОКИ И ОБНОВЛЕНИЕ ДАННЫХ
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    setInterval(updateTickerData, 10000);
    updateCountdown();
    setInterval(updateCountdown, 1000);
});

function updateTickerData() {
    const price = (0.0010 + Math.random() * 0.0005).toFixed(4);
    const change = (Math.random() * 10 - 3).toFixed(1);
    const mcap = (11 + Math.random() * 3).toFixed(0) + 'M';
    const holders = Math.floor(1200 + Math.random() * 200);
    const volume = Math.floor(100000 + Math.random() * 50000);
    
    const priceEl = document.getElementById('tickerPrice');
    const changeEl = document.getElementById('tickerChange');
    const mcapEl = document.getElementById('tickerMCap');
    const holdersEl = document.getElementById('tickerHolders');
    const volumeEl = document.getElementById('tickerLiq');
    
    if (priceEl) priceEl.textContent = '$' + price;
    
    if (changeEl) {
        changeEl.textContent = (parseFloat(change) >= 0 ? '+' : '') + change + '%';
        changeEl.className = parseFloat(change) >= 0 ? 'positive' : 'negative';
    }
    
    if (mcapEl) mcapEl.textContent = '$' + mcap;
    if (holdersEl) holdersEl.textContent = holders.toLocaleString();
    if (volumeEl) volumeEl.textContent = '$' + volume.toLocaleString();
}

function updateCountdown() {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 3);
    targetDate.setHours(14, 0, 0, 0);
    
    const now = new Date();
    const diff = targetDate - now;
    
    if (diff <= 0) {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        return;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}
