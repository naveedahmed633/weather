const apiKey = '625ca2b515a887b89b102da78673996e';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

const searchBox = document.querySelector('#cityInput');
const searchBtn = document.querySelector('.search button');
const resultBox = document.querySelector('.result-box');

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + "&appid=" + apiKey);
    const data = await response.json();
    console.log(data);

    document.querySelector('.temp').innerHTML = Math.round(data['main']['temp']) + "°C";
    document.querySelector('.city').innerHTML = data['name'];
    document.querySelector('.humidity').innerHTML = data['main']['humidity'] + '%';
    document.querySelector('.wind').innerHTML = data['wind']['speed'] + 'km/h';
}

searchBtn.addEventListener('click', () => {
    checkWeather(searchBox.value);
});

searchBox.onkeyup = async function () {
    let input = searchBox.value;
    if (input.length) {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/find?q=${input}&appid=${apiKey}`);
        const data = await response.json();
        const cities = data.list.map(city => city.name);
        console.log(cities);
        display(cities);
    } else {
        resultBox.innerHTML = ''; // Clear the result box if input length is 0
    }
};

function display(result) {
    const content = result.map((city) => {
        return '<li onclick="selectInput(this)">' + city + '</li>';
    });
    resultBox.innerHTML = "<ul>" + content.join('') + "</ul>";
}

function selectInput(list) {
    searchBox.value = list.innerHTML;
    resultBox.innerHTML = '';
}
