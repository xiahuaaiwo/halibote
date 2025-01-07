// 添加魔法粒子效果
function createMagicParticles() {
    const particles = document.createElement('div');
    particles.className = 'magic-particles';
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 2 + 's';
        particles.appendChild(particle);
    }
    document.querySelector('#hero').appendChild(particles);
}

// 页面滚动动画
function revealOnScroll() {
    const elements = document.querySelectorAll('.feature-card, .house-card');
    const windowHeight = window.innerHeight;

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 导航栏滚动效果
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// 图片加载错误处理
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        this.src = 'placeholder.jpg';
    });
});

// 添加魔法按钮点击效果
document.querySelector('.magic-btn').addEventListener('click', function(e) {
    const btn = this;
    const x = e.clientX - btn.offsetLeft;
    const y = e.clientY - btn.offsetTop;
    
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 1000);
});

// 新闻滚动效果
function initNewsScroll() {
    const newsItems = document.querySelectorAll('.news-item');
    let currentIndex = 0;
    
    setInterval(() => {
        newsItems[currentIndex].style.opacity = '0';
        currentIndex = (currentIndex + 1) % newsItems.length;
        newsItems[currentIndex].style.opacity = '1';
    }, 3000);
}

// 添加页面滚动渐入效果
function initScrollAnimation() {
    const elements = document.querySelectorAll('.message-box, .news-item, .feature-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(element => observer.observe(element));
}

// 初始化所有效果
document.addEventListener('DOMContentLoaded', () => {
    createMagicParticles();
    initNewsScroll();
    initScrollAnimation();

    // 新闻轮播功能
    const newsContainer = document.querySelector('.news-container');
    const newsItems = document.querySelectorAll('.news-item');
    const prevBtn = document.querySelector('.news-prev');
    const nextBtn = document.querySelector('.news-next');
    let currentIndex = 0;

    function showNews(index) {
        newsItems.forEach((item, i) => {
            item.classList.remove('active', 'inactive');
            if (i === index) {
                item.style.display = 'flex';
                setTimeout(() => {
                    item.classList.add('active');
                }, 50);
            } else {
                if (item.style.display === 'flex') {
                    item.classList.add('inactive');
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 500);
                } else {
                    item.style.display = 'none';
                }
            }
        });
    }

    function nextNews() {
        currentIndex = (currentIndex + 1) % newsItems.length;
        showNews(currentIndex);
    }

    function prevNews() {
        currentIndex = (currentIndex - 1 + newsItems.length) % newsItems.length;
        showNews(currentIndex);
    }

    // 初始化显示第一条新闻
    showNews(currentIndex);

    // 添加按钮事件监听
    nextBtn.addEventListener('click', nextNews);
    prevBtn.addEventListener('click', prevNews);

    // 自动轮播
    setInterval(nextNews, 5000);
}); 