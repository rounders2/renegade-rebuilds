/* =========================================================
   Renegade Rebuilds — static rebuild behavior
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Back-to-top button (fades in on scroll) ---------- */
  var scrollTopBtn = document.querySelector('.scroll-top');
  if (scrollTopBtn) {
    var SCROLL_TOP_THRESHOLD = 400;
    var ticking = false;

    function updateScrollTopVisibility() {
      scrollTopBtn.classList.toggle('is-visible', window.scrollY > SCROLL_TOP_THRESHOLD);
      ticking = false;
    }

    updateScrollTopVisibility();
    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollTopVisibility);
        ticking = true;
      }
    }, { passive: true });
  }

  /* ---------- Mobile nav toggle ---------- */
  var navToggle = document.getElementById('navToggle');
  var navList = document.querySelector('.nav-list');
  if (navToggle && navList) {
    navToggle.addEventListener('click', function () {
      var isOpen = navList.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  /* ---------- Hero slider (fade, no autoplay) ---------- */
  var slider = document.getElementById('heroSlider');
  if (slider) {
    var slides = Array.prototype.slice.call(slider.querySelectorAll('.slide'));
    var dots = Array.prototype.slice.call(slider.querySelectorAll('.dot'));
    var current = 0;

    function goToSlide(index) {
      var total = slides.length;
      current = (index + total) % total;
      slides.forEach(function (slide, i) {
        slide.classList.toggle('is-active', i === current);
      });
      dots.forEach(function (dot, i) {
        dot.classList.toggle('is-active', i === current);
      });
    }

    var prevBtn = document.getElementById('prevSlide');
    var nextBtn = document.getElementById('nextSlide');
    if (prevBtn) prevBtn.addEventListener('click', function () { goToSlide(current - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { goToSlide(current + 1); });

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () { goToSlide(i); });
    });
  }

  /* ---------- Accordion "read more" toggles ---------- */
  var toggleButtons = Array.prototype.slice.call(document.querySelectorAll('.toggle-btn'));
  toggleButtons.forEach(function (btn) {
    var key = btn.getAttribute('data-toggle');
    var content = document.getElementById('toggle-' + key);
    if (!content) return;

    function setState(open) {
      content.setAttribute('data-open', open ? 'true' : 'false');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (open) {
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        content.style.maxHeight = '0px';
      }
    }

    // initialize from markup (data-open attribute set server-side)
    setState(content.getAttribute('data-open') === 'true');

    btn.addEventListener('click', function () {
      var open = content.getAttribute('data-open') === 'true';
      setState(!open);
    });
  });

  // Recalculate open accordions on resize (so max-height stays accurate)
  window.addEventListener('resize', function () {
    document.querySelectorAll('.toggle-content[data-open="true"]').forEach(function (el) {
      el.style.maxHeight = el.scrollHeight + 'px';
    });
  });

  /* ---------- Simple lightbox for project galleries ---------- */
  var lightboxLinks = Array.prototype.slice.call(document.querySelectorAll('.lightbox-link'));
  if (lightboxLinks.length) {
    var overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Image viewer');
    overlay.innerHTML = '<button class="lightbox-close" aria-label="Close">&times;</button>' +
      '<img class="lightbox-img" src="" alt="">' +
      '<div class="lightbox-nav">' +
      '<button class="lightbox-prev" aria-label="Previous">&#10094;</button>' +
      '<button class="lightbox-next" aria-label="Next">&#10095;</button>' +
      '</div>';
    document.body.appendChild(overlay);

    var lbImg = overlay.querySelector('.lightbox-img');
    var closeBtn = overlay.querySelector('.lightbox-close');
    var prevBtn2 = overlay.querySelector('.lightbox-prev');
    var nextBtn2 = overlay.querySelector('.lightbox-next');
    var focusableEls = [prevBtn2, nextBtn2, closeBtn];
    var lastFocusedEl = null;

    var groups = {};
    lightboxLinks.forEach(function (link) {
      var group = link.closest('[data-gallery]');
      var groupKey = group ? group.getAttribute('data-gallery') : 'default';
      if (!groups[groupKey]) groups[groupKey] = [];
      groups[groupKey].push(link);
      link.setAttribute('data-group-key', groupKey);
    });

    var activeGroup = [];
    var activeIndex = 0;

    function openLightbox(link) {
      var groupKey = link.getAttribute('data-group-key') || 'default';
      activeGroup = groups[groupKey] || [link];
      activeIndex = activeGroup.indexOf(link);
      showActive();
      lastFocusedEl = document.activeElement;
      overlay.classList.add('is-open');
      closeBtn.focus();
      document.body.style.overflow = 'hidden';
    }

    function showActive() {
      var link = activeGroup[activeIndex];
      lbImg.src = link.getAttribute('href');
      lbImg.alt = link.querySelector('img') ? link.querySelector('img').alt : '';
    }

    function closeLightbox() {
      overlay.classList.remove('is-open');
      document.body.style.overflow = '';
      if (lastFocusedEl) lastFocusedEl.focus();
    }

    lightboxLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        openLightbox(link);
      });
    });

    closeBtn.addEventListener('click', closeLightbox);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeLightbox();
    });
    prevBtn2.addEventListener('click', function () {
      activeIndex = (activeIndex - 1 + activeGroup.length) % activeGroup.length;
      showActive();
    });
    nextBtn2.addEventListener('click', function () {
      activeIndex = (activeIndex + 1) % activeGroup.length;
      showActive();
    });
    document.addEventListener('keydown', function (e) {
      if (!overlay.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevBtn2.click();
      if (e.key === 'ArrowRight') nextBtn2.click();
      if (e.key === 'Tab') {
        // trap focus within the dialog
        var first = focusableEls[0];
        var last = focusableEls[focusableEls.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });

    // Swipe support (mobile)
    var touchStartX = 0;
    var touchStartY = 0;
    var SWIPE_THRESHOLD = 40;
    lbImg.addEventListener('touchstart', function (e) {
      touchStartX = e.changedTouches[0].clientX;
      touchStartY = e.changedTouches[0].clientY;
    }, { passive: true });
    lbImg.addEventListener('touchend', function (e) {
      var dx = e.changedTouches[0].clientX - touchStartX;
      var dy = e.changedTouches[0].clientY - touchStartY;
      if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0) nextBtn2.click(); else prevBtn2.click();
      }
    }, { passive: true });
  }

});
