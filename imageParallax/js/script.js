document.addEventListener('mousemove', parallex)

function parallex(e) {
  this.querySelectorAll('.layer').forEach(layer => {
    // console.log(e.pageX)
    var speed = layer.getAttribute('data-speed')
    var x = (window.innerWidth - e.pageX * speed) / 250
    var y = (window.innerWidth - e.pageX * speed) / 250
    layer.style.transform = 'translate(' + (-x) + 'px) translateY(' + y + 'px)'
  });
}