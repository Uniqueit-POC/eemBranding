/**
 * Portfolio detail — "Our Work" slider: same-category projects only.
 */
(function () {
  var IMG = './assets/images/EEM-Portfolio';

  var TAG_TO_CAT = {
    'Logo Design': 'branding',
    'Catalogue Design': 'catalogue',
    'Packaging Design': 'packaging',
    'Social Media Creative': 'social',
    '3D Rendering': 'rendering'
  };

  var CATALOGUE = [
    { href: 'arica.html', img: IMG + '/All-catalogue/Arica/Arica-01.webp', title: 'Arica', sub: 'Catalogue Design' },
    { href: 'atina.html', img: IMG + '/All-catalogue/atina/atina01.webp', title: 'Atina', sub: 'Catalogue Design' },
    { href: 'asa-decosheets.html', img: IMG + '/All-catalogue/dazzle-berry-asa/dazzle-berry-asa-01.webp', title: 'ASA Decosheets', sub: 'Catalogue Design' },
    { href: 'lucullian.html', img: IMG + '/All-catalogue/dazzle-berry-pastel-crystal/01.webp', title: 'Lucullian', sub: 'Catalogue Design' },
    { href: 'bliss.html', img: IMG + '/All-catalogue/kooyoo/kooyoo-01.webp', title: 'Bliss Decor', sub: 'Catalogue Design' },
    { href: 'greta.html', img: IMG + '/All-catalogue/greta-1/greta-01.webp', title: 'Greta Lam', sub: 'Catalogue Design' },
    { href: 'live-in-colour.html', img: IMG + '/All-catalogue/kaptone/kaptone-01.webp', title: 'Live in Colour', sub: 'Catalogue Design' },
    { href: 'kianna.html', img: IMG + '/All-catalogue/kiana%20acrylic/kiana-acrylic-01.webp', title: 'Kianna', sub: 'Catalogue Design' },
    { href: 'greta.html', img: IMG + '/All-catalogue/greta/greeta-0.8-01.webp', title: 'Greta Lam Stylish', sub: 'Catalogue Design' },
    { href: 'ranwood-face-of-grandeur.html', img: IMG + '/All-catalogue/ranwood/ranwood-01.webp', title: 'Ranwood – Face of Grandeur', sub: 'Catalogue Design' },
    { href: 'ranwood-masterpiece-of-prestige.html', img: IMG + '/All-catalogue/ranwood%20rega/ranwood-01.webp', title: 'Ranwood – Masterpiece', sub: 'Catalogue Design' },
    { href: 'luxe-style.html', img: IMG + '/All-catalogue/kooyoo/kooyoo-01.webp', title: 'Luxe Style', sub: 'Catalogue Design' },
    { href: 'trends-by-ranberry.html', img: IMG + '/All-catalogue/ranberry%20new/ranberry-new-01.webp', title: 'Trends by Ranberry', sub: 'Catalogue Design' },
    { href: 'ranberry-south.html', img: IMG + '/All-catalogue/ranberry%20new%20south/01-ran-berry.webp', title: 'Ranberry New South', sub: 'Catalogue Design' },
    { href: 'rang-in-matt-book.html', img: IMG + '/All-catalogue/rangin/rangin-01.webp', title: 'Rang In Matt Book', sub: 'Catalogue Design' }
  ];

  var BRANDING = [
    { href: 'aaryan-tradelink.html', img: IMG + '/All-catalogue/aaryan/aaryan-01.webp', title: 'Aaryan Tradelink', sub: 'Logo Design' },
    { href: 'arrow-paper-products.html', img: IMG + '/All-catalogue/arrow/arrow-01.webp', title: 'Arrow Paper Products', sub: 'Logo Design' },
    { href: 'moxello-realty.html', img: IMG + '/All-catalogue/Moxello%20realty/moxello-realty.webp', title: 'Moxello Realty', sub: 'Logo Design' },
    { href: 'mybankloan-ai.html', img: IMG + '/All-catalogue/mybankloan.ai/01.webp', title: 'MYBANKLOAN.AI', sub: 'Logo Design' },
    { href: 'prospact-design-studio.html', img: IMG + '/All-catalogue/prospact%20design%20studio/prospact-design-studio-01.webp', title: 'Prospact Design Studio', sub: 'Logo Design' },
    { href: 'rang-in-logo.html', img: IMG + '/All-catalogue/rangin/rangin-01.webp', title: 'Rang-In', sub: 'Logo Design' },
    { href: 'smart-home.html', img: IMG + '/All-catalogue/smart%20home/smart-home-01.webp', title: 'SmartHomes', sub: 'Logo Design' },
    { href: 'vividus.html', img: IMG + '/All-catalogue/vividums%2001/vividums-01.webp', title: 'Vividus', sub: 'Logo Design' }
  ];

  var PACKAGING = [
    { href: 'iscon.html', img: IMG + '/All-catalogue/Iscon/back-design-01.webp', title: 'Iscon', sub: 'Packaging Design' },
    { href: 'voxo.html', img: IMG + '/All-catalogue/VOXO/voxo-01.webp', title: 'VOXO', sub: 'Packaging Design' },
    { href: 'vauric.html', img: IMG + '/All-catalogue/Vauric/vauric-0.webp', title: 'Vauric', sub: 'Packaging Design' }
  ];

  var SOCIAL = [
    { href: 'iscon-gathiya.html', img: IMG + '/All-catalogue/Iscon%20Gathiya/iscon-01.webp', title: 'Iscon Gathiya', sub: 'Social Media Creative' },
    { href: 'puriteo.html', img: IMG + '/All-catalogue/Puriteo/puriteo-01.webp', title: 'Puriteo', sub: 'Social Media Creative' },
    { href: 'rosewood.html', img: IMG + '/All-catalogue/Rosewood/01.webp', title: 'Rosewood', sub: 'Social Media Creative' },
    { href: 'suntouch.html', img: IMG + '/All-catalogue/Suntouch/sun-touch-01.webp', title: 'Suntouch', sub: 'Social Media Creative' }
  ];

  var RENDERING = [
    { href: '3d-rendering-portfolio.html', img: IMG + '/3D-New-Size/3D-01.webp', title: '3D Rendering', sub: '3D Rendering' }
  ];

  var BY_CATEGORY = {
    catalogue: CATALOGUE,
    branding: BRANDING,
    packaging: PACKAGING,
    social: SOCIAL,
    rendering: RENDERING
  };

  function currentPage() {
    var path = window.location.pathname || '';
    var name = path.split('/').pop() || 'index.html';
    if (!name) name = 'index.html';
    return name.toLowerCase();
  }

  function getCategory() {
    var tagEl = document.querySelector('.intro-tag');
    if (!tagEl) return 'catalogue';
    var text = (tagEl.textContent || '').trim();
    return TAG_TO_CAT[text] || 'catalogue';
  }

  function cardHtml(p) {
    return (
      '<div class="sl-card" data-href="' + p.href + '">' +
      '<div class="sl-card-img"><img src="' + p.img + '" alt="' + p.title + '"></div>' +
      '<div class="sl-card-info"><div>' +
      '<div class="sl-card-title">' + p.title + '</div>' +
      '<div class="sl-card-sub">' + p.sub + '</div></div>' +
      '<button class="sl-arrow-btn" aria-label="View details">' +
      '<svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/>' +
      '<polyline points="12 5 19 12 12 19"/></svg></button></div></div>'
    );
  }

  function initSlider() {
    var track = document.getElementById('sliderTrack');
    var btnPrev = document.getElementById('slPrev');
    var btnNext = document.getElementById('slNext');
    if (!track || !btnPrev || !btnNext) return;

    var cards = track.querySelectorAll('.sl-card');
    if (!cards.length) return;

    var current = 0;

    function visibleCount() {
      var w = window.innerWidth;
      if (w <= 767) return 1;
      if (w <= 991) return 2;
      return 3;
    }

    function cardWidth() {
      return cards[0].getBoundingClientRect().width + 14;
    }

    function maxIndex() {
      return Math.max(0, cards.length - visibleCount());
    }

    function goTo(idx) {
      current = Math.max(0, Math.min(idx, maxIndex()));
      track.style.transform = 'translateX(-' + (current * cardWidth()) + 'px)';
    }

    btnPrev.addEventListener('click', function () { goTo(current - 1); });
    btnNext.addEventListener('click', function () { goTo(current + 1); });

    cards.forEach(function (card) {
      var arrowBtn = card.querySelector('.sl-arrow-btn');
      var href = card.dataset.href || '#';
      if (arrowBtn) {
        arrowBtn.addEventListener('click', function (e) {
          e.stopPropagation();
          window.location.href = href;
        });
      }
      card.addEventListener('click', function () { window.location.href = href; });
    });

    window.addEventListener('resize', function () { goTo(current); });
  }

  function populateRelatedWork() {
    var track = document.getElementById('sliderTrack');
    if (!track) return;

    var cat = getCategory();
    var page = currentPage();
    var list = BY_CATEGORY[cat] || CATALOGUE;
    var related = list.filter(function (p) {
      return p.href.toLowerCase() !== page;
    });

    track.innerHTML = related.map(cardHtml).join('');
    initSlider();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', populateRelatedWork);
  } else {
    populateRelatedWork();
  }
})();
