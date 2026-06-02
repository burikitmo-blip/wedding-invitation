(function() {
    var wrapper = document.getElementById('garlandWrapper');
    if (!wrapper) return;

    var photos = [
        { src: 'https://i.imgur.com/BD7ghSq.jpg', text: 'Наша первая встреча' },
        { src: 'https://i.imgur.com/oHeYNH2.jpg', text: 'Свидание в парке' },
        { src: 'https://i.imgur.com/a6R7DRe.jpg', text: 'Тот самый день' },
        { src: 'https://i.imgur.com/4gy7h3q.jpg', text: 'Путешествие мечты' },
        { src: 'https://i.imgur.com/UcLblai.jpg', text: 'Наш уютный вечер' },
        { src: 'https://i.imgur.com/5MyaaxN.jpg', text: 'Вместе навсегда' },
        { src: 'https://i.imgur.com/IQhKIxX.jpg', text: 'Смех и радость' },
        { src: 'https://i.imgur.com/ES5qnon.jpg', text: 'Наше место' },
        { src: 'https://i.imgur.com/BD7ghSq.jpg', text: 'День признания' },
        { src: 'https://i.imgur.com/oHeYNH2.jpg', text: 'Готовимся к свадьбе' }
    ];

    var cardWidth = 170 + 24;
    var firstPhotoLeft = -100;
    var lastPhotoRight = photos.length * cardWidth -40;

    var html = '<div class="garland-inner">';
    
    html += '<div class="garland-wire">';
    html += '<div class="wire-line"></div>';
    var bulbsCount = Math.floor((lastPhotoRight - firstPhotoLeft) / 8);
    for (var i = 0; i < bulbsCount; i++) {
        var colors = ['#FF6B6B','#FFE66D','#4ECDC4','#FF8E72','#A8E6CF','#FFB3BA','#BAFFC9','#BAE1FF'];
        var color = colors[Math.floor(Math.random() * colors.length)];
        var d = (0.7 + Math.random() * 1.5).toFixed(2);
        var del = (Math.random() * 2).toFixed(2);
        html += '<span class="bulb" style="left:' + (firstPhotoLeft + i * 8) + 'px;background:' + color + ';box-shadow:0 0 6px ' + color + ';animation:blink ' + d + 's ease-in-out infinite;animation-delay:' + del + 's;"></span>';
    }
    html += '</div>';

    html += '<div class="polaroid-row">';
    photos.forEach(function(p) {
        html += '<div class="polaroid"><div class="clip"></div><img src="' + p.src + '" alt=""><p>' + p.text + '</p></div>';
    });
    html += '</div></div>';
    
    wrapper.innerHTML = html;
})();