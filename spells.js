document.addEventListener('DOMContentLoaded', () => {
    // 咒语搜索功能
    const searchInput = document.getElementById('spell-search');
    const spellCards = document.querySelectorAll('.spell-card');
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        spellCards.forEach(card => {
            const spellName = card.querySelector('h3').textContent.toLowerCase();
            const spellLatin = card.querySelector('.spell-latin').textContent.toLowerCase();
            const isVisible = spellName.includes(searchTerm) || spellLatin.includes(searchTerm);
            card.style.display = isVisible ? 'block' : 'none';
        });
    });

    // 分类过滤功能
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            spellCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 魔杖绘制功能
    const canvas = document.getElementById('wandCanvas');
    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    function startDrawing(e) {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    function draw(e) {
        if (!isDrawing) return;
        
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.strokeStyle = '#ffd700';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.stroke();
        
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    function stopDrawing() {
        isDrawing = false;
    }

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    // 咒语详情模态框
    const modal = document.getElementById('spell-modal');
    const closeModal = document.querySelector('.close-modal');

    spellCards.forEach(card => {
        card.addEventListener('click', () => {
            const spellName = card.querySelector('h3').textContent;
            const spellLatin = card.querySelector('.spell-latin').textContent;
            const spellIcon = card.querySelector('.spell-icon').textContent;
            const spellDesc = card.querySelector('.spell-description').textContent;

            modal.querySelector('.spell-icon-large').textContent = spellIcon;
            modal.querySelector('h2').textContent = spellName;
            modal.querySelector('.spell-latin-large').textContent = spellLatin;
            modal.querySelector('.spell-description-full').textContent = spellDesc;

            modal.style.display = 'block';
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}); 