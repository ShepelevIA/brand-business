document.addEventListener('DOMContentLoaded', () => {
    const groups = {}

    function popUp(btn, cardSelector) {
        let wrapperPopUp = document.createElement('div')
        wrapperPopUp.classList.add('wrapper_popUp')
        let popUp = document.createElement('div')
        popUp.classList.add('popUp')

        document.body.style.overflow = 'hidden'

        document.body.appendChild(wrapperPopUp)

        let closeBtnPopUp = document.createElement('button')
        closeBtnPopUp.classList.add('close_btn_popUp')
        closeBtnPopUp.innerHTML = '<i class="fa-solid fa-xmark"></i>'
        wrapperPopUp.appendChild(closeBtnPopUp)

        wrapperPopUp.animate([
            {
                opacity: 0
            },
            {
                opacity: 1
            }
        ], 500)

    

        let cardContainer = btn.closest('.' + cardSelector) // Используем переданный селектор
      
        if (cardContainer) {
            let clonedContent = cardContainer.cloneNode(true)
            clonedContent.classList.add(cardContainer.classList[0] + '_popUp') // Добавляем '_popUp' к первому классу карточки
            clonedContent.classList.remove(cardContainer.classList[0]) // Удаляем первый класс карточки
            let removeContent = clonedContent.querySelector('.control_popUp')
            if (removeContent) {
                removeContent.remove()
            }
            popUp.appendChild(clonedContent)

            wrapperPopUp.appendChild(popUp)

            closeBtnPopUp.addEventListener('click', () => {
                document.body.removeAttribute('style')
                wrapperPopUp.animate([
                    {
                        opacity: 1
                    },
                    {
                        opacity: 0
                    }
                ], 500)
                setTimeout(() => {
                    document.body.removeChild(wrapperPopUp)
                }, 500)
            })
        }
    }

    document.querySelectorAll('.popUp_btn').forEach((btn) => {
        btn.addEventListener('click', (event) => {
            event.preventDefault()
            let group = btn.closest('[data-control-popup]').getAttribute('data-control-popup')
            let cardSelector = btn.getAttribute('data-popup-content') 

            if (groups[group] === undefined) {
                groups[group] = 0
            }

            popUp(btn, cardSelector)

            
            groups[group]++
        })
    })
})
