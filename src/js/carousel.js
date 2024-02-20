document.addEventListener("DOMContentLoaded", function() {
    const carousels = document.querySelectorAll(".carousel")
  
    carousels.forEach(function(carousel, index) {
      const slides = carousel.querySelectorAll(".slide")
      let currentIndex = 0
      let intervalId
  
      function showSlide(index) {
        slides.forEach(function(slide) {
          slide.style.transform = `translateX(-${index * 100}%)`
        })
      }
  
      function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length
        showSlide(currentIndex)
      }
  
      function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length
        showSlide(currentIndex)
      }
  
      function startAutoScroll() {
        intervalId = setInterval(nextSlide, 5000)
      }
  
      function stopAutoScroll() {
        clearInterval(intervalId)
      }
  
      showSlide(currentIndex)
  
      carousel.querySelector(".prev_button").addEventListener("click", function() {
        stopAutoScroll()
        prevSlide()
      });
  
      carousel.querySelector(".next_button").addEventListener("click", function() {
        stopAutoScroll()
        nextSlide()
      })

      carousel.addEventListener("mouseenter", stopAutoScroll)
      carousel.addEventListener("mouseleave", startAutoScroll)
  
      startAutoScroll()
    })
  })
  