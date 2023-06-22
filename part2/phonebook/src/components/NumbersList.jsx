import React from 'react'

const NumbersList = ({ persons }) => {
  return (
    <div>
        <h2>Numbers</h2>
        <ul>
            {persons.map( person => 
                <li key={person.id}>{person.name} {person.number}</li>
            )}
        </ul>
    </div>
  )
}

export default NumbersList