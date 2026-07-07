// ============================================================
// CHART.JS — ГРАФИК ЦЕНЫ MCF
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('priceChart');
    if (!ctx) return;
    
    // Данные для графика
    const generateData = (days) => {
        const data = [];
        const labels = [];
        let price = 0.0010;
        
        for (let i = 0; i < days; i++) {
            const change = (Math.random() - 0.48) * 0.0003;
            price = Math.max(price + change, 0.0005);
            data.push(price);
            
            if (days <= 7) {
                labels.push(`${i}:00`);
            } else if (days <= 30) {
                labels.push(`День ${i+1}`);
            } else {
                labels.push(`${i+1}`);
            }
        }
        return { data, labels };
    };
    
    const { data, labels } = generateData(30);
    
    // Цвета
    const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(201, 168, 76, 0.3)');
    gradient.addColorStop(1, 'rgba(201, 168, 76, 0.01)');
    
    // Создание графика
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'MCF Price (USDC)',
                data: data,
                borderColor: '#C9A84C',
                backgroundColor: gradient,
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 2,
                pointBackgroundColor: '#C9A84C',
                pointBorderColor: '#C9A84C',
                pointBorderWidth: 2,
                pointHoverRadius: 6,
                pointHoverBackgroundColor: '#FFFFFF',
                pointHoverBorderColor: '#C9A84C',
                pointHoverBorderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(13, 13, 26, 0.9)',
                    titleColor: '#FFFFFF',
                    bodyColor: '#C9A84C',
                    borderColor: 'rgba(201, 168, 76, 0.3)',
                    borderWidth: 1,
                    padding: 12,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            return '$' + context.parsed.y.toFixed(6);
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255,255,255,0.05)',
                        display: true
                    },
                    ticks: {
                        color: 'rgba(255,255,255,0.3)',
                        font: { size: 11 },
                        maxTicksLimit: 10
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(255,255,255,0.05)',
                        display: true
                    },
                    ticks: {
                        color: 'rgba(255,255,255,0.3)',
                        font: { size: 11 },
                        callback: function(value) {
                            return '$' + value.toFixed(4);
                        }
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            },
            animation: {
                duration: 1500,
                easing: 'easeInOutQuart'
            }
        }
    });
    
    // Обновление данных при клике на кнопки периодов
    document.querySelectorAll('.chart-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const period = this.getAttribute('data-period');
            let days;
            
            switch(period) {
                case '1D': days = 24; break;
                case '1W': days = 7; break;
                case '1M': days = 30; break;
                case '3M': days = 90; break;
                case '1Y': days = 365; break;
                default: days = 30;
            }
            
            const newData = generateData(days);
            chart.data.labels = newData.labels;
            chart.data.datasets[0].data = newData.data;
            chart.update();
        });
    });
});
