import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;

function App() {

  const [countries, setCountries] = useState([]);
  const [searchCountry, setSearchCountry] = useState('');
  const [country, setCountry] = useState({});
  const [weather, setWeather] = useState({})

  const handleSearchCountry = (event) => {
    setSearchCountry(event.target.value);
    setCountry({});
    setWeather({});
  }

  const handleClickShow = (name) => {
    axios
      .get(`https://restcountries.com/v3.1/name/${name.toLocaleLowerCase()}`)
      .then(response => {
        const {data} = response;
        console.log(`data`, data)
        console.log(`data[0].flags[0]`, data[0].flags[0])
        setCountry({
          name: data[0].name.common,
          capital: data[0].capital.join(" / "),
          population: data[0].population,
          languages: data[0].languages,
          flag: data[0].flags.png
        })

      });
    
    axios
      .get(`http://api.weatherstack.com/current?access_key=${API_KEY}&query=${name}`)
      .then(response => {
        const { temperature, weather_icons, wind_speed, wind_dir } = response.data.current;
        setWeather({
          temperature,
          weather_icon: weather_icons[0],
          wind_speed,
          wind_dir
        });
      });
  }

  useEffect(() => {
    console.log('useEffect');
    // https://restcountries.com/v3.1/all
    // https://restcountries.com/v3.1/name/peru
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => setCountries(response.data));
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  const filterCountries = () => {
    const filter = countries.filter(
      (country) => {
        const name = country.name.common.toLocaleLowerCase();
        return name.includes(searchCountry.toLocaleLowerCase())
      }
    )
    if (filter.length >= 10) {
      return {
        status: false,
        values: filter
      }
    }
    return {
      status: true,
      values: filter
    }
  }

  console.log('render..');

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          Find countries: <input value={searchCountry} onChange={handleSearchCountry}  />
        </form>
      </div>
      <div>
        {
          searchCountry.length === 0
          ? <p></p>
          : filterCountries().status
            ? filterCountries().values.map(countryFilter => {
              return (
                Object.entries(country).length === 0
                ? <div key={countryFilter.cca2}>
                    <span>{countryFilter.name.common} </span>
                    <button onClick={() => handleClickShow(countryFilter.name.common)}>show</button>
                  </div>
                : ''
              )
            })
            : <p>Too many matches, specify another filter</p>
        }
      </div>
      <div>
        {
          Object.entries(country).length !== 0
          ? <div>
              <h2>{country.name}</h2>
              <p>Capital: {country.capital}</p>
              <p>Population: {country.population}</p>
              <h3>Languages</h3>
              <ul>
                { 
                  Object.entries(country.languages).map(([key, value]) => {
                    return <li key={key}>{value}</li>;
                  })
                }
              </ul>
              <img src={country.flag} alt="flag" />
          </div>
          : ''
        }
        
      </div>
      {
        Object.entries(weather).length === 0
        ? null
        : (
          <div>
            <h3>Weather in Helsinki</h3>
            <p>Temperature: {weather.temperature}</p>
            <img src={weather.weather_icon} alt="icon" />
            <p>Wind: {weather.wind_speed} mph direction {weather.wind_dir}</p>
          </div>
        )
      }
    </div>
  );
}

export default App;
