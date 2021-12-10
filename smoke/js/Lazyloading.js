document.addEventListener('DOMContentLoaded', function() {
  const lazyLoadImages = document.querySelectorAll('img.lazy');
  let lazyLoadThrottleTimeout;

  function lazyload () {
    if(lazyLoadThrottleTimeout) {
      clearTimeout(lazyLoadThrottleTimeout)
    }
    lazyLoadThrottleTimeout = setTimeout(() => {
      const scrollTop = window.pageYOffset;

      lazyLoadImages.forEach((img) => {
        if ( img.offsetTop < (window.innerHeight + scrollTop )) {
          img.src = img.dataset.src;
          img.classList.remove('lazy');
        }
      })

      if ( lazyLoadImages.length === 0 ) {
        document.removeEventListener('scroll', lazyload);
        window.removeEventListener('resize', lazyload);
        window.removeEventListener('orientationChange', lazyload);
      }
    }, 20)
  }

  document.removeEventListener('scroll', lazyload);
  window.removeEventListener('resize', lazyload);
  window.removeEventListener('orientationChange', lazyload);
})