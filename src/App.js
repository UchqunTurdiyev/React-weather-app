import React, { useState } from "react";
import './App.css';

const api = {
  key: '4045440fac2260336c4796355917f4c3',
  baseUrl: 'https://api.openweathermap.org/data/2.5/',
}

function App() {

    const [query, setQuery] = useState("");
    const [weather, setWeather] = useState({});

    const search = e => {
        if(e.key === "Enter"){
            fetch(`${api.baseUrl}weather?q=${query}&units=metric&APPID=${api.key}`)
                .then((res) => res.json())
                .then((result) => {
                setWeather(result)
                setQuery("");
                console.log(result);
            })

        }
    }

    function dataBuild (u)
    {
        let months = [
            "Yanvar",
            "Fevral 7-mart",
            "Mart",
            "Aprel",
            "May",
            "Iyun",
            "Iyul",
            "Avgust",
            "Sentabt",
            "Oktabr",
            "Noyabr",
            "Dekabr"
        ];
        let days = [
            "Sunday",
            "Monday",
            "Tuezday",
            "Wendestay",
            "Thursday",
            "Friday",
            "Saturday"
        ];

        let day = days[u.getDay()]
        let date = u.getDate();
        let month = months[u.getMonth()];
        let years = u.getFullYear();

        return `${day} ${date} ${month} ${years}`;
    }
  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? "app " : "app cold") : "app"}>
           <main>
             <div className="search-box">
                 <input
                     type="text"
                     className="search"
                     placeholder="Search..."
                     onChange={e => setQuery(e.target.value)}
                     value={query}
                     onKeyPress={search}
                 />
             </div>
               {typeof weather.main != "undefined" ? (
                   <div className="location-box">
                       <div className="location">{weather.name}, {weather.sys.country}</div>
                       <div className="data">{dataBuild(new Date())}</div>

                       <div className="weather-box">
                           <div className="tem">{Math.round(weather.main.temp)}°c</div>
                           <div className="weather">{weather.weather[0].main}</div>
                       </div>
                   </div>
               ) : (
                   "Error"
               )}

           </main>
    </div>
  );
}

export default App;
