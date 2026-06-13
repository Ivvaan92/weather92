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
        alert('This city doesnt exist')
    }
}

function redrawWeather(){
const inOneDay = state.forecast.forecastday[1];
const inTwoDays = state.forecast.forecastday[2];

result.innerHTML = `
<h1 id="cityName">${state.location.name}</h1>
<div class="container">
<div class="card">
<h2>Today (${state.forecast.forecastday[0].date})</h2>
<p>Weather: ${state.current.condition.text}</p>
<img src="${state.current.condition.icon}" alt="">
<p>Temperature: ${state.current.temp_c}C</p>
<p>Wind speed: ${state.current.wind_kph} kph</p>
<p>Sunrise time: ${state.forecast.forecastday[0].astro.sunrise}</p>
<p>Sunset time: ${state.forecast.forecastday[0].astro.sunset}</p>
</div>

<div class="card">
<h2>Tomorrow (${inOneDay.date})</h2>
        <p>Weather: ${inOneDay.day.condition.text}</p>
        <img src="${inOneDay.day.condition.icon}" alt="">
        <p>Average temperature: ${inOneDay.day.avgtemp_c}C</p>
        <p>Max wind speed: ${inOneDay.day.maxwind_kph} kph</p>
        <p>Sunrise time: ${inOneDay.astro.sunrise}</p>
        <p>Sunset time: ${inOneDay.astro.sunset}</p>
</div>

<div class="card">
<h2>In two days (${inTwoDays.date})</h2>
        <p>Weather: ${inTwoDays.day.condition.text}</p>
        <img src="${inTwoDays.day.condition.icon}" alt="">
        <p>Average temperature: ${inTwoDays.day.avgtemp_c}C</p>
        <p>Max wind speed: ${inTwoDays.day.maxwind_kph} kph</p>
        <p>Sunrise time: ${inTwoDays.astro.sunrise}</p>
        <p>Sunset time: ${inTwoDays.astro.sunset}</p>
</div> 
</div>
     `
if (state.current.condition.text == 'Sunny' || state.current.condition.text == 'Partly Cloudy') {
    document.body.style.backgroundColor = 'lemonchiffon'
}
else if (state.current.condition.text == 'Patchy rain nearby'|| state.current.condition.text == 'Moderate rain' || state.current.condition.text == 'Light rain') {
    document.body.style.backgroundColor = 'skyblue'
}
else if (state.current.condition.text == 'Overcast' || state.current.condition.text == 'Mist' || state.current.condition.text == 'Fog') {
    document.body.style.backgroundColor = 'lightgrey'
}
else if (state.current.condition.text == 'Moderate or heavy rain shower' || state.current.condition.text == 'Moderate or heavy rain with thunder' || state.current.condition.text == 'Clear' ) {
    document.body.style.backgroundColor = 'midnightblue'
}
else {
    document.body.style.backgroundColor = 'lightgreen'
}
}

button.addEventListener('click', (event)=>{
    event.preventDefault()
    city = cityInput.value
    console.log(city)
    getWeather()
    console.log(state)
})