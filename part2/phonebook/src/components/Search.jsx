import React from 'react'

const Search = ({ handleFilter }) => {
  return (
    <div>
        <h2>Search Phonebook</h2>
        <form>
            <div>
                Search: <input onChange={handleFilter}/>
            </div>
        </form>
    </div>
  )
}

export default Search