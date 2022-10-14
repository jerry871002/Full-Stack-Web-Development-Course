import { useState, useEffect } from 'react'
import axios from 'axios'

const SingleCountry = ({ country }) => {
  const [ weatherData, setWeatherData ] = useState({})

  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo[0]}&lon=${country.capitalInfo[1]}&units=metric&appid=${api_key}`)
      .then(response => {
        console.log('axios get weather response:', response)
        setWeatherData(response.data)
      })
  }, [])

  return (
    <div>
      <h2>{country.name} {country.flag}</h2>
      <span>Capital: {country.capital}</span><br/>
      <span>Area: {country.area}</span>
      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
      </ul>
      <h2>Weather in {country.capital}</h2>
      <span>Temperature: {(function() {
        if (Object.keys(weatherData).length !== 0) 
          return weatherData.main.temp
        })()
      } Celcius</span><br/>
      <span>Wind: {(function() {
        if (Object.keys(weatherData).length !== 0) 
          return weatherData.wind.speed
        })()
      } m/s</span>
    </div>
  )
}

const Countries = ({ countries, setCountryFilter }) => {
  const showCountry = name => {
    return function(e) {
      e.preventDefault()
      setCountryFilter(name)
    }
  }

  return (
    <ul>
      {countries.map(country => 
        <li key={country.name}>{country.name} <button onClick={showCountry(country.name)}>show</button></li>
      )}
    </ul>
  )
}

function showCountries(countriesToShow, countryFilter, setCountryFilter) {
  if (countriesToShow.length === 0 || countryFilter === '') {
    return <div>No match</div>
  } else if (countriesToShow.length >= 10) {
    return <div>Too many matches, specify another filter</div>
  } else if (countriesToShow.length === 1) {
    return <SingleCountry country={countriesToShow[0]} />
  } else {
    return <Countries countries={countriesToShow} setCountryFilter={setCountryFilter} />
  }
}

function App() {
  const [ countries, setCountries ] = useState([])
  const [ countryFilter, setCountryFilter] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then(response => {
      console.log('axios get response:', response)
      setCountries(response.data.map(country => (
          {
            name: country.name.common,
            area: country.area,
            capital: country.capital,
            capitalInfo: country.capitalInfo.latlng,
            languages: country.languages,
            flag: country.flag
          }
        )
      ))
    })
  }, [])

  const handleFilterChange = (event) => setCountryFilter(event.target.value)

  const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(countryFilter.toLowerCase()))

  return (
    <div>
      find countries
      <input
        value={countryFilter}
        onChange={handleFilterChange}
      />
      {showCountries(countriesToShow, countryFilter, setCountryFilter)}
    </div>
  )
}

export default App;
