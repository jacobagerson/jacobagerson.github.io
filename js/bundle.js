/* js/bundle.js */

document.addEventListener('DOMContentLoaded', () => {

  // ============================================
  // 1. Navbar / Mobile Menu Logic
  // ============================================
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  
  if ($navbarBurgers.length > 0) {
    $navbarBurgers.forEach(el => {
      el.addEventListener('click', () => {
        const target = el.dataset.target;
        const $target = document.getElementById(target);
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
      });
    });
  }

  // ============================================
  // 2. Modal Logic (Open/Close)
  // ============================================
  const rootEl = document.documentElement;
  const $modalTriggers = document.querySelectorAll('.modal-trigger');
  const $modalCloses = document.querySelectorAll('.modal-background, .modal-close, .delete, .modal-card-foot .button');

  // Open Modal
  $modalTriggers.forEach(el => {
    el.addEventListener('click', (event) => {
      event.preventDefault();
      const target = el.dataset.target;
      openModal(target);
    });
  });

  // Close Modal
  $modalCloses.forEach(el => {
    el.addEventListener('click', () => {
      closeAllModals();
    });
  });

  // Close on Escape Key
  document.addEventListener('keydown', (event) => {
    if (event.key === "Escape") closeAllModals();
  });

  function openModal(targetId) {
    const $target = document.getElementById(targetId);
    if ($target) {
      $target.classList.add('is-active');
      rootEl.classList.add('is-clipped');
      
      // Refresh carousel in this modal if it exists
      const carousel = $target.querySelector('.carousel');
      if (carousel && carousel._refresh) carousel._refresh();
    }
  }

  function closeAllModals() {
    document.querySelectorAll('.modal').forEach(el => el.classList.remove('is-active'));
    rootEl.classList.remove('is-clipped');
  }

  // ============================================
  // 3. Carousel Logic (Replacement for Flickity)
  // ============================================
  const carousels = document.querySelectorAll('.carousel');

  carousels.forEach(carousel => {
    // Wrap images in a sliding container
    const images = Array.from(carousel.querySelectorAll('.carousel-cell'));
    if (images.length === 0) return;

    // Create wrapper if it doesn't exist (prevents double init)
    let container = carousel.querySelector('.carousel-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'carousel-container';
        images.forEach(img => container.appendChild(img));
        carousel.appendChild(container);
    }

    // Add navigation buttons
    const prevBtn = document.createElement('button');
    prevBtn.className = 'carousel-btn carousel-prev';
    prevBtn.innerHTML = '&#10094;';
    
    const nextBtn = document.createElement('button');
    nextBtn.className = 'carousel-btn carousel-next';
    nextBtn.innerHTML = '&#10095;';

    carousel.appendChild(prevBtn);
    carousel.appendChild(nextBtn);

    let currentIndex = 0;
    const totalImages = images.length;

    function updateSlide() {
      container.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    // Attach function to element so we can call it when modal opens
    carousel._refresh = () => {
      currentIndex = 0;
      updateSlide();
    };

    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentIndex = (currentIndex === 0) ? totalImages - 1 : currentIndex - 1;
      updateSlide();
    });

    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentIndex = (currentIndex === totalImages - 1) ? 0 : currentIndex + 1;
      updateSlide();
    });
  });
});