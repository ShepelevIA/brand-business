const cardForWhom = (elements) => {
    elements.forEach(element => {
        element.style.height = ''
    });

    const maxHeight = Math.max(...Array.from(elements).map(element => element.offsetHeight))
    
    elements.forEach(element => {
        element.style.height = `${maxHeight}px`
    });
}

window.addEventListener('load', () => {
    cardForWhom(document.querySelectorAll('.card_content_for_whom'))
    cardForWhom(document.querySelectorAll('.program_format_card'))
    cardForWhom(document.querySelectorAll('.card_reviews'))
    cardForWhom(document.querySelectorAll('.card_content_for_whom h3'))

    window.addEventListener('resize', () => {
        cardForWhom(document.querySelectorAll('.card_content_for_whom'))
        cardForWhom(document.querySelectorAll('.program_format_card'))
        cardForWhom(document.querySelectorAll('.card_reviews'))
        cardForWhom(document.querySelectorAll('.card_content_for_whom h3'))
    });
});

const textUpper = () => {
    document.querySelectorAll('h1').forEach(element => {
        Array.from(element.childNodes).forEach(child => {
            if (child.nodeType === 3) {
                child.nodeValue = child.nodeValue.toUpperCase();
            }
        })
    })

    document.querySelectorAll('.wrapper_header nav ul li a').forEach(link => {
        Array.from(link.childNodes).forEach(child => {
            if (child.nodeType === 3) {
                child.nodeValue = child.nodeValue.toUpperCase();
            }
        })
    })
}

textUpper()

const menu = () => {
const offset = document.querySelector('header').offsetTop;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > offset) {
            document.querySelector('header').classList.add('fixed_menu')
        } else {
            document.querySelector('header').classList.remove('fixed_menu')
        }
    });

    for (let i = 0; i < document.querySelectorAll('.wrapper_header nav ul li a').length; i++) {

        document.querySelectorAll('.wrapper_header nav ul li a')[0].classList.add('active_nav_menu_item')

        document.querySelectorAll('.wrapper_header nav ul li a')[i].addEventListener('click', () => {
            for (let j = 0; j < document.querySelectorAll('.wrapper_header nav ul li a').length; j++) {
                document.querySelectorAll('.wrapper_header nav ul li a')[j].classList.remove('active_nav_menu_item')
            }

            document.querySelectorAll('.wrapper_header nav ul li a')[i].classList.add('active_nav_menu_item')
        });
    }

    let isButtonClicked = false

    document.querySelector('.mobile_menu_close').style.display = 'none'

    document.querySelector('.mobile_menu').addEventListener('click', () => {


        document.querySelector('body').style.overflow = 'hidden'
        document.querySelector('.wrapper_header nav ul').style.display = 'flex'

        document.querySelector('.mobile_menu').style.display = 'none'
        document.querySelector('.mobile_menu_close').style.display = 'block'
    
            isButtonClicked = true
            for (let i = 0; i < document.querySelectorAll('.wrapper_header nav ul li a').length; i++) {
                document.querySelectorAll('.wrapper_header nav ul li a')[i].addEventListener('click', () => {
                    animateCloseMenu()
                })
            }

    })

    document.querySelector('.mobile_menu_close').addEventListener('click', () => {
        animateCloseMenu()
    })

    function animateCloseMenu () {
        document.querySelector('.wrapper_header nav ul').animate([
            {
                opacity: 1,
                transform: 'scale(1)'
            },
            {
                opacity: 0,
                transform: 'scale(0)'
            }
        ],500)
        setTimeout(() => {
            document.querySelector('body').removeAttribute('style')
            document.querySelector('.wrapper_header nav ul').removeAttribute('style')
            document.querySelector('.mobile_menu').removeAttribute('style')
            document.querySelector('.mobile_menu_close').style.display = 'none'
            isButtonClicked = false
        }, 500);
    }
};

menu()

const copyright = () => {
    const currentYear = new Date().getFullYear();
    if (currentYear === 2023) {
        document.querySelector('.copyright').textContent = `©brand-business.ru ${currentYear}`
    }
    else {
        document.querySelector('.copyright').textContent = `©brand-business.ru 2023 - ${currentYear}`
    }
}

copyright()