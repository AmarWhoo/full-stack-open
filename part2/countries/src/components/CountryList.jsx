import React from 'react'

const CountryList = ({ countries }) => {
  return (
    <ul>
        {countries.map(countryName => 
          <li key={countryName}>
            {countryName}
          </li>
        )}
      </ul>
  )
}

export default CountryList