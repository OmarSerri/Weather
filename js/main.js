let searchBar = document.getElementById('searchBar') 

let today = document.getElementById('today');
let todayDate = document.getElementById('todayDate');
let cityLocation = document.getElementById('location');
let todayIcon = document.getElementById('todayIcon');
let todayCustom = document.getElementById('todayCustom');
let humidity = document.getElementById('humidity');
let wind = document.getElementById('wind');
let compass = document.getElementById('compass');

let nextDay =document.getElementsByClassName('nextDay')
let nextDayIcon =document.getElementsByClassName('nextDayIcon')
let nextDayMaxDegree =document.getElementsByClassName('nextDayMaxDegree')
let nextDayMinDegree =document.getElementsByClassName('nextDayMinDegree')
let nextDayCustom =document.getElementsByClassName('nextDayCustom')




let apiResponse
let responseData

let monthName = ['Jan','Feb','March','April','May','June','July','Aug','Spet','Oct','Nov','Dec']
let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']


async function getWeatherData(currentCity='Cairo')
{
    apiResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=725000593a9840658cd185322232901&q=${currentCity}&days=3`)
    responseData = await apiResponse.json()
    displayTodayWeather()
    displayNextDayWeather()
}
getWeatherData()


function displayTodayWeather()
{
    let date = new Date();
    today.innerHTML= days[date.getDay()];
    todayDate.innerHTML = `${date.getDate()} ${ monthName[date.getMonth()]}`;
    cityLocation.innerHTML =  responseData.location.name;
    todayDegree.innerHTML = responseData.current.temp_c;
    todayIcon.setAttribute( "src",`https:${responseData.current.condition.icon}` )
    todayCustom.innerHTML = responseData.current.condition.text;
    humidity.innerHTML = responseData.current.humidity;
    wind.innerHTML = responseData.current.wind_kph;
    compass.innerHTML =responseData.current.wind_dir;
}

function displayNextDayWeather()
{
    for( let i=0; i<nextDay.length;i++)
    {
        nextDay[i].innerHTML= days[new Date(responseData.forecast.forecastday[i+1].date).getDay()];
        nextDayIcon[i].setAttribute('src',`https:${responseData.forecast.forecastday[i+1].day.condition.icon}`)
        nextDayMaxDegree[i].innerHTML = responseData.forecast.forecastday[i+1].day.maxtemp_c;
        nextDayMinDegree[i].innerHTML = responseData.forecast.forecastday[i+1].day.mintemp_c;
        nextDayCustom[i].innerHTML = responseData.forecast.forecastday[i+1].day.condition.text;
    }
}

searchBar.addEventListener("keyup",function()
{
    currentCity= searchBar.value;
    console.log( currentCity);
    getWeatherData(currentCity);
})

