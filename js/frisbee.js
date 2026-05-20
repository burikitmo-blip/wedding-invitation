(function() {
    var scene = document.getElementById('frisbeeScene');
    var frisbeeDisc = document.getElementById('frisbeeDisc');
    var frisbeeShadow = document.getElementById('frisbeeShadow');
    var heartsContainer = document.getElementById('heartsContainer');
    
    if (!scene || !frisbeeDisc || !frisbeeShadow || !heartsContainer) return;
    
    var frisbeeActive = false;
    
    // Создаём canvas для жениха и невесты
    var groomCanvas = document.createElement('canvas');
    groomCanvas.className = 'groom-canvas';
    groomCanvas.width = 180;
    groomCanvas.height = 220;
    groomCanvas.style.cssText = 'position:absolute;bottom:35px;left:8%;z-index:3;';
    scene.appendChild(groomCanvas);
    var groomCtx = groomCanvas.getContext('2d');
    
    var brideCanvas = document.createElement('canvas');
    brideCanvas.className = 'bride-canvas';
    brideCanvas.width = 180;
    brideCanvas.height = 220;
    brideCanvas.style.cssText = 'position:absolute;bottom:35px;right:8%;z-index:3;transform:scaleX(-1);';
    scene.appendChild(brideCanvas);
    var brideCtx = brideCanvas.getContext('2d');
    
    // Рисование жениха
    function drawGroom(phase, progress) {
        var cx = 90, cy = 100;
        groomCtx.clearRect(0, 0, 180, 220);
        var armAngle = -0.3, legShift = 0, bodyTilt = 0;
        
        if (phase === 'idle') {
            legShift = Math.sin(Date.now() * 0.004) * 4;
        } else if (phase === 'throw') {
            if (progress < 0.4) {
                armAngle = -0.3 - progress * 4;
                bodyTilt = -progress * 0.3;
            } else {
                armAngle = -1.9 + (progress - 0.4) * 5;
                bodyTilt = -0.12 + (progress - 0.4) * 0.4;
                legShift = progress * 6;
            }
        } else if (phase === 'catch') {
            armAngle = -1.5;
            legShift = -3;
        }
        
        groomCtx.save();
        groomCtx.translate(cx, cy + 30);
        groomCtx.rotate(bodyTilt);
        
        // Ноги
        groomCtx.strokeStyle = '#1A1A1A';
        groomCtx.lineWidth = 7;
        groomCtx.lineCap = 'round';
        groomCtx.beginPath();
        groomCtx.moveTo(-8, 40);
        groomCtx.lineTo(-14 + legShift, 90);
        groomCtx.stroke();
        groomCtx.fillStyle = '#111';
        groomCtx.beginPath();
        groomCtx.roundRect(-24 + legShift, 88, 20, 10, 4);
        groomCtx.fill();
        groomCtx.beginPath();
        groomCtx.moveTo(8, 40);
        groomCtx.lineTo(14 - legShift, 90);
        groomCtx.stroke();
        groomCtx.beginPath();
        groomCtx.roundRect(4 - legShift, 88, 20, 10, 4);
        groomCtx.fill();
        
        // Тело
        groomCtx.strokeStyle = '#1A1A1A';
        groomCtx.lineWidth = 9;
        groomCtx.beginPath();
        groomCtx.moveTo(0, -20);
        groomCtx.lineTo(0, 45);
        groomCtx.stroke();
        groomCtx.fillStyle = '#1A1A1A';
        groomCtx.beginPath();
        groomCtx.roundRect(-16, -5, 32, 50, 6);
        groomCtx.fill();
        groomCtx.fillStyle = '#FFFFFF';
        groomCtx.beginPath();
        groomCtx.moveTo(-5, -5);
        groomCtx.lineTo(5, -5);
        groomCtx.lineTo(0, 8);
        groomCtx.fill();
        
        // Руки
        groomCtx.strokeStyle = '#1A1A1A';
        groomCtx.lineWidth = 6;
        groomCtx.beginPath();
        groomCtx.moveTo(-14, -2);
        groomCtx.lineTo(-22, 22);
        groomCtx.stroke();
        var handX = 16 * Math.cos(armAngle);
        var handY = -2 + 16 * Math.sin(armAngle);
        groomCtx.beginPath();
        groomCtx.moveTo(14, -2);
        groomCtx.lineTo(handX + 14, handY);
        groomCtx.stroke();
        groomCtx.fillStyle = '#D4A574';
        groomCtx.beginPath();
        groomCtx.arc(handX + 14, handY, 5, 0, Math.PI * 2);
        groomCtx.fill();
        
        // Голова
        groomCtx.fillStyle = '#D4A574';
        groomCtx.beginPath();
        groomCtx.roundRect(-5, -35, 10, 12, 3);
        groomCtx.fill();
        groomCtx.beginPath();
        groomCtx.arc(0, -30, 16, 0, Math.PI * 2);
        groomCtx.fill();
        
        // Волосы
        groomCtx.fillStyle = '#4A3728';
        groomCtx.beginPath();
        groomCtx.arc(0, -36, 17, Math.PI, 0);
        groomCtx.fill();
        groomCtx.fillRect(-17, -42, 34, 10);
        
        // Цилиндр
        groomCtx.fillStyle = '#2C2C2C';
        groomCtx.fillRect(-12, -74, 24, 18);
        groomCtx.fillRect(-17, -58, 34, 5);
        
        // Глаза
        groomCtx.fillStyle = '#000';
        groomCtx.beginPath();
        groomCtx.arc(-5, -30, 2, 0, Math.PI);
        groomCtx.fill();
        groomCtx.beginPath();
        groomCtx.arc(5, -30, 2, 0, Math.PI);
        groomCtx.fill();
        
        // Бабочка
        groomCtx.fillStyle = '#7A3B48';
        groomCtx.beginPath();
        groomCtx.moveTo(0, -28);
        groomCtx.lineTo(-10, -34);
        groomCtx.lineTo(-10, -25);
        groomCtx.fill();
        groomCtx.beginPath();
        groomCtx.moveTo(0, -28);
        groomCtx.lineTo(10, -34);
        groomCtx.lineTo(10, -25);
        groomCtx.fill();
        
        groomCtx.restore();
    }
    
    // Рисование невесты
    function drawBride(phase, progress) {
        var cx = 90, cy = 100;
        brideCtx.clearRect(0, 0, 180, 220);
        var armAngle = -0.3, legShift = 0, bodyTilt = 0;
        
        if (phase === 'idle') {
            legShift = Math.sin(Date.now() * 0.005 + 1) * 3;
        } else if (phase === 'catch') {
            armAngle = -1.5;
            legShift = -5;
        }
        
        brideCtx.save();
        brideCtx.translate(cx, cy + 25);
        brideCtx.rotate(bodyTilt);
        
        // Ноги
        brideCtx.strokeStyle = '#D4A574';
        brideCtx.lineWidth = 5;
        brideCtx.lineCap = 'round';
        brideCtx.beginPath();
        brideCtx.moveTo(-6, 35);
        brideCtx.lineTo(-10 + legShift, 75);
        brideCtx.stroke();
        brideCtx.beginPath();
        brideCtx.moveTo(6, 35);
        brideCtx.lineTo(10 - legShift, 75);
        brideCtx.stroke();
        
        // Платье
        brideCtx.fillStyle = '#FAF0E6';
        brideCtx.beginPath();
        brideCtx.moveTo(0, 18);
        brideCtx.lineTo(-30, 80);
        brideCtx.quadraticCurveTo(0, 85, 30, 80);
        brideCtx.closePath();
        brideCtx.fill();
        
        brideCtx.fillStyle = '#FAF0E6';
        brideCtx.beginPath();
        brideCtx.roundRect(-12, -8, 24, 28, 8);
        brideCtx.fill();
        
        // Руки
        brideCtx.strokeStyle = '#D4A574';
        brideCtx.lineWidth = 5;
        brideCtx.beginPath();
        brideCtx.moveTo(-10, -5);
        brideCtx.lineTo(-20, 15);
        brideCtx.stroke();
        brideCtx.fillStyle = '#7B8D5A';
        brideCtx.beginPath();
        brideCtx.arc(-22, 18, 8, 0, Math.PI * 2);
        brideCtx.fill();
        brideCtx.fillStyle = '#A3B18A';
        brideCtx.beginPath();
        brideCtx.arc(-19, 14, 4, 0, Math.PI * 2);
        brideCtx.fill();
        brideCtx.fillStyle = '#E8DDD3';
        brideCtx.beginPath();
        brideCtx.arc(-26, 16, 4, 0, Math.PI * 2);
        brideCtx.fill();
        
        var handX = 16 * Math.cos(armAngle);
        var handY = -5 + 16 * Math.sin(armAngle);
        brideCtx.beginPath();
        brideCtx.moveTo(10, -5);
        brideCtx.lineTo(handX + 10, handY);
        brideCtx.stroke();
        brideCtx.fillStyle = '#D4A574';
        brideCtx.beginPath();
        brideCtx.arc(handX + 10, handY, 5, 0, Math.PI * 2);
        brideCtx.fill();
        
        // Голова
        brideCtx.fillStyle = '#D4A574';
        brideCtx.beginPath();
        brideCtx.arc(0, -22, 15, 0, Math.PI * 2);
        brideCtx.fill();
        
        // Волосы
        brideCtx.fillStyle = '#6B3A2A';
        brideCtx.beginPath();
        brideCtx.arc(0, -28, 16, Math.PI, 0);
        brideCtx.fill();
        brideCtx.fillRect(-16, -30, 8, 30);
        brideCtx.fillRect(8, -30, 8, 30);
        
        // Фата
        brideCtx.fillStyle = 'rgba(255,255,255,0.45)';
        brideCtx.beginPath();
        brideCtx.arc(0, -35, 20, Math.PI, 0);
        brideCtx.fill();
        brideCtx.fillRect(-20, -36, 40, 10);
        
        // Глаза
        brideCtx.fillStyle = '#000';
        brideCtx.beginPath();
        brideCtx.arc(-4, -22, 2, 0, Math.PI);
        brideCtx.fill();
        brideCtx.beginPath();
        brideCtx.arc(4, -22, 2, 0, Math.PI);
        brideCtx.fill();
        
        brideCtx.restore();
    }
    
    // Idle анимация
    function idleLoop() {
        if (!frisbeeActive) {
            drawGroom('idle', 0);
            drawBride('idle', 0);
        }
        requestAnimationFrame(function() {
            if (!frisbeeActive) idleLoop();
        });
    }
    idleLoop();
    
    // Сердечки
    function spawnHearts(x, y) {
        var emojis = ['💕','💖','💗','✨','♥️','💝','💘'];
        for (var i = 0; i < 10; i++) {
            (function(idx) {
                setTimeout(function() {
                    var heart = document.createElement('div');
                    heart.className = 'heart-particle';
                    heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
                    heart.style.left = (x - 10 + Math.random() * 20) + 'px';
                    heart.style.top = (y - 10 + Math.random() * 20) + 'px';
                    var angle = Math.random() * Math.PI * 2;
                    var dist = 50 + Math.random() * 80;
                    heart.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
                    heart.style.setProperty('--dy', Math.sin(angle) * dist - 30 + 'px');
                    heart.style.setProperty('--dx2', Math.cos(angle) * dist * 0.3 + 'px');
                    heart.style.setProperty('--dy2', Math.sin(angle) * dist * 0.3 - 80 + 'px');
                    heart.classList.add('active');
                    heartsContainer.appendChild(heart);
                    setTimeout(function() { heart.remove(); }, 1500);
                }, idx * 30);
            })(i);
        }
    }
    
    // Главная анимация
    function animateFrisbee() {
        if (frisbeeActive) return;
        frisbeeActive = true;
        
        var rect = scene.getBoundingClientRect();
        var startX = rect.width * 0.18;
        var startY = rect.height * 0.36;
        var endX = rect.width * 0.68;
        var endY = rect.height * 0.33;
        
        // Жених бросает
        var throwStart = null;
        function animThrow(ts) {
            if (!throwStart) throwStart = ts;
            var progress = Math.min((ts - throwStart) / 500, 1);
            drawGroom('throw', progress);
            if (progress < 1) requestAnimationFrame(animThrow);
        }
        requestAnimationFrame(animThrow);
        
        // Тарелка летит
        setTimeout(function() {
            frisbeeDisc.style.opacity = '1';
            frisbeeDisc.style.left = startX + 'px';
            frisbeeDisc.style.top = startY + 'px';
            frisbeeDisc.style.transition = 'all 1s ease-out';
            setTimeout(function() {
                frisbeeDisc.style.left = endX + 'px';
                frisbeeDisc.style.top = (endY - 20) + 'px';
                frisbeeDisc.style.transform = 'rotate(720deg)';
            }, 50);
            
            frisbeeShadow.style.opacity = '1';
            frisbeeShadow.style.left = startX + 'px';
            frisbeeShadow.style.top = (startY + 85) + 'px';
            frisbeeShadow.style.transition = 'all 1s ease-out';
            setTimeout(function() {
                frisbeeShadow.style.left = endX + 'px';
                frisbeeShadow.style.top = (endY + 35) + 'px';
                frisbeeShadow.style.width = '65px';
                frisbeeShadow.style.filter = 'blur(9px)';
            }, 50);
        }, 300);
        
        // Невеста ловит
        setTimeout(function() {
            drawBride('catch', 1);
            spawnHearts(endX, endY);
            setTimeout(function() { drawBride('idle', 0); }, 600);
        }, 1200);
        
        // Возврат
        setTimeout(function() {
            frisbeeDisc.style.transition = 'all 1s ease-out';
            frisbeeDisc.style.left = startX + 'px';
            frisbeeDisc.style.top = (startY - 15) + 'px';
            frisbeeDisc.style.transform = 'rotate(1440deg)';
            
            frisbeeShadow.style.transition = 'all 1s ease-out';
            frisbeeShadow.style.left = startX + 'px';
            frisbeeShadow.style.top = (startY + 85) + 'px';
            frisbeeShadow.style.width = '45px';
            frisbeeShadow.style.filter = 'blur(4px)';
        }, 2400);
        
        // Жених ловит
        setTimeout(function() {
            drawGroom('catch', 1);
            spawnHearts(startX, startY);
            setTimeout(function() { drawGroom('idle', 0); }, 600);
        }, 3400);
        
        // Сброс
        setTimeout(function() {
            frisbeeDisc.style.opacity = '0';
            frisbeeShadow.style.opacity = '0';
            frisbeeDisc.style.transition = 'none';
            frisbeeShadow.style.transition = 'none';
            frisbeeActive = false;
            idleLoop();
        }, 4000);
    }
    
    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) animateFrisbee();
        });
    }, { threshold: 0.5 });
    observer.observe(scene);
    
    setInterval(function() {
        var rect = scene.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0 && !frisbeeActive && Math.random() < 0.05) {
            animateFrisbee();
        }
    }, 5000);
})();