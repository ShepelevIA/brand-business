document.addEventListener('DOMContentLoaded', function () {
  const accordions = document.querySelectorAll('.accordion')

  accordions.forEach(accordion => {
    const accordionItems = accordion.querySelectorAll('.accordion-item')

    accordionItems[0].classList.add('active')

    accordionItems.forEach(item => {
      const header = item.querySelector('.accordion-header')
      const content = item.querySelector('.accordion-content')

      header.addEventListener('click', function () {
        const isActive = item.classList.contains('active');

        accordionItems.forEach(i => {
          i.classList.remove('active');
          i.querySelector('.accordion-content').style.maxHeight = null;
        })

        if (!isActive) {
          item.classList.add('active');
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      })
    })
  })
})
