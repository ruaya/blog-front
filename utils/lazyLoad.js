function checkImgs(el) {
  const imgs = Array.from(document.querySelectorAll(el))
  imgs.forEach(item => doIo.observe(item))
}

function loadImg(el) {
  if (!el.src) {
    const source = el.dataset.large
    el.src = source
  }
}

const doIo = new IntersectionObserver(ios => {
  ios.forEach(io => {
    const el = io.target
    const intersectionRatio = io.intersectionRatio
    if (intersectionRatio > 0 && intersectionRatio <= 1) {
      loadImg(el)
    }
    el.onload = () => {
      setTimeout(() => {
        el.classList.add('loaded')
        el.style.display = 'block'
        el.previousElementSibling.classList.add('hidden')
      }, 400);
      doIo.unobserve(el)
    }
    el.onerror = () => doIo.unobserve(el)
  })
})

export default checkImgs