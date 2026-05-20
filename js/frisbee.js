(function() {
    var scene = document.getElementById('frisbeeScene');
    var frisbeeDisc = document.getElementById('frisbeeDisc');
    var frisbeeShadow = document.getElementById('frisbeeShadow');
    var heartsContainer = document.getElementById('heartsContainer');
    
    if (!scene || !frisbeeDisc || !frisbeeShadow || !heartsContainer) return;
    
    var frisbeeActive = false;
    
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

    function animateFrisbee() {
        if (frisbeeActive) return;
        frisbeeActive = true;
        
        var rect = scene.getBoundingClientRect();
        var startX = rect.width * 0.18;
        var startY = rect.height * 0.36;
        var endX = rect.width * 0.68;
        var endY = rect.height * 0.33;
        
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
        
        setTimeout(function() {
            spawnHearts(endX, endY);
        }, 1200);
        
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
        
        setTimeout(function() {
            spawnHearts(startX, startY);
        }, 3400);
        
        setTimeout(function() {
            frisbeeDisc.style.opacity = '0';
            frisbeeShadow.style.opacity = '0';
            frisbeeDisc.style.transition = 'none';
            frisbeeShadow.style.transition = 'none';
            frisbeeActive = false;
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