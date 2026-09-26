const searchButton=document.getElementById("searchBtn")
const cityInput=document.getElementById("cityInput")
const description=document.getElementById("description")
const temperature=document.getElementById("temperature")
const day=document.getElementById("day")
const time=document.getElementById("time")
const cityName=document.getElementById("cityName")
const weatherImg=document.getElementById("weatherImg")
   function getWeatherDescription(code){
        if (code ===0){
            return"Clear sky";
            
        }
        if (code ===1 || code===2){
            return"Partly cloudy"
        }
        if (code ===3){
            return"Overcast"
        }
        if (code >= 51 && code <=67 ){
            return"Rain"
        }
        if (code >=71 && code <= 77){
            return"Snow"
        }
        if (code >=80 && code <=82){
            return"Rain showers";
        }
        if (code >=95){
            return"Thunderstorm"
        }
        return "unknown";
    }
function updateTime(){
    const now=new Date();
    time.textContent=now.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit"
    });
    const date=new Date()
    day.textContent=date.toLocaleDateString("en-Us",{
        weekday: "long"
    })+","

}

searchButton.onclick=function(){
    const city=cityInput.value
    updateTime()
    setInterval(updateTime, 1000);
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`)
    .then(response=>response.json())
    .then(data=>{
        const latitude=data.results[0].latitude
        const longitude=data.results[0].longitude
        const locationName=data.results[0].name
        cityName.textContent=locationName
        cityName.classList.add("showBackground")

       fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`)
       .then(response=>response.json())
       .then(weatherData=>{
        const temperatureValue=weatherData.current.temperature_2m;
        temperature.textContent=`${temperatureValue}°C`;
        temperature.classList.add("border")
        const weatherCode=weatherData.current.weather_code;
      
        if (weatherCode===0){
            weatherImg.src="images/sun(1).png"
            
        }
        if (weatherCode===1 || weatherCode===2){
            weatherImg.src="images/overcast.png"
        }
        if (weatherCode===3){
            weatherImg.src="images/overcast.png"
        }
        if (weatherCode>= 51 && weatherCode <=67 ){
            weatherImg.src="images/heavy-rain.png"
        }
        if (weatherCode>=71 && weatherCode<= 77){
            weatherImg.src="images/snow.png"
        }
        if (weatherCode>=80 && weatherCode<=82){
            weatherImg.src="images/heavy-rain.png"
        }
        if (weatherCode>=95){
            weatherImg.src="images/storm.png"
        }
        
       
        const weatherDescription=getWeatherDescription(weatherCode)
        description.textContent=weatherDescription;
        console.log(weatherDescription)
    }) 
    })
    cityInput.value=""
}      