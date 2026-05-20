(function() {
    var scene = document.getElementById('frisbeeScene');
    var frisbeeDisc = document.getElementById('frisbeeDisc');
    var frisbeeShadow = document.getElementById('frisbeeShadow');
    var heartsContainer = document.getElementById('heartsContainer');
    
    if (!scene || !frisbeeDisc || !frisbeeShadow || !heartsContainer) return;
    
    var frisbeeActive = false;

    // Жених — тёмный силуэт
    var groomSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    groomSvg.setAttribute("viewBox", "0 0 160 240");
    groomSvg.setAttribute("width", "140");
    groomSvg.setAttribute("height", "210");
    groomSvg.style.cssText = 'position:absolute;bottom:30px;left:7%;z-index:3;';
    groomSvg.innerHTML = `
        <!-- Ноги -->
        <rect x="62" y="160" width="14" height="50" rx="5" fill="#1A1A1A"/>
        <rect x="84" y="160" width="14" height="50" rx="5" fill="#1A1A1A"/>
        <rect x="58" y="200" width="22" height="12" rx="4" fill="#111"/>
        <rect x="80" y="200" width="22" height="12" rx="4" fill="#111"/>
        <!-- Пиджак -->
        <rect x="55" y="80" width="50" height="85" rx="10" fill="#1A1A1A"/>
        <!-- Рубашка -->
        <polygon points="80,80 65,105 95,105" fill="#FFFFFF"/>
        <!-- Руки -->
        <rect x="38" y="85" width="18" height="55" rx="7" fill="#1A1A1A"/>
        <rect x="104" y="85" width="18" height="55" rx="7" fill="#1A1A1A" id="groomArm"/>
        <!-- Голова -->
        <ellipse cx="80" cy="50" rx="24" ry="28" fill="#D4A574"/>
        <!-- Волосы -->
        <ellipse cx="80" cy="32" rx="26" ry="18" fill="#3A2A1A"/>
        <rect x="54" y="28" width="14" height="22" rx="5" fill="#3A2A1A"/>
        <rect x="92" y="28" width="14" height="22" rx="5" fill="#3A2A1A"/>
        <!-- Цилиндр -->
        <rect x="58" y="-15" width="44" height="30" rx="3" fill="#1A1A1A"/>
        <rect x="52" y="12" width="56" height="6" rx="2" fill="#1A1A1A"/>
        <!-- Бабочка -->
        <polygon points="80,70 66,60 66,78" fill="#7A3B48"/>
        <polygon points="80,70 94,60 94,78" fill="#7A3B48"/>
    `;
    scene.appendChild(groomSvg);

    // Невеста — светлый силуэт
    var brideSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    brideSvg.setAttribute("viewBox", "0 0 160 240");
    brideSvg.setAttribute("width", "140");
    brideSvg.setAttribute("height", "210");
    brideSvg.style.cssText = 'position:absolute;bottom:30px;right:7%;z-index:3;transform:scaleX(-1);';
    brideSvg.innerHTML = `
        <!-- Платье -->
        <path d="M80,105 L40,200 Q80,215 120,200 Z" fill="#FAF0E6"/>
        <path d="M80,105 L35,200 Q80,220 125,200 Z" fill="rgba(250,240,230,0.3)"/>
        <!-- Верх платья -->
        <rect x="62" y="70" width="36" height="40" rx="12" fill="#FAF0E6"/>
        <!-- Руки -->
        <rect x="42" y="78" width="14" height="45" rx="6" fill="#D4A574"/>
        <rect x="104" y="78" width="14" height="45" rx="6" fill="#D4A574"/>
        <!-- Букет -->
        <circle cx="35" cy="95" r="12" fill="#7B8D5A"/>
        <circle cx="28" cy="88" r="7" fill="#A3B18A"/>
        <circle cx="40" cy="90" r="6" fill="#E8DDD3"/>
        <!-- Голова -->
        <ellipse cx="80" cy="42" rx="22" ry="26" fill="#D4A574"/>
        <!-- Волосы -->
        <ellipse cx="80" cy="25" rx="24" ry="16" fill="#5A3020"/>
        <rect x="56" y="20" width="12" height="35" rx="5" fill="#5A3020"/>
        <rect x="92" y="20" width="12" height="35" rx="5" fill="#5A3020"/>
        <!-- Фата -->
        <ellipse cx="80" cy="5" rx="30" ry="14" fill="rgba(255,255,255,0.4)"/>
        <rect x="50" y="3" width="60" height="8" rx="3" fill="rgba(255,255,255,0.35)"/>
    `;
    scene.appendChild(brideSvg);

    // Сердечки
    function spawnHearts(x, y) {
        var emojis = ['💕','💖','💗','✨','♥️','💝','💘'];
        for (var i = 0; i < 12; i++) {
            (function(idx) {
                setTimeout(function() {
                    var heart = document.createElement('div');
                    heart.className = 'heart-particle';
                    heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
                    heart.style.left = (x - 15 + Math.random() * 30) + 'px';
                    heart.style.top = (y - 15 + Math.random() * 30) + 'px';
                    var angle = Math.random() * Math.PI * 2;
                    var dist = 60 + Math.random() * 90;
                    heart.style.setProperty('--dx', Math.cos(angle) * dist + 'px');
                    heart.style.setProperty('--dy', Math.sin(angle) * dist - 40 + 'px');
                    heart.style.setProperty('--dx2', Math.cos(angle) * dist * 0.3 + 'px');
                    heart.style.setProperty('--dy2', Math.sin(angle) * dist * 0.3 - 100 + 'px');
                    heart.classList.add('active');
                    heartsContainer.appendChild(heart);
                    setTimeout(function() { heart.remove(); }, 1600);
                }, idx * 35);
            })(i);
        }
    }

    // Анимация
    function animateFrisbee() {
        if (frisbeeActive) return;
        frisbeeActive = true;
        
        var rect = scene.getBoundingClientRect();
        var startX = rect.width * 0.16;
        var startY = rect.height * 0.36;
        var endX = rect.width * 0.70;
        var endY = rect.height * 0.33;

        // Бросок
        groomSvg.style.transition = 'transform 0.3s ease-out';
        groomSvg.style.transform = 'rotate(-5deg) translateY(-4px)';
        setTimeout(function() { groomSvg.style.transform = ''; }, 400);

        // Тарелка летит
        setTimeout(function() {
            frisbeeDisc.style.opacity = '1';
            frisbeeDisc.style.left = startX + 'px';
            frisbeeDisc.style.top = startY + 'px';
            frisbeeDisc.style.transition = 'all 1.1s cubic-bezier(0.22, 0.05, 0.25, 1)';
            frisbeeDisc.style.left = endX + 'px';
            frisbeeDisc.style.top = (endY - 30) + 'px';
            frisbeeDisc.style.transform = 'rotate(720deg)';
            
            frisbeeShadow.style.opacity = '1';
            frisbeeShadow.style.left = startX + 'px';
            frisbeeShadow.style.top = (startY + 80) + 'px';
            frisbeeShadow.style.width = '40px';
            frisbeeShadow.style.filter = 'blur(3px)';
            frisbeeShadow.style.transition = 'all 1.1s cubic-bezier(0.22, 0.05, 0.25, 1)';
            setTimeout(function() {
                frisbeeShadow.style.left = endX + 'px';
                frisbeeShadow.style.top = (endY + 30) + 'px';
                frisbeeShadow.style.width = '70px';
                frisbeeShadow.style.filter = 'blur(10px)';
            }, 100);
        }, 250);

        // Невеста ловит
        setTimeout(function() {
            brideSvg.style.transition = 'transform 0.3s ease-out';
            brideSvg.style.transform = 'scaleX(-1) translateY(-6px)';
            spawnHearts(endX, endY);
            setTimeout(function() { brideSvg.style.transform = 'scaleX(-1)'; }, 400);
        }, 1250);

        // Возврат
        setTimeout(function() {
            frisbeeDisc.style.transition = 'all 1.1s cubic-bezier(0.22, 0.05, 0.25, 1)';
            frisbeeDisc.style.left = startX + 'px';
            frisbeeDisc.style.top = (startY - 25) + 'px';
            frisbeeDisc.style.transform = 'rotate(1440deg)';
            
            frisbeeShadow.style.transition = 'all 1.1s cubic-bezier(0.22, 0.05, 0.25, 1)';
            frisbeeShadow.style.left = startX + 'px';
            frisbeeShadow.style.top = (startY + 80) + 'px';
            frisbeeShadow.style.width = '40px';
            frisbeeShadow.style.filter = 'blur(3px)';
        }, 2500);

        // Жених ловит
        setTimeout(function() {
            groomSvg.style.transition = 'transform 0.3s ease-out';
            groomSvg.style.transform = 'rotate(-3deg) translateY(-3px)';
            spawnHearts(startX, startY);
            setTimeout(function() { groomSvg.style.transform = ''; }, 400);
        }, 3600);

        // Сброс
        setTimeout(function() {
            frisbeeDisc.style.opacity = '0';
            frisbeeShadow.style.opacity = '0';
            frisbeeDisc.style.transition = 'none';
            frisbeeShadow.style.transition = 'none';
            frisbeeActive = false;
        }, 4300);
    }

    var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) animateFrisbee();
        });
    }, { threshold: 0.5 });
    observer.observe(scene);

    setInterval(function() {
        var rect = scene.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0 && !frisbeeActive && Math.random() < 0.04) {
            animateFrisbee();
        }
    }, 6000);
})();