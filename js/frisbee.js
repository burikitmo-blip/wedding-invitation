// ========== ПРЕМИАЛЬНАЯ ФРИСБИ-АНИМАЦИЯ ==========
const scene = document.getElementById('frisbeeScene');
const groomEl = document.getElementById('groomSilhouette');
const brideEl = document.getElementById('brideSilhouette');
const frisbeeDisc = document.getElementById('frisbeeDisc');
const frisbeeShadow = document.getElementById('frisbeeShadow');
const heartsContainer = document.getElementById('heartsContainer');

let frisbeeActive = false;
let animationId = null;

// ========== КАНВАС ДЛЯ ЖЕНИХА ==========
function createGroomCanvas() {
    const oldCanvas = document.querySelector('.groom-canvas');
    if (oldCanvas) oldCanvas.remove();
    
    const canvas = document.createElement('canvas');
    canvas.className = 'groom-canvas';
    canvas.width = 180;
    canvas.height = 220;
    canvas.style.cssText = 'position:absolute;bottom:35px;left:8%;z-index:3;';
    scene.appendChild(canvas);
    return canvas;
}

// ========== КАНВАС ДЛЯ НЕВЕСТЫ ==========
function createBrideCanvas() {
    const oldCanvas = document.querySelector('.bride-canvas');
    if (oldCanvas) oldCanvas.remove();
    
    const canvas = document.createElement('canvas');
    canvas.className = 'bride-canvas';
    canvas.width = 180;
    canvas.height = 220;
    canvas.style.cssText = 'position:absolute;bottom:35px;right:8%;z-index:3;transform:scaleX(-1);';
    scene.appendChild(canvas);
    return canvas;
}

// ========== РИСОВАНИЕ ЖЕНИХА ==========
function drawGroom(ctx, phase, progress) {
    const cx = 90, cy = 100;
    ctx.clearRect(0, 0, 180, 220);
    
    let armAngle = -0.3;
    let legShift = 0;
    let bodyTilt = 0;
    let headTilt = 0;
    
    if (phase === 'idle') {
        legShift = Math.sin(Date.now() * 0.004) * 4;
        armAngle = -0.3 + Math.sin(Date.now() * 0.003) * 0.2;
    } else if (phase === 'throw') {
        if (progress < 0.4) {
            armAngle = -0.3 - progress * 4;
            bodyTilt = -progress * 0.3;
        } else {
            armAngle = -1.9 + (progress - 0.4) * 5;
            bodyTilt = -0.12 + (progress - 0.4) * 0.4;
            legShift = progress * 6;
        }
        headTilt = bodyTilt * 0.5;
    } else if (phase === 'catch') {
        armAngle = -1.5 + progress * 1.2;
        bodyTilt = -0.1;
        legShift = -3;
        headTilt = 0.05;
    }
    
    ctx.save();
    ctx.translate(cx, cy + 30);
    ctx.rotate(bodyTilt);
    
    // Ноги
    ctx.strokeStyle = '#1A1A1A';
    ctx.lineWidth = 7;
    ctx.lineCap = 'round';
    
    ctx.beginPath();
    ctx.moveTo(-8, 40);
    ctx.lineTo(-14 + legShift, 90);
    ctx.stroke();
    ctx.fillStyle = '#111';
    ctx.beginPath();
    ctx.roundRect(-24 + legShift, 88, 20, 10, 4);
    ctx.fill();
    
    ctx.beginPath();
    ctx.moveTo(8, 40);
    ctx.lineTo(14 - legShift, 90);
    ctx.stroke();
    ctx.beginPath();
    ctx.roundRect(4 - legShift, 88, 20, 10, 4);
    ctx.fill();
    
    // Тело
    ctx.strokeStyle = '#1A1A1A';
    ctx.lineWidth = 9;
    ctx.beginPath();
    ctx.moveTo(0, -20);
    ctx.lineTo(0, 45);
    ctx.stroke();
    
    ctx.fillStyle = '#1A1A1A';
    ctx.beginPath();
    ctx.roundRect(-16, -5, 32, 50, 6);
    ctx.fill();
    
    // Рубашка
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.moveTo(-5, -5);
    ctx.lineTo(5, -5);
    ctx.lineTo(0, 8);
    ctx.fill();
    
    // Левая рука
    ctx.strokeStyle = '#1A1A1A';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(-14, -2);
    ctx.lineTo(-22, 22);
    ctx.stroke();
    
    // Правая рука
    const handX = 16 * Math.cos(armAngle);
    const handY = -2 + 16 * Math.sin(armAngle);
    ctx.beginPath();
    ctx.moveTo(14, -2);
    ctx.lineTo(handX + 14, handY);
    ctx.stroke();
    ctx.fillStyle = '#D4A574';
    ctx.beginPath();
    ctx.arc(handX + 14, handY, 5, 0, Math.PI * 2);
    ctx.fill();
    
    // Голова
    ctx.fillStyle = '#D4A574';
    ctx.beginPath();
    ctx.roundRect(-5, -35, 10, 12, 3);
    ctx.fill();
    
    ctx.save();
    ctx.translate(0, -30);
    ctx.rotate(headTilt);
    ctx.beginPath();
    ctx.arc(0, -8, 16, 0, Math.PI * 2);
    ctx.fill();
    
    // Волосы
    ctx.fillStyle = '#4A3728';
    ctx.beginPath();
    ctx.arc(0, -14, 17, Math.PI, 0);
    ctx.fill();
    ctx.fillRect(-17, -20, 34, 10);
    
    // Цилиндр
    ctx.fillStyle = '#2C2C2C';
    ctx.fillRect(-12, -52, 24, 18);
    ctx.fillRect(-17, -36, 34, 5);
    
    // Глаза
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(-5, -8, 2, 0, Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(5, -8, 2, 0, Math.PI);
    ctx.fill();
    
    // Улыбка
    ctx.strokeStyle = '#8B6F5C';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(0, -3, 5, 0.1, Math.PI - 0.1);
    ctx.stroke();
    ctx.restore();
    
    // Бабочка
    ctx.fillStyle = '#7A3B48';
    ctx.beginPath();
    ctx.moveTo(0, -6);
    ctx.lineTo(-10, -12);
    ctx.lineTo(-10, -3);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(0, -6);
    ctx.lineTo(10, -12);
    ctx.lineTo(10, -3);
    ctx.fill();
    
    ctx.restore();
}

// ========== РИСОВАНИЕ НЕВЕСТЫ ==========
function drawBride(ctx, phase, progress) {
    const cx = 90, cy = 100;
    ctx.clearRect(0, 0, 180, 220);
    
    let armAngle = -0.3;
    let legShift = 0;
    let bodyTilt = 0;
    
    if (phase === 'idle') {
        legShift = Math.sin(Date.now() * 0.005 + 1) * 3;
        armAngle = -0.3 + Math.sin(Date.now() * 0.004) * 0.15;
    } else if (phase === 'catch') {
        armAngle = -0.3 - progress * 1.8;
        bodyTilt = progress * 0.15;
        legShift = -progress * 5;
    } else if (phase === 'throw') {
        if (progress < 0.4) {
            armAngle = -0.3 - progress * 3.5;
            bodyTilt = -progress * 0.2;
        } else {
            armAngle = -1.7 + (progress - 0.4) * 4.5;
            bodyTilt = -0.08 + (progress - 0.4) * 0.3;
        }
    }
    
    ctx.save();
    ctx.translate(cx, cy + 25);
    ctx.rotate(bodyTilt);
    
    // Ноги
    ctx.strokeStyle = '#D4A574';
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(-6, 35);
    ctx.lineTo(-10 + legShift, 75);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(6, 35);
    ctx.lineTo(10 - legShift, 75);
    ctx.stroke();
    
    // Платье
    ctx.fillStyle = '#FAF0E6';
    ctx.beginPath();
    ctx.moveTo(0, 18);
    ctx.lineTo(-30, 80);
    ctx.quadraticCurveTo(0, 85, 30, 80);
    ctx.closePath();
    ctx.fill();
    
    // Верх платья
    ctx.fillStyle = '#FAF0E6';
    ctx.beginPath();
    ctx.roundRect(-12, -8, 24, 28, 8);
    ctx.fill();
    
    // Тело
    ctx.strokeStyle = '#D4A574';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(0, -15);
    ctx.lineTo(0, 20);
    ctx.stroke();
    
    // Левая рука + букет
    ctx.beginPath();
    ctx.moveTo(-10, -5);
    ctx.lineTo(-20, 15);
    ctx.stroke();
    ctx.fillStyle = '#7B8D5A';
    ctx.beginPath();
    ctx.arc(-22, 18, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#A3B18A';
    ctx.beginPath();
    ctx.arc(-19, 14, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#E8DDD3';
    ctx.beginPath();
    ctx.arc(-26, 16, 4, 0, Math.PI * 2);
    ctx.fill();
    
    // Правая рука
    const handX = 16 * Math.cos(armAngle);
    const handY = -5 + 16 * Math.sin(armAngle);
    ctx.beginPath();
    ctx.moveTo(10, -5);
    ctx.lineTo(handX + 10, handY);
    ctx.stroke();
    ctx.fillStyle = '#D4A574';
    ctx.beginPath();
    ctx.arc(handX + 10, handY, 5, 0, Math.PI * 2);
    ctx.fill();
    
    // Голова
    ctx.fillStyle = '#D4A574';
    ctx.beginPath();
    ctx.arc(0, -22, 15, 0, Math.PI * 2);
    ctx.fill();
    
    // Волосы
    ctx.fillStyle = '#6B3A2A';
    ctx.beginPath();
    ctx.arc(0, -28, 16, Math.PI, 0);
    ctx.fill();
    ctx.fillRect(-16, -30, 8, 30);
    ctx.fillRect(8, -30, 8, 30);
    
    // Фата
    ctx.fillStyle = 'rgba(255,255,255,0.45)';
    ctx.beginPath();
    ctx.arc(0, -35, 20, Math.PI, 0);
    ctx.fill();
    ctx.fillRect(-20, -36, 40, 10);
    
    // Глаза
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(-4, -22, 2, 0, Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(4, -22, 2, 0, Math.PI);
    ctx.fill();
    
    // Улыбка
    ctx.strokeStyle = '#C4956A';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(0, -17, 4, 0.1, Math.PI - 0.1);
    ctx.stroke();
    
    ctx.restore();
}

// ========== СЕРДЕЧКИ ==========
function spawnHearts(x, y) {
    const count = 12;
    for (let i = 0; i < count; i++) {
        setTimeout(function() {
            const heart = document.createElement('div');
            heart.className = 'heart-particle';
            heart.textContent = ['💕','💖','💗','✨','♥️','💝','💘'][Math.floor(Math.random() * 7)];
            heart.style.left = (x - 10 + Math.random() * 20) + 'px';
            heart.style.top = (y - 10 + Math.random() * 20) + 'px';
            const angle = Math.random() * Math.PI * 2;
            const dist = 50 + Math.random() * 80;
            heart.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
            heart.style.setProperty('--dy', Math.sin(angle) * dist - 30 + 'px');
            heart.style.setProperty('--dx2', Math.cos(angle) * dist * 0.3 + 'px');
            heart.style.setProperty('--dy2', Math.sin(angle) * dist * 0.3 - 80 + 'px');
            heart.classList.add('active');
            heartsContainer.appendChild(heart);
            setTimeout(function() { heart.remove(); }, 1600);
        }, i * 40);
    }
}

// ========== ИНИЦИАЛИЗАЦИЯ ==========
const groomCanvas = createGroomCanvas();
const groomCtx = groomCanvas.getContext('2d');
const brideCanvas = createBrideCanvas();
const brideCtx = brideCanvas.getContext('2d');

function idleLoop() {
    if (!frisbeeActive) {
        drawGroom(groomCtx, 'idle', 0);
        drawBride(brideCtx, 'idle', 0);
    }
    requestAnimationFrame(function() {
        if (!frisbeeActive) idleLoop();
    });
}
idleLoop();

// ========== ГЛАВНАЯ АНИМАЦИЯ ==========
function animateFrisbee() {
    if (frisbeeActive) return;
    frisbeeActive = true;
    
    const sceneRect = scene.getBoundingClientRect();
    const startX = sceneRect.width * 0.18;
    const startY = sceneRect.height * 0.36;
    const endX = sceneRect.width * 0.68;
    const endY = sceneRect.height * 0.33;
    
    let throwStart = null;
    function animateThrow(timestamp) {
        if (!throwStart) throwStart = timestamp;
        const progress = Math.min((timestamp - throwStart) / 500, 1);
        drawGroom(groomCtx, 'throw', progress);
        if (progress < 1) {
            requestAnimationFrame(animateThrow);
        }
    }
    requestAnimationFrame(animateThrow);
    
    setTimeout(function() {
        frisbeeDisc.style.opacity = '1';
        frisbeeDisc.style.left = startX + 'px';
        frisbeeDisc.style.top = startY + 'px';
        frisbeeDisc.style.transition = 'all 1.1s cubic-bezier(0.22, 0.05, 0.25, 1)';
        frisbeeDisc.style.left = endX + 'px';
        frisbeeDisc.style.top = (endY - 20) + 'px';
        frisbeeDisc.style.transform = 'rotate(720deg)';
        
        frisbeeShadow.style.opacity = '1';
        frisbeeShadow.style.left = startX + 'px';
        frisbeeShadow.style.top = (startY + 88) + 'px';
        frisbeeShadow.style.width = '45px';
        frisbeeShadow.style.filter = 'blur(4px)';
        frisbeeShadow.style.transition = 'all 1.1s cubic-bezier(0.22, 0.05, 0.25, 1)';
        
        setTimeout(function() {
            frisbeeShadow.style.width = '65px';
            frisbeeShadow.style.filter = 'blur(9px)';
            frisbeeShadow.style.left = endX + 'px';
            frisbeeShadow.style.top = (endY + 38) + 'px';
        }, 100);
    }, 250);
    
    setTimeout(function() {
        let catchStart = null;
        function animateCatch(timestamp) {
            if (!catchStart) catchStart = timestamp;
            const progress = Math.min((timestamp - catchStart) / 400, 1);
            drawBride(brideCtx, 'catch', progress);
            if (progress < 1) {
                requestAnimationFrame(animateCatch);
            }
        }
        requestAnimationFrame(animateCatch);
        spawnHearts(endX, endY);
    }, 1200);
    
    setTimeout(function() {
        frisbeeDisc.style.transition = 'all 1.1s cubic-bezier(0.22, 0.05, 0.25, 1)';
        frisbeeDisc.style.left = startX + 'px';
        frisbeeDisc.style.top = (startY - 15) + 'px';
        frisbeeDisc.style.transform = 'rotate(1440deg)';
        
        frisbeeShadow.style.transition = 'all 1.1s cubic-bezier(0.22, 0.05, 0.25, 1)';
        frisbeeShadow.style.left = startX + 'px';
        frisbeeShadow.style.top = (startY + 88) + 'px';
        frisbeeShadow.style.width = '45px';
        frisbeeShadow.style.filter = 'blur(4px)';
        
        setTimeout(function() {
            frisbeeShadow.style.width = '60px';
            frisbeeShadow.style.filter = 'blur(8px)';
        }, 100);
    }, 2500);
    
    setTimeout(function() {
        let catchStart2 = null;
        function animateCatch2(timestamp) {
            if (!catchStart2) catchStart2 = timestamp;
            const progress = Math.min((timestamp - catchStart2) / 400, 1);
            drawGroom(groomCtx, 'catch', progress);
            if (progress < 1) {
                requestAnimationFrame(animateCatch2);
            }
        }
        requestAnimationFrame(animateCatch2);
        spawnHearts(startX, startY);
    }, 3500);
    
    setTimeout(function() {
        frisbeeDisc.style.opacity = '0';
        frisbeeShadow.style.opacity = '0';
        frisbeeDisc.style.transition = 'none';
        frisbeeShadow.style.transition = 'none';
        frisbeeActive = false;
        idleLoop();
    }, 4200);
}

// ========== НАБЛЮДАТЕЛЬ ==========
const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) animateFrisbee();
    });
}, { threshold: 0.5 });
observer.observe(scene);

// Повтор
setInterval(function() {
    const rect = scene.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0 && !frisbeeActive && Math.random() < 0.05) {
        animateFrisbee();
    }
}, 5000);