import { useState } from "react";
import axios from "axios"

const LiveWeather = ()=>{
    const API_KEY = "31c820642b5ff306728a8ebcdfd46575"
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState("")

    const WEATHER_CODE = {
        "01d": "clear day",
        "01n": "Clear night",
        "02d": "Clouds",
        "09d": "Shower Rain",
        "10d": "rain",
        "13d": "snow",
        "50d": "mist" 

    }

    const getWeather = async ()=>{
        if(!city) return
        try{
            const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
            console.log
                if(res.data.cod == "200"){
                    setWeather(res.data)
                    setError("")
                }
                console.log("RESPONSE: \n", res)
                
        }catch(e){
            setError("City not found!")
            setWeather(null)
        }
    }

    const handleKeyPress = (e)=>{
        if(e.key == 'Enter'){
            getWeather()
        }
    }

    return(
        <>
            <div>
                <h1>Live Weather App</h1>
                <input 
                    type="text" 
                    onChange={(e)=> setCity(e.target.value)} 
                    value={city}
                    onKeyPress={handleKeyPress}
                    placeholder="Enter City" />
                    
                <button onClick={getWeather}>Show Details</button>
            
                {error && <p className="red">{error}</p>}

                {weather && (
                    <div>
                    <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather" />
                        <h2>{weather.name}, {weather.sys.country}</h2>
                        <p>Temperature: {weather.main.temp} C </p>
                        <p>Weather: {weather.weather[0].main}</p>
                        <p>Humidity: {weather.main.humidity} % </p>
                        <p>Wind Speed: {weather.wind.speed} m/s</p>
                    </div>
                )}

            </div>
        </>
    )
}

// https://openweathermap.org/img/wn/{icon_id}@2x.png

export default LiveWeather;
