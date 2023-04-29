import React, { useState } from "react";
import axios from "axios";

const Search = () => {
  const [city, setCity] = useState("");
  const [Temp, setTemp] = useState(0);
  const [desc, setDesc] = useState("");
  const [wind, setWind] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [icon, setIcon] = useState("");
  const [messageClass, setMessageClass] = useState("hidden");

  const ApiKey = "bd6d9ef56abf406c77a639e236aa17ea";
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}&units=metric`;
  const iconURL = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.get(URL).then((response) => {
      setTemp(Math.floor(response.data.main.temp));
      setDesc(response.data.weather[0].description);
      setWind(response.data.wind.speed);
      setHumidity(response.data.main.humidity);
      setIcon(response.data.weather[0].icon);
    });

    setMessageClass("show");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          onChange={handleChange}
          placeholder="Enter a city..."
        />
        <button type="submit" title="Search city climate">
          Search
        </button>
      </form>

      <div id="message" className={messageClass}>
        <span className="cityName">{city}</span>
        <p>Temperature: {Temp}°C</p>
        <p>Description: {desc}</p>
        <p>Wind Speed: {wind} km/h</p>
        <p>Humidity: {humidity}%</p>
        <span>
          <img src={iconURL} alt={desc} />
        </span>
      </div>
    </>
  );
};

export default Search;
