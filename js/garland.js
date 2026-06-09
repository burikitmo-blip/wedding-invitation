(function() {
    var wrapper = document.getElementById('garlandWrapper');
    if (!wrapper) return;

    var photos = [
        { src: 'https://i.imgur.com/VZpOvyr.jpg', text: 'Наше первое фото вдвоем' },
        { src: 'https://i.imgur.com/VkvOsge.jpg', text: 'Чемпионы костюмированной <br>вечеринки' },
        { src: 'https://i.imgur.com/iYeen25.jpg', text: 'Тот самый день' },
        { src: 'https://i.imgur.com/C4WUg2y.jpg', text: 'Первый день ипотеки' },
        { src: 'https://i.imgur.com/C7LfsrO.jpg', text: 'Они что-то знали' },
        { src: 'https://i.imgur.com/knUfE6J.jpg', text: 'Всегда в тренде' },
        { src: 'https://i.imgur.com/643My0P.jpg', text: 'В погоне за чудесами света' },
        { src: 'https://i.imgur.com/bJ6sBma.jpg', text: 'Оазис любви' },
        { src: 'https://i.imgur.com/bWstkFV.jpg', text: 'Вместе создаем <br>волшебные моменты <br>(чудим потихонечку)' },
        { src: 'https://i.imgur.com/1qr06ww.jpg', text: 'Ловим счастливые моменты <br>и фрисби' }
    ];

    var offsets   = [8, 0, 12, 3, 6, 1, 10, 4, 8, 2];
    var rotations = [-2, 2, -1.5, 2.5, -1, 2, -2.5, 1.5, -2, 2];

    var cardWidth   = 170 + 24;
    var colors      = ['#FF6B6B','#FFE66D','#4ECDC4','#FF8E72','#A8E6CF','#FFB3BA','#BAFFC9','#BAE1FF'];
    var quintupled  = photos.concat(photos).concat(photos).concat(photos).concat(photos);
    var oneSetWidth = photos.length * cardWidth;
    var totalWidth  = quintupled.length * cardWidth;

    // Строим HTML
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
        html += '<div class="polaroid" style="margin-top:' + offsets[origIdx] + 'px;transform:rotate(' + rotations[origIdx] + 'deg)">' +
            '<div class="clip"></div><img src="' + p.src + '" alt=""><p>' + p.text + '</p></div>';
    });
    html += '</div></div>';
    wrapper.innerHTML = html;

    var inner = wrapper.querySelector('.garland-inner');
    var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    if (isIOS) {
        // --- iOS: ручной свайп через translateX ---
        wrapper.style.overflow = 'hidden';

        var offset     = -oneSetWidth;
        var startX     = 0;
        var startOff   = 0;
        var velX       = 0;
        var lastX      = 0;
        var lastTime   = 0;
        var rafId      = null;
        var dragging   = false;

        function applyOffset() {
            inner.style.transform = 'translateX(' + offset + 'px)';
        }
        applyOffset();

        function normalize() {
            if (offset <= -oneSetWidth * 2) offset += oneSetWidth;
            if (offset >= 0)               offset -= oneSetWidth;
        }

        wrapper.addEventListener('touchstart', function(e) {
            if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
            dragging   = true;
            startX     = e.touches[0].clientX;
            startOff   = offset;
            lastX      = startX;
            lastTime   = Date.now();
            velX       = 0;
        }, { passive: true });

        wrapper.addEventListener('touchmove', function(e) {
            if (!dragging) return;
            e.preventDefault();
            var now = Date.now();
            var x   = e.touches[0].clientX;
            var dt  = now - lastTime;
            if (dt > 0) velX = (x - lastX) / dt;
            lastX    = x;
            lastTime = now;
            offset   = startOff + (x - startX);
            normalize();
            applyOffset();
        }, { passive: false });

        wrapper.addEventListener('touchend', function() {
            dragging = false;
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
        // --- Android: нативный скролл ---
        wrapper.scrollLeft = oneSetWidth * 2;
        var ticking = false;
        wrapper.addEventListener('scroll', function() {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(function() {
                var sl = wrapper.scrollLeft;
                // Держим всегда в зоне 2-го или 3-го набора
                if (sl >= oneSetWidth * 3) wrapper.scrollLeft = sl - oneSetWidth;
                else if (sl < oneSetWidth) wrapper.scrollLeft = sl + oneSetWidth;
                ticking = false;
            });
        }, { passive: true });
    }
})();