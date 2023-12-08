//Phone Checker
const phoneInput = document.querySelector('#phone_input');
const phoneButton = document.querySelector('#phone_button');
const phoneSpan = document.querySelector('#phone_result');

const reqExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/

phoneButton.addEventListener('click', () => {
    if (reqExp.test(phoneInput.value)) {
        phoneSpan.innerHTML = 'This number is True';
        phoneSpan.style.color = 'green';
    } else {
        phoneSpan.innerHTML = 'This number is False';
        phoneSpan.style.color = 'red';
    }
})

//TAB SLIDER
const tabContentCards = document.querySelectorAll('.tab_content_block'),
    tabItems = document.querySelectorAll('.tab_content_item'),
    tabItemsParents = document.querySelector('.tab_content_items')

const hightTabsContentCards = () => {
    tabContentCards.forEach((tabContentCard) => {
        tabContentCard.style.display = 'none';
    })
}

const showTabsContentCards = (indexElement = 0) => {
    tabContentCards[indexElement].style.display = 'block'
    tabItems[indexElement].classList.add('tab_content_item_active')
}

hightTabsContentCards()
showTabsContentCards()

tabItemsParents.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')) {
        tabItems.forEach((tabItem, tabItemIndex) => {
            if (event.target === tabItem) {
                hightTabsContentCards()
                showTabsContentCards(tabItemIndex)
            }
        })
    }
}

let currentIndex = 0;
let intervalId;

const startAutoSlider = () => {
    intervalId = setInterval(() => {
        hightTabsContentCards()
        showTabsContentCards(currentIndex)
        currentIndex = (currentIndex + 1) % tabItems.length
    }, 2000);
}

startAutoSlider()

//converter
const somInput = document.querySelector('#som'),
    usdInput = document.querySelector('#usd'),
    eurInput = document.querySelector('#eur')


const converter = (element, targetElement, type) => {
    element.oninput = async () => {
        try {
            const response = await fetch('../data/converter.json');
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }

            const data = await response.json();

            switch (type) {
                case 'som':
                    targetElement.value = (element.value / data.usd).toFixed(2);
                    eurInput.value = (element.value / data.eur).toFixed(2);
                    if (element.value === '') {
                        usdInput.value = '';
                        eurInput.value = '';
                    }
                    break;
                case 'usd':
                    targetElement.value = (element.value * data.usd).toFixed(2);
                    eurInput.value = (element.value * data.usd / data.eur).toFixed(2);
                    if (element.value === '') {
                        somInput.value = '';
                        eurInput.value = '';
                    }
                    break;
                case 'eur':
                    targetElement.value = (element.value * data.eur).toFixed(2);
                    usdInput.value = (element.value * data.eur / data.usd).toFixed(2);
                    if (element.value === '') {
                        somInput.value = '';
                        usdInput.value = '';
                    }
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.error('Error fetching or parsing data:', error);
        }
    };
};


converter(somInput, usdInput, 'som')
converter(usdInput, somInput, 'usd')
converter(eurInput, somInput, 'eur')


//weather
const cityNameInput = document.querySelector('.cityName'),
    city = document.querySelector('.city'),
    temp = document.querySelector('.temp')


const WEATHER_API = 'http://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'e417df62e04d3b1b111abeab19cea714';

cityNameInput.oninput = async (event)=>{
    try {
        const response = await fetch(`${WEATHER_API}?q=${event.target.value}&appid=${API_KEY}`)
        const  data = await response.json()
        city.innerHTML = data.name ? data.name:'Город не найден'
        temp.innerHTML = data?.main?.temp?Math.round(data?.main?.temp - 273) + "&deg;C":'...'
    }catch (e){
        console.error('e')
    }
}