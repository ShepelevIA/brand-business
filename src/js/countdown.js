function getTimeRemaining(endTime) {
    const totalMilliseconds = Date.parse(endTime) - Date.now();
    const seconds = Math.floor((totalMilliseconds / 1000) % 60);
    const minutes = Math.floor((totalMilliseconds / 1000 / 60) % 60);
    const hours = Math.floor((totalMilliseconds / (1000 * 60 * 60)) % 24);
    const days = Math.floor(totalMilliseconds / (1000 * 60 * 60 * 24));

    return {
        totalMilliseconds,
        days,
        hours,
        minutes,
        seconds
    };
}

function updateClock(endTime, elements, timeInterval) {
    for (const element of elements) {
        const timeRemaining = getTimeRemaining(endTime);

        if (timeRemaining.totalMilliseconds <= 0) {
            clearInterval(timeInterval);
            timerEnd(timeRemaining.days = 0, timeRemaining.hours = 0, timeRemaining.minutes = 0, timeRemaining.seconds = 0);
        }

        element.innerHTML = `
        <span class="message-countdown">До увеличения цены осталось</span>
        <div class="countdown-time">
            <!-- <div class="countdown-day">${timeRemaining.days} <span>д</span></div> -->
            <div class="countdown-hours">${('0' + timeRemaining.hours).slice(-2)} <span>ч</span></div>
            <div class="countdown-minutes">${('0' + timeRemaining.minutes).slice(-2)} <span>м</span></div>
            <div class="countdown-seconds">${('0' + timeRemaining.seconds).slice(-2)} <span>с</span></div>
        </div>`;

    }
}


function initializeClock(endTime, className) {
    const elements = document.querySelectorAll(`.${className}`);
    const timeInterval = setInterval(() => updateClock(endTime, elements, timeInterval), 1000);

    // Возвращаем timeInterval, чтобы он был доступен внутри updateClock
    return timeInterval;
}

const timerEnd = (days, hours, minutes, seconds) => {
    if (days === 0, hours === 0, minutes === 0, seconds === 0) {
        document.querySelectorAll('.wrapper_bassic_price').forEach(elem => {
            elem.classList.add('wrapper_bassic_price_show');
        })
        document.querySelectorAll('.wrapper_price_for_the_webinar').forEach(elem => {
            elem.classList.add('wrapper_price_for_the_webinar_hide');
        })
        document.querySelectorAll('.countdown-container').forEach(elem => {
            elem.classList.add('countdown-container-hide');
        });
    }
}

function updatePrices(basePrice, basePriceElement, startDate, endDate, increaseAmount) {
    // Calculate the number of days between the start date and the current date
    var daysPassed = Math.floor((Date.now() - Date.parse(startDate)) / (24 * 60 * 60 * 1000));

    // Calculate the new price based on the number of days passed
    var currentPrice = basePrice + daysPassed * increaseAmount;

    // Update the text on the page
    basePriceElement.textContent = currentPrice + ' ₽';

    // Check if the current date is within the specified period
    if (Date.now() >= Date.parse(startDate) && Date.now() <= Date.parse(endDate)) {
        // Set the time for the next price update to the next day
        var nextIncrease = new Date();
        nextIncrease.setDate(nextIncrease.getDate() + 1);
        nextIncrease.setHours(0, 0, 0, 0);

        // Calculate the timeout until the next day
        var timeout = nextIncrease - Date.now();

        // Set a timer for the next price update
        setTimeout(function () {
            updatePrices(currentPrice, basePriceElement, startDate, endDate, increaseAmount);
        }, timeout);
    }
}

const priceRates = () => {
    document.querySelectorAll('.price_rates').forEach((priceRaising) => {
        let dataCountdown = priceRaising.getAttribute('data-countdown')
        if (dataCountdown === 'webinar') {
            const deadline = '2023-11-22T20:59:59';
            const timeInterval = initializeClock(deadline, 'countdown-item');
        } else if (dataCountdown === 'raising-price') {
            for (let i = 0; i < document.querySelectorAll('.price_rates').length; i++) {
                let countdownContainer = document.querySelectorAll('.price_rates')[0].querySelector('.countdown-container')
                countdownContainer.style.display = 'none'
            }

            document.querySelectorAll('.wrapper_bassic_price').forEach(elem => {
                elem.classList.add('wrapper_bassic_price_show');
            })
            document.querySelectorAll('.wrapper_price_for_the_webinar').forEach(elem => {
                elem.classList.add('wrapper_price_for_the_webinar_hide');
            })

            let startDate = '2023-11-23T13:00:00';
            const deadline = '2023-11-27T21:00:00';
            let increaseAmount = 1000;

            updatePrices(34990, document.getElementById('basePrice'), startDate, deadline, increaseAmount);
            const timeInterval = initializeClock(deadline, 'countdown-item');
        } else if (dataCountdown === 'turn-off') {
            document.querySelectorAll('.wrapper_bassic_price').forEach(elem => {
                elem.classList.add('wrapper_bassic_price_show');
            })
            document.querySelectorAll('.wrapper_price_for_the_webinar').forEach(elem => {
                elem.classList.add('wrapper_price_for_the_webinar_hide');
            })
        }

    })
}

priceRates();




