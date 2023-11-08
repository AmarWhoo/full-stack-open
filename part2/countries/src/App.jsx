import { useEffect, useState } from 'react'
import countryService from './services/CountryService'
import CountryList from './components/CountryList'
import CountryInfo from './components/CountryInfo'

const App = () => {

  const [countryNames, setCountryNames] = useState(null)
  const [searchValue, setSearchValue] = useState('')
  const [singleCountry, setSingleCountry] = useState([])

  useEffect(() => {
    countryService
      .getNames()
      .then(countries => {
        setCountryNames(countries.map(country => country.name.common))
      })
  }, [])

  if (!countryNames) return null

  const handleSearch = (event) => setSearchValue(event.target.value.toLowerCase())

  const filteredCountries = countryNames.filter(countryName => countryName.toLowerCase().includes(searchValue))

  if (filteredCountries.length === 1) {
    countryService
      .getCountryInfo(filteredCountries[0])
      .then(response => setSingleCountry(response))
  }

  return (
    <div>
      <form>
        Find country info: <input onChange={handleSearch}/>
      </form>

      {searchValue.length === 0 ? null : (
        filteredCountries.length > 10 ? (
          <p>Too many matches, please specify another filter</p>
        ) : filteredCountries.length === 1 ? (
          <p>{singleCountry}</p>
        ) : (
          <CountryList countries={filteredCountries} />
        )
      )}

    </div>
  )
}

export default App
