let form = (param, flag, currentCard) => {
    let wrapperPopUp = param;

    if (flag === 'show') {
        wrapperPopUp = document.createElement('div');
        wrapperPopUp.classList.add('wrapper_popUp');

        const filePath = '../form.html';

        fetch(filePath)
            .then(response => response.text())
            .then(html => {
                wrapperPopUp.innerHTML = html;

                let formElement = wrapperPopUp.querySelector('.feedback_form_form');

                receiveRateAndPrice(formElement, currentCard);

                inputCastes(formElement);

                document.body.style.overflow = 'hidden';

                let firstChild = document.body.firstChild;

                document.body.insertBefore(wrapperPopUp, firstChild);

                wrapperPopUp.animate(
                    [
                        {
                            opacity: 0,
                        },
                        {
                            opacity: 1,
                        },
                    ],
                    500
                );

                submitForm(formElement, currentCard);

                wrapperPopUp
                    .querySelector('.close_btn_popUpForm')
                    .addEventListener('click', () => {
                        document.body.removeAttribute('style');
                        form(wrapperPopUp, 'hide');
                    });
            })
            .catch(error => console.error('Ошибка загрузки формы:', error));
    } else if (flag === 'hide') {
        wrapperPopUp.animate(
            [
                {
                    opacity: 1,
                },
                {
                    opacity: 0,
                },
            ],
            500
        );
        setTimeout(() => {
            document.body.removeChild(wrapperPopUp);
        }, 500);
    }
};

for (let i = 0; i < document.querySelectorAll('.btn_buy_rates').length; i++) {
    document.querySelectorAll('.btn_buy_rates')[i].addEventListener('click', function () {
        let currentCard = this.closest('.card_rates');
        form(null, 'show', currentCard);
    });
}

const inputCastes = form => {
    let wrapperInputs = form.querySelectorAll('.popUp .wrapper_input');
    wrapperInputs.forEach(function (wrapperInput) {
        let inputField = wrapperInput.querySelector('input');

        wrapperInput.querySelector('label').addEventListener('click', function () {
            inputField.focus();
        });

        inputField.addEventListener('focus', function () {
            wrapperInput.classList.add('active');
        });

        inputField.addEventListener('blur', function () {
            if (inputField.value === '') {
                wrapperInput.classList.remove('active');
            }
        });
    });
};

const receiveRateAndPrice = (form, currentCard) => {
    let rateInput = form.querySelector('#rate');
    let priceInput = form.querySelector('#price');

    let rate = currentCard.querySelector('.card_rates_rate').textContent;

    let price
    if (currentCard.querySelector('.wrapper_bassic_price').classList.contains('wrapper_bassic_price_show')) {
        price = currentCard.querySelector('.bassic_price').textContent;
    }
    else if (!currentCard.querySelector('.price_for_the_webinar').classList.contains('wrapper_price_for_the_webinar_hide')) {
        price = currentCard.querySelector('.price_for_the_webinar').textContent;
    }

    rateInput.value = rate;
    priceInput.value = price;

    // console.log(rateInput.value, priceInput.value);
};

const submitForm = (form) => {
    form.addEventListener('submit', event => {
        event.preventDefault();
        let xhr = new XMLHttpRequest();

        xhr.open('POST', '../feedback.php', true);

        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {

                const response = JSON.parse(xhr.responseText);

                window.location.href = response;


            } else {
                console.error('Ошибка запроса: ' + xhr.statusText);
            }
        };

        xhr.onerror = function () {
            console.error('Ошибка сети');
        };

        xhr.ontimeout = function () {
            console.error('Превышено время ожидания запроса');
        };

        xhr.timeout = 5000;

        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        let formData = new FormData(form);

        let encodedData = new URLSearchParams(formData).toString();

        xhr.send(encodedData);

        document.body.removeAttribute('style');

    });
};
