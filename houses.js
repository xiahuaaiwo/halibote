document.addEventListener('DOMContentLoaded', () => {
    // 滚动监听
    const sections = document.querySelectorAll('section[id]');
    const scrollDots = document.querySelectorAll('.scroll-dot');
    
    function onScroll() {
        const scrollPos = window.pageYOffset + 200;
        
        sections.forEach((section, index) => {
            if (section.offsetTop <= scrollPos && 
                (section.offsetTop + section.offsetHeight) > scrollPos) {
                scrollDots[index].classList.add('active');
            } else {
                scrollDots[index].classList.remove('active');
            }
        });
    }
    
    window.addEventListener('scroll', onScroll);

    // 学院切换动画
    const tabButtons = document.querySelectorAll('.tab-btn');
    const housePanels = document.querySelectorAll('.house-panel');

    // 为标签按钮添加点击事件
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const houseId = button.getAttribute('data-house');
            switchHouse(houseId);
        });
    });

    // 处理 URL hash 变化
    window.addEventListener('hashchange', () => {
        const houseId = window.location.hash.slice(1) || 'gryffindor';
        switchHouse(houseId);
    });

    function switchHouse(houseId) {
        housePanels.forEach(panel => {
            panel.classList.remove('active');
            panel.style.display = 'none';
        });

        tabButtons.forEach(btn => {
            btn.classList.remove('active');
        });

        const activePanel = document.getElementById(houseId);
        const activeButton = document.querySelector(`[data-house="${houseId}"]`);

        setTimeout(() => {
            activePanel.style.display = 'block';
            setTimeout(() => {
                activePanel.classList.add('active');
            }, 50);
        }, 300);

        activeButton.classList.add('active');
        history.pushState(null, '', `#${houseId}`);
    }

    // 初始化
    const initialHouse = window.location.hash.slice(1) || 'gryffindor';
    switchHouse(initialHouse);
}); 