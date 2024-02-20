const loadedImage = () => {

    const wrapperBrandOffer = document.querySelector('.wrapper_brand_offer')

    if (window.innerWidth > 1024) {

        wrapperBrandOffer.classList.remove('load_image')
        wrapperBrandOffer.classList.remove('loaded')
    } else {

        if (!wrapperBrandOffer.classList.contains('load_image')) {

            const classes = wrapperBrandOffer.classList.value.split(' ');
            classes.splice(1, 0, 'load_image')
            wrapperBrandOffer.className = classes.join(' ')
        }
    }

    document.querySelectorAll('.load_image').forEach(div => {
        const img = div.querySelector('img')
        const backgroundImageUrl = getComputedStyle(div).backgroundImage.replace(/url\(["']?(.*?)["']?\)/i, "$1")

        function loaded() {
            div.classList.add('loaded')
            div.removeAttribute('style')
        }

        function hasBackgroundImage() {
            return backgroundImageUrl && backgroundImageUrl !== 'none';
        }

        function checkBackgroundImage() {
            if (hasBackgroundImage()) {
                const tempImg = new Image()
                tempImg.src = backgroundImageUrl
                tempImg.onload = loaded
            } else {
                loaded()
            }
        }

        if (img && img.complete) {
            loaded()
            
        } else if (img) {
            img.onload = loaded
           
        }

        if (hasBackgroundImage()) {
            div.style.backgroundImage = 'none'
            checkBackgroundImage()
        }
    });
};

loadedImage();

window.addEventListener('resize', () => {
    loadedImage();
});

const textConsole = (flag) => {
    const textToType = "Brand Business";
    const fadeInDuration = 50;

    function typeText(element, textToType, option) {
        let index = 0;

        function typeNextLetter() {
            const span = document.createElement('span');
            span.textContent = textToType[index];
            element.appendChild(span);
            index++;

            if (index < textToType.length) {
                setTimeout(typeNextLetter, option);
            }
        }

        typeNextLetter();

        if (window.innerWidth === 1171 || window.innerWidth < 1171) {
            document.querySelector('.brand_offer_content_text p').style.display = 'flex';
            document.querySelector('.btn-show-brand_offer').style.display = 'inline-block';
            document.querySelector('.wrapper_marathon').style.display = 'flex';
        } else {
            setTimeout(() => {
                document.querySelector('.brand_offer_content_text p').style.display = 'flex';
            }, 1300);

            setTimeout(() => {
                document.querySelector('.btn-show-brand_offer').style.display = 'inline-block';
            }, 2000);

            setTimeout(() => {
                document.querySelector('.wrapper_marathon').style.display = 'flex';
            }, 2300);
        }
    }

    if (flag === true) {
        const brandH1 = document.querySelector('.brand_offer_content h1');
        if (brandH1) {
            typeText(brandH1, textToType, fadeInDuration);
        }
    } else {
        document.querySelector('.brand_offer_content h1').innerHTML = textToType;
        document.querySelector('.brand_offer_content_text p').style.display = 'flex';
        document.querySelector('.brand_offer_content_text p').style.animation = 'none';
        document.querySelector('.btn-show-brand_offer').style.display = 'inline-block';
        document.querySelector('.wrapper_marathon').style.display = 'flex';
    }
};

document.addEventListener('DOMContentLoaded', () => {
    textConsole(true);
});

document.addEventListener("DOMContentLoaded", function() {
    let controlButton = document.querySelector(".control_footer_button")
    let footer = document.querySelector("footer");
  
    function updateButtonPosition() {
      let scrollPosition = window.scrollY
      let footerOffset = footer.offsetTop
      let windowHeight = window.innerHeight
  
      if (scrollPosition + windowHeight > footerOffset) {
        controlButton.classList.remove("show")
      } else {
        controlButton.classList.add("show")
      }
    }
  
    window.addEventListener("scroll", updateButtonPosition);
  });
  

function scrollToTarget(event, targetSelector, offset) {
    event.preventDefault();
    let targetElement = document.querySelector(targetSelector);
    if (targetElement) {
        let targetOffset = targetElement.offsetTop - offset;
        window.scrollTo({
            top: targetOffset,
            behavior: 'smooth'
        });
    }
}

function elemScrollToTarget(elementScrollToTarget) {
    element = document.querySelector('.' + elementScrollToTarget)

if (element) {
    element.addEventListener('click', function(event) {
        if (event.target.tagName === 'A') {
            let targetSelector = event.target.getAttribute('href');
            let offset = parseInt(event.target.getAttribute('data-offset'), 10) || 0;
            scrollToTarget(event, targetSelector, offset);
        }
    });
}
}

elemScrollToTarget('menu_list')
elemScrollToTarget('brand_offer_content_text')
elemScrollToTarget('control_footer_button')
      
document.addEventListener('DOMContentLoaded', function () {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          } else {
            entry.target.classList.remove('visible');
          }
        });
      });

    const animateToWatch = (elementsToWatch, observer) => {
        elementsToWatch.forEach(element => {
            observer.observe(element);
          });
    }

    animateToWatch(document.querySelectorAll('.emotional_quote_description'), observer)
    animateToWatch(document.querySelectorAll('.card_content_for_whom'), observer)
    animateToWatch(document.querySelectorAll('.accordion-item'), observer)
    animateToWatch(document.querySelectorAll('.program_format_card'), observer)
    animateToWatch(document.querySelectorAll('.list_program_result ol li'), observer)
    animateToWatch(document.querySelectorAll('.avtor_card p'), observer)
    animateToWatch(document.querySelectorAll('.card_rates'), observer)

});




