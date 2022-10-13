import { useState, useEffect } from 'react'
import axios from 'axios'

const Countries = ({ countries }) => {
  if (countries.length === 0) {
    return <div>No match</div>
  } else if (countries.length >= 10) {
    return <div>Too many matches, specify another filter</div>
  } else if (countries.length === 1) {
    const country = countries[0]
    return (
      <div>
        <h2>{country.name} {country.flag}</h2>
        <span>Capital: {country.capital}</span><br/>
        <span>Area: {country.area}</span>
        <h3>Languages:</h3>
        <ul>
          {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
        </ul>
      </div>
    )
  } else {
    return (
      <ul>
        {countries.map(country => <li key={country.name}>{country.name}</li>)}
      </ul>
    )
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
      <Countries countries={(function() {
        if (countryFilter !== '') return countriesToShow
        return []
      })()} />
    </div>
  )
}

export default App;
