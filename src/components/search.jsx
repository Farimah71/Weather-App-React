import React, { useState } from "react";
import axios from "axios";
import Spinner from "./spinner";
import NotFound from "./notFound";

const Search = () => {
  const [cityQuery, setCityQuery] = useState("");
  const [weather, setWeather] = useState({});
  const [messageClass, setMessageClass] = useState("hidden");
  const [loading, setLoading] = useState(false);
  const [responseOk, setResponseOk] = useState(true);

  const ApiKey = "bd6d9ef56abf406c77a639e236aa17ea";
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityQuery}&appid=${ApiKey}&units=metric`;
  const iconURL = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;

  const handleChange = (event) => {
    setCityQuery(event.target.value);
    setLoading(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get(URL)
      .then((response) => {
        setWeather({
          cityName: response.data.name,
          temp: Math.floor(response.data.main.temp),
          desc: response.data.weather[0].description,
          wind: response.data.wind.speed,
          humidity: response.data.main.humidity,
          icon: response.data.weather[0].icon,
        });
        setResponseOk(true);
      })
      .catch(() => {
        setMessageClass("hidden");
        setResponseOk(false);
      })
      .finally(() => {
        setLoading(false);
      });

    setMessageClass("show");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          value={cityQuery}
          onChange={handleChange}
          placeholder="Enter a city..."
        />
        <button type="submit" title="Search city climate">
          Search
        </button>
        {loading && <Spinner />}
      </form>

      {responseOk ? (
        <div id="message" className={messageClass}>
          <span className="cityName">{weather.cityName}</span>
          <p>Temperature: {weather.temp}°C</p>
          <p>Description: {weather.desc}</p>
          <p>Wind Speed: {weather.wind} km/h</p>
          <p>Humidity: {weather.humidity}%</p>
          <span>
            <img src={iconURL} alt={weather.desc} />
          </span>
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default Search;
