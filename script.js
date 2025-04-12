document.addEventListener('DOMContentLoaded', function () {
  const textItems = document.querySelectorAll('.text-item');
  const displayedImage = document.getElementById('displayed-image');
  let currentActiveItem = document.querySelector('.text-item.active');

  textItems.forEach(item => {
    item.addEventListener('click', function () {
      // If clicking the already active item, do nothing
      if (this === currentActiveItem) return;

      // Remove active class from current active item
      currentActiveItem.classList.remove('active');

      // Add active class to clicked item
      this.classList.add('active');
      currentActiveItem = this;

      // Change image with fade effect
      displayedImage.classList.add('fade');

      setTimeout(() => {
        displayedImage.src = this.getAttribute('data-image');
        displayedImage.alt = this.textContent.trim().split('\n')[0];
        displayedImage.classList.remove('fade');
      }, 500);
    });
  });

  const animateOnScroll = function () {
    const animatedElements = document.querySelectorAll('[data-animate]');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const animationType = element.getAttribute('data-animate');
          const delay = element.getAttribute('data-delay') || 0;

          setTimeout(() => {
            element.classList.add(animationType === 'slide-up' ? 'slide-up' : 'fade-in');
            element.style.opacity = 1; // Make visible before animation starts
          }, delay);

          observer.unobserve(element);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(element => {
      observer.observe(element);
    });
  };

  animateOnScroll();
});

document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault(); // stop page from refreshing
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const msg = document.getElementById('message').value;
  alert('Hello, ' + name + '! Form submitted.');
});

// Add an event listener to all modals with videos
const modals = document.querySelectorAll('.modal');

modals.forEach(modal => {
  modal.addEventListener('hidden.bs.modal', function () {
    // Find the video element inside the modal
    const video = modal.querySelector('video');
    if (video) {
      video.pause();           // Pause the video
      video.currentTime = 0;   // Reset the video to the start
    }
  });
});
