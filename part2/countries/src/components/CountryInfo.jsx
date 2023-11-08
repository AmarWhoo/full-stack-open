import React from 'react'

const CountryInfo = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <br />
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <br />
      <h3>Languages</h3>
      <ul>
        {country.languages.map(language => 
          <li>{language}</li>
        )}
      </ul>
      <br />
      <img src={country.flags.png} alt={country.flags.alt} />
    </div>
  )
}

export default CountryInfo