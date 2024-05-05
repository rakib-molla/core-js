const condition = document.getElementById('condition')
const city = document.getElementById('city')
const country = document.getElementById('country')
const mainText = document.getElementById('main')
const description = document.getElementById('description')
const temp = document.getElementById('temp')
const pressure = document.getElementById('pressure')
const humidity = document.getElementById('humidity')

const cityInput = document.getElementById('city-input')
const historyElm = document.getElementById('history')
const masterHistory = document.getElementById('master-history')

const API_KEY = '440e71eff1fd12d735c421c08dd188e2'
const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}`
const ICON_URL = `https://openweathermap.org/img/wn/`
const DEFAULT_CITY = 'dhaka'

window.onload = function(){
    navigator.geolocation.getCurrentPosition(success =>{
        getWeatherData(null, success.coords)
        
    }, error=>{
        // console.log(error);
        getWeatherData()
    })

    axios.get('/api/history')
        .then(({data})=>{
            if(data?.data?.length > 0){
                updateHistory(data?.data)
            }else{
                console.log('data nai');
                historyElm.innerHTML = 'No History Found'
            }
        })
        .catch(err=>{
            // console.log(err)
        })

    cityInput.addEventListener('keypress', function(e){
        if(e.key === 'Enter'){
            if(e.target.value){
                console.log(e.target.value);
                getWeatherData(e.target.value, null, weather=>{
                    e.target.value = '';
                    axios.post('/api/history', weather)
                        .then(({data})=>{
                           
                            updateHistory(data)
                        })
                        .catch(e=>{
                            console.log(e);
                            alert("Error Occurred")
                        })
                });
               
            }else{
                alert('Please Provide Valid City Name')
            }
        }
    })
}

function getWeatherData(city=DEFAULT_CITY, coords , cb){
    let url = BASE_URL;

    city === null ?
        url = `${url}&lat=${coords.latitude}&lon=${coords.longitude}` 
        :
        url = `${url}&q=${city}`
    
    axios.get(url)
        .then(({data})=>{
            // console.log(data);
            let weather = {
                icon: data.weather[0].icon,
                name: data.name,
                city: data.name,
                country: data.sys.country,
                main: data.weather[0].main,
                description: data.weather[0].description,
                temp: data.main.temp,
                pressure: data.main.pressure,
                humidity: data.main.humidity
            }
            setWeather(weather);
            if(cb){
                cb(weather);
            }
        })
        .catch(e=>{
            console.log(e);
        })
}

function setWeather(weather){
    condition.src = `${ICON_URL}${weather.icon}.png`;
    city.innerHTML = weather.city;
    country.innerHTML = weather.country;
    mainText.innerHTML = weather.main;
    description.innerHTML = weather.description;
    temp.innerHTML = weather.temp;
    pressure.innerHTML = weather.pressure;
    humidity.innerHTML = weather.humidity;
}

function updateHistory(history){
  
    historyElm.innerHTML = '';
    history = history.reverse();

    history.forEach(h =>{

        let tempHistory = masterHistory.cloneNode(true);
        tempHistory.id = '';
        tempHistory.getElementsByClassName('condition')[0].src = `${ICON_URL}${h.icon}.png`;
        tempHistory.getElementsByClassName('city')[0].innerHTML = h.name;
        tempHistory.getElementsByClassName('country')[0].innerHTML = h.country;
        tempHistory.getElementsByClassName('main')[0].innerHTML = h.main;
        tempHistory.getElementsByClassName('description')[0].innerHTML = h.description;
        tempHistory.getElementsByClassName('temp')[0].innerHTML = h.temp;
        tempHistory.getElementsByClassName('pressure')[0].innerHTML = h.pressure;
        tempHistory.getElementsByClassName('humidity')[0].innerHTML = h.humidity;

        historyElm.appendChild(tempHistory);
    })

    
}