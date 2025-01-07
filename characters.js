document.addEventListener('DOMContentLoaded', function() {
    // 角色关系数据
    const relationships = [
        {
            from: 'harry',
            to: 'hermione',
            type: 'friend',
            label: '最好的朋友'
        },
        {
            from: 'harry',
            to: 'ron',
            type: 'friend',
            label: '最好的朋友'
        },
        {
            from: 'harry',
            to: 'dumbledore',
            type: 'mentor',
            label: '导师'
        },
        {
            from: 'harry',
            to: 'sirius',
            type: 'family',
            label: '教父'
        },
        {
            from: 'harry',
            to: 'voldemort',
            type: 'enemy',
            label: '宿敌'
        },
        {
            from: 'harry',
            to: 'snape',
            type: 'complex',
            label: '复杂'
        },
        {
            from: 'harry',
            to: 'ginny',
            type: 'family',
            label: '爱情'
        },
        {
            from: 'harry',
            to: 'lupin',
            type: 'mentor',
            label: '导师'
        },
        {
            from: 'harry',
            to: 'hagrid',
            type: 'friend',
            label: '第一个朋友'
        }
    ];

    // 获取SVG容器
    const svg = document.querySelector('.relationship-svg');
    
    // 绘制关系线
    function drawRelationships() {
        // 清除现有的线
        svg.innerHTML = '';
        
        relationships.forEach(rel => {
            const fromNode = document.querySelector(`[data-character="${rel.from}"]`);
            const toNode = document.querySelector(`[data-character="${rel.to}"]`);
            
            if (fromNode && toNode) {
                const fromRect = fromNode.getBoundingClientRect();
                const toRect = toNode.getBoundingClientRect();
                const svgRect = svg.getBoundingClientRect();
                
                // 计算线的起点和终点
                const x1 = fromRect.left + fromRect.width/2 - svgRect.left;
                const y1 = fromRect.top + fromRect.height/2 - svgRect.top;
                const x2 = toRect.left + toRect.width/2 - svgRect.left;
                const y2 = toRect.top + toRect.height/2 - svgRect.top;
                
                // 创建贝塞尔曲线路径
                const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
                const dx = x2 - x1;
                const dy = y2 - y1;
                const curve = 0.3; // 曲线程度
                
                const controlX1 = x1 + dx * curve;
                const controlY1 = y1;
                const controlX2 = x2 - dx * curve;
                const controlY2 = y2;
                
                path.setAttribute("d", `M ${x1},${y1} C ${controlX1},${controlY1} ${controlX2},${controlY2} ${x2},${y2}`);
                path.classList.add('relationship-line', rel.type);
                
                // 添加关系标签
                const textPath = document.createElementNS("http://www.w3.org/2000/svg", "text");
                const pathId = `path-${rel.from}-${rel.to}`;
                path.setAttribute("id", pathId);
                
                textPath.innerHTML = `
                    <textPath href="#${pathId}" startOffset="50%" text-anchor="middle">
                        <tspan dy="-5">${rel.label}</tspan>
                    </textPath>
                `;
                textPath.classList.add('relationship-label');
                
                svg.appendChild(path);
                svg.appendChild(textPath);
            }
        });
    }

    // 初始绘制
    drawRelationships();
    
    // 窗口大小改变时重新绘制
    window.addEventListener('resize', drawRelationships);
}); 