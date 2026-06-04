let state
let city = 'Brovary'

const cityInput = document.getElementById('locationFilter')
const button = document.getElementById('button')
const searchForm = document.getElementById('searchForm')
const result = document.getElementById('result')

async function getWeather() {

    let url = `http://api.weatherapi.com/v1/forecast.json?key=13861b9bf83441f783d142802262805&q=${city}&days=3&aqi=no&alerts=no`

    try{
        const response = await fetch(url)

        state = await response.json()

        redrawWeather()

    } catch(err){
        console.log(err)
        // alert('This city doesnt exist')
    }
}

function redrawWeather(){
const inOneDay = state.forecast.forecastday[1];
const inTwoDays = state.forecast.forecastday[2];

result.innerHTML = `
<div class="card">
<h1>${state.location.name}</h1>
<p>${state.current.condition.text}</p>
<img src="${state.current.condition.icon}" alt="">
<p>Temperature: ${state.current.temp_c}</p>
<p>Wind speed: ${state.current.wind_kph}</p>
<p>Sunrise time: ${state.forecast.forecastday[0].astro.sunrise}</p>
<p>Sunset time: ${state.forecast.forecastday[0].astro.sunset}</p>
</div>

<div class="card">
<h2>Tomorrow (${inOneDay.date})</h2>
        <p>${inOneDay.day.condition.text}</p>
        <img src="${inOneDay.day.condition.icon}" alt="">
        <p>Average temperature: ${inOneDay.day.avgtemp_c}C</p>
        <p>Max wind speed: ${inOneDay.day.maxwind_kph}</p>
        <p>Sunrise time: ${inOneDay.astro.sunrise}</p>
        <p>Sunset time: ${inOneDay.astro.sunset}</p>
</div>
        `
}

button.addEventListener('click', (event)=>{
    event.preventDefault()
    city = cityInput.value
    console.log(city)
    getWeather()
    console.log(state)
})