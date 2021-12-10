window.onload = () => {
  const opserverOption = {
    root: null,
    rootMargin: "0px 0px 0px 0px",
    threshold: 0.2
  }

  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if ( entry.isIntersecting ) {
        entry.target.src = entry.target.dataset.src
        observer.unobserve(entry.target)
      }
    })
  }, opserverOption)

  const lazyImages = document.querySelectorAll('.lazy');
  lazyImages.forEach( el => {
    io.observe(el)
  })
}