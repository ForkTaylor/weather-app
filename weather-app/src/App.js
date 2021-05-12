import './App.css';
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const api = {
  key: "9cca990df9770fd6669bb4aa7f9ce7c5",
  base: "https://api.openweathermap.org/data/2.5/"
}



function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);

  const getApi = async () => {
    let resp = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api.key}`);
    navigator.geolocation.getCurrentPosition(pos => {
      let posLat = pos.coords.latitude;
      let posLong = pos.coords.longitude;
      setLat(posLat);
      setLong(posLong);
      
    });
  }

  useEffect(() => {
    getApi();
  },[long, lat]);




const search = evt => {
   if (evt.key === 'Enter') {
     fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
         .then(res => res.json())
         .then(result => {
           setWeather(result);
           setQuery('');
           });
   }
  }

const dateBuilder = (d) => {
  let months = ["January","February","March","April","May",
  "June","July","August","September","October","November","December"];
  let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

return `${day} ${date} ${month} ${year}`
}

  return (
    <div className="app">
      <main>
        <div className="search-box">
          <input 
          type="text"
          className="search-bar"
          placeholder="Search..."
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? ( 
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}C
          </div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div> 
  );
}

export default App;
