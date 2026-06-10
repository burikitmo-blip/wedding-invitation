(function() {
    var wrapper = document.getElementById('garlandWrapper');
    if (!wrapper) return;

    var photos = [
        { src: 'https://i.imgur.com/VZpOvyr.jpg', text: 'Наше первое фото вдвоем' },
        { src: 'https://i.imgur.com/VkvOsge.jpg', text: 'Чемпионы костюмированной <br>вечеринки (самопровозглашённые)' },
        { src: 'https://i.imgur.com/iYeen25.jpg', text: 'Тот самый день' },
        { src: 'https://i.imgur.com/C4WUg2y.jpg', text: 'Первый день ипотеки' },
        { src: 'https://i.imgur.com/C7LfsrO.jpg', text: 'Они что-то знали' },
        { src: 'https://i.imgur.com/knUfE6J.jpg', text: 'Всегда в тренде' },
        { src: 'https://i.imgur.com/643My0P.jpg', text: 'В погоне за чудесами света' },
        { src: 'https://i.imgur.com/bJ6sBma.jpg', text: 'Оазис любви' },
        { src: 'https://i.imgur.com/bWstkFV.jpg', text: 'Вместе создаем <br>волшебные моменты <br>(чудим потихонечку)' },
        { src: 'https://i.imgur.com/74WYryZ.jpg', text: 'Ловим счастливые моменты <br>и фрисби' }
    ];

    var offsets   = [8, 0, 12, 3, 6, 1, 10, 4, 8, 2];
    var rotations = [-2, 2, -1.5, 2.5, -1, 2, -2.5, 1.5, -2, 2];

    var cardWidth   = 170 + 24;
    var colors      = ['#FF6B6B','#FFE66D','#4ECDC4','#FF8E72','#A8E6CF','#FFB3BA','#BAFFC9','#BAE1FF'];
    var quintupled  = photos.concat(photos).concat(photos).concat(photos).concat(photos);
    var oneSetWidth = photos.length * cardWidth;
    var totalWidth  = quintupled.length * cardWidth;

    // Строим HTML гирлянды
    var bulbsCount = Math.floor(totalWidth / 8);
    var html = '<div class="garland-inner" style="width:' + totalWidth + 'px;">';
    html += '<div class="garland-wire" style="width:' + totalWidth + 'px;">';
    html += '<div class="wire-line"></div>';
    for (var i = 0; i < bulbsCount; i++) {
        var color = colors[Math.floor(Math.random() * colors.length)];
        var d   = (0.7 + Math.random() * 1.5).toFixed(2);
        var del = (Math.random() * 2).toFixed(2);
        html += '<span class="bulb" style="left:' + (i * 8) + 'px;background:' + color +
                ';box-shadow:0 0 6px ' + color + ';animation:blink ' + d +
                's ease-in-out infinite;animation-delay:' + del + 's;"></span>';
    }
    html += '</div>';
    html += '<div class="polaroid-row">';
    quintupled.forEach(function(p, idx) {
        var origIdx = idx % photos.length;
        html += '<div class="polaroid" data-src="' + p.src + '" data-text="' + p.text.replace(/"/g,'&quot;') + '" style="margin-top:' + offsets[origIdx] + 'px;transform:rotate(' + rotations[origIdx] + 'deg)">' +
            '<div class="clip"></div><img src="' + p.src + '" alt=""><p>' + p.text + '</p></div>';
    });
    html += '</div></div>';
    wrapper.innerHTML = html;

    // =============================================
    // ЛАЙТБОКС — работает одинаково на iOS и Android
    // =============================================
    var overlay = document.createElement('div');
    overlay.style.cssText = [
        'display:none',
        'position:fixed',
        'inset:0',
        'background:rgba(0,0,0,0.85)',
        'z-index:9999',
        'align-items:center',
        'justify-content:center',
        'touch-action:none'
    ].join(';');
    document.body.appendChild(overlay);

    // Крестик
    var closeBtn = document.createElement('div');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cssText = [
        'position:absolute',
        'top:16px',
        'right:20px',
        'font-size:40px',
        'color:#fff',
        'line-height:1',
        'cursor:pointer',
        'z-index:10001',
        'user-select:none',
        '-webkit-user-select:none',
        'padding:8px'
    ].join(';');
    overlay.appendChild(closeBtn);

    // Контейнер карточки внутри лайтбокса
    var lightboxCard = document.createElement('div');
    lightboxCard.style.cssText = [
        'position:relative',
        'background:#fff',
        'padding:12px 12px 40px 12px',
        'border-radius:3px',
        'box-shadow:0 8px 40px rgba(0,0,0,0.5)',
        'max-width:85vw',
        'max-height:85vh',
        'z-index:10000',
        'touch-action:pinch-zoom',
        'transform-origin:center center',
        'transition:transform 0.05s linear'
    ].join(';');

    var lightboxImg = document.createElement('img');
    lightboxImg.style.cssText = 'width:100%;max-width:70vmin;max-height:65vmin;object-fit:cover;border-radius:2px;display:block;';

    var lightboxText = document.createElement('p');
    lightboxText.style.cssText = "font-family:'Eskal','Cormorant Garamond',serif;font-size:1rem;color:#555;text-align:center;margin-top:10px;line-height:1.3;";

    lightboxCard.appendChild(lightboxImg);
    lightboxCard.appendChild(lightboxText);
    overlay.appendChild(lightboxCard);

    // Pinch zoom на открытой карточке
    var pinchScale     = 1;
    var pinchStartDist = 0;
    var pinchStartScale = 1;
    var isPinching     = false;

    function getTouchDist(touches) {
        var dx = touches[0].clientX - touches[1].clientX;
        var dy = touches[0].clientY - touches[1].clientY;
        return Math.sqrt(dx * dx + dy * dy);
    }

    function applyLightboxScale() {
        lightboxCard.style.transform = 'scale(' + pinchScale + ')';
    }

    overlay.addEventListener('touchstart', function(e) {
        if (e.touches.length === 2) {
            isPinching      = true;
            pinchStartDist  = getTouchDist(e.touches);
            pinchStartScale = pinchScale;
            e.preventDefault();
        }
    }, { passive: false });

    overlay.addEventListener('touchmove', function(e) {
        if (isPinching && e.touches.length === 2) {
            e.preventDefault();
            var dist = getTouchDist(e.touches);
            pinchScale = Math.max(0.5, Math.min(4, pinchStartScale * (dist / pinchStartDist)));
            applyLightboxScale();
        }
    }, { passive: false });

    overlay.addEventListener('touchend', function(e) {
        if (e.touches.length < 2) isPinching = false;
    }, { passive: true });

    // Открытие лайтбокса
    function openLightbox(src, text) {
        pinchScale = 1;
        lightboxCard.style.transform = 'scale(1)';
        lightboxImg.src = src;
        lightboxText.innerHTML = text;
        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        overlay.style.display = 'none';
        document.body.style.overflow = '';
        pinchScale = 1;
        lightboxCard.style.transform = 'scale(1)';
        isPinching = false;
    }

    // Закрытие по крестику
    closeBtn.addEventListener('click', closeLightbox);
    closeBtn.addEventListener('touchend', function(e) {
        e.stopPropagation();
        closeLightbox();
    }, { passive: true });

    // Закрытие по клику/тапу на затемнение (не на карточку)
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) closeLightbox();
    });
    overlay.addEventListener('touchend', function(e) {
        if (!isPinching && e.target === overlay) closeLightbox();
    }, { passive: true });

    // Клик по поляроиду — открыть лайтбокс
    // Используем делегирование на wrapper, чтобы работало для всех копий
    function findPolaroid(el) {
        while (el && el !== wrapper) {
            if (el.classList && el.classList.contains('polaroid')) return el;
            el = el.parentElement;
        }
        return null;
    }

    // =============================================
    // СКРОЛЛ — iOS и Android
    // =============================================
    var inner = wrapper.querySelector('.garland-inner');
    var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    if (isIOS) {
        wrapper.style.overflow = 'hidden';

        var offset   = -oneSetWidth;
        var startX   = 0;
        var startOff = 0;
        var velX     = 0;
        var lastX    = 0;
        var lastTime = 0;
        var rafId    = null;
        var dragging = false;
        var movedDist = 0;   // чтобы отличить тап от свайпа

        function applyOffset() {
            inner.style.transform = 'translateX(' + offset + 'px)';
        }
        applyOffset();

        function normalize() {
            if (offset <= -oneSetWidth * 2) offset += oneSetWidth;
            if (offset >= 0)               offset -= oneSetWidth;
        }

        wrapper.addEventListener('touchstart', function(e) {
            if (e.touches.length !== 1) return;
            if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
            dragging  = true;
            movedDist = 0;
            startX    = e.touches[0].clientX;
            startOff  = offset;
            lastX     = startX;
            lastTime  = Date.now();
            velX      = 0;
        }, { passive: true });

        wrapper.addEventListener('touchmove', function(e) {
            if (!dragging || e.touches.length !== 1) return;
            e.preventDefault();
            var now = Date.now();
            var x   = e.touches[0].clientX;
            var dt  = now - lastTime;
            movedDist += Math.abs(x - lastX);
            if (dt > 0) velX = (x - lastX) / dt;
            lastX    = x;
            lastTime = now;
            offset   = startOff + (x - startX);
            normalize();
            applyOffset();
        }, { passive: false });

        wrapper.addEventListener('touchend', function(e) {
            if (!dragging) return;
            dragging = false;

            // Если почти не двигали — это тап, открываем лайтбокс
            if (movedDist < 8) {
                var card = findPolaroid(e.changedTouches[0] ? document.elementFromPoint(
                    e.changedTouches[0].clientX, e.changedTouches[0].clientY) : e.target);
                if (card) {
                    openLightbox(card.getAttribute('data-src'), card.getAttribute('data-text'));
                    return;
                }
            }

            // Иначе — инерция
            var momentum = velX * 300;
            var startVal = offset;
            var target   = offset + momentum;
            var duration = Math.min(Math.abs(momentum) * 1.2, 700);
            var startT   = null;

            function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

            function animate(ts) {
                if (!startT) startT = ts;
                var progress = Math.min((ts - startT) / duration, 1);
                offset = startVal + (target - startVal) * easeOut(progress);
                normalize();
                applyOffset();
                if (progress < 1) rafId = requestAnimationFrame(animate);
                else rafId = null;
            }

            if (duration > 10) rafId = requestAnimationFrame(animate);
        }, { passive: true });

    } else {
        // --- Android/Desktop: нативный скролл ---
        wrapper.scrollLeft = oneSetWidth * 2;
        var ticking = false;
        wrapper.addEventListener('scroll', function() {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(function() {
                var sl = wrapper.scrollLeft;
                if (sl >= oneSetWidth * 3) wrapper.scrollLeft = sl - oneSetWidth;
                else if (sl < oneSetWidth) wrapper.scrollLeft = sl + oneSetWidth;
                ticking = false;
            });
        }, { passive: true });

        // Клик по поляроиду на Android/Desktop
        wrapper.addEventListener('click', function(e) {
            var card = findPolaroid(e.target);
            if (card) openLightbox(card.getAttribute('data-src'), card.getAttribute('data-text'));
        });
    }
})();