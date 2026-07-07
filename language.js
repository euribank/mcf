// ============================================================
// LANGUAGE.JS — 8 ЯЗЫКОВ (ДОБАВЛЕНЫ НОВЫЕ СТРАНИЦЫ)
// ============================================================

const translations = {
    en: {
        // Главная
        badge: '🏦 PREMIUM TOKEN',
        title: 'Monaco Capital Frank',
        subtitle: 'Next Generation Digital Asset',
        description: 'Premium token on Solana inspired by Monaco\'s financial heritage. 0.25% transfer fee fuels development, marketing, and listings.',
        supply: '10B',
        supply_label: 'Total Supply',
        fee_label: 'Transfer Fee',
        chain: 'Solana',
        chain_label: 'Blockchain',
        buy_btn: '🚀 Buy MCF',
        liquidity_btn: '💧 Add Liquidity',
        explorer_btn: '🔍 Check Token',
        mint_label: 'Mint Address:',
        
        // About
        about_title: '📄 About MCF',
        about_sub: 'The story behind Monaco Capital Frank',
        about_mission: 'Our Mission',
        about_mission_text: 'MCF is a premium digital asset on the Solana blockchain, inspired by the financial heritage of Monaco.',
        about_history: 'Historical Connection',
        about_history_text: 'The project is named after the historical Monegasque franc (MCF), pegged to the euro at 1 EUR = 6.55957 MCF.',
        about_vision: 'Our Vision',
        about_vision_text: 'To bridge traditional finance and decentralized technology, offering users a secure, transparent, and fast payment solution.',
        
        // Tokenomics
        tokenomics_title: '📊 Tokenomics',
        tokenomics_sub: 'MCF token distribution and economics',
        
        // Investors
        investors_title: '💼 For Investors',
        investors_sub: 'Everything you need to invest in MCF',
        
        // Staking
        staking_title: '💰 MCF Staking',
        staking_sub: 'Earn up to 15% APY by locking your tokens',
        stake_btn: 'Start',
        
        // Roadmap
        roadmap_title: '🗺️ Roadmap',
        roadmap_sub: 'MCF project development stages',
        
        // Team
        team_title: '👥 Our Team',
        team_sub: 'Experienced professionals from finance and blockchain',
        
        // Blog
        blog_title: '📰 Latest News',
        blog_sub: 'Stay up to date with MCF',
        
        // Whitepaper
        whitepaper_title: '📄 Whitepaper',
        whitepaper_sub: 'Everything you need to know about MCF',
        whitepaper_download: '⬇️ Download Whitepaper (PDF)',
        
        // Partners
        partners_title: '🤝 Our Partners',
        partners_sub: 'We cooperate with leading companies of Monaco and the world',
        
        // Contact
        contact_title: '📬 Contact Us',
        contact_sub: 'We\'d love to hear from you',
        
        // Navigation
        nav_home: 'Home',
        nav_about: 'About',
        nav_tokenomics: 'Tokenomics',
        nav_ecosystem: 'Ecosystem',
        nav_investors: 'Investors',
        nav_staking: 'Staking',
        nav_roadmap: 'Roadmap',
        nav_team: 'Team',
        nav_blog: 'Blog',
        nav_whitepaper: 'Whitepaper',
        nav_partners: 'Partners',
        nav_contact: 'Contact',
        
        // Counters
        counters_title: '📊 Key Metrics',
        counters_sub: 'Real MCF token statistics',
        total_supply: 'Total Supply',
        holders: 'Holders',
        liquidity: 'Liquidity',
        volume: '24h Volume',
        apy: 'Staking APY',
        community: 'Community',
        
        // Footer
        footer_desc: 'Monaco Capital Frank — premium token on Solana, inspired by the financial heritage of Monaco.',
        footer_links: 'Links',
        footer_ecosystem: 'Ecosystem',
        footer_disclaimer: 'Not investment advice. DYOR.',
        news_label: 'News:'
    },
    ru: {
        // ... аналогично на русском (можно скопировать из предыдущих версий)
        nav_about: 'О проекте',
        nav_tokenomics: 'Токеномика',
        nav_investors: 'Инвесторам',
        // ... и т.д.
    }
    // fr, de, es, it, zh, ar — по аналогии
};

// Переключение языка — английский по умолчанию
document.addEventListener('DOMContentLoaded', function() {
    const savedLang = localStorage.getItem('mcf_language') || 'en';
    setLanguage(savedLang);
    
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-lang') === savedLang);
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            setLanguage(lang);
            localStorage.setItem('mcf_language', lang);
            document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
});

function setLanguage(lang) {
    const data = translations[lang];
    if (!data) return;
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (data[key]) {
            if (el.tagName === 'INPUT') {
                el.placeholder = data[key];
            } else {
                el.textContent = data[key];
            }
        }
    });
}
