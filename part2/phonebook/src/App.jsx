import { useState, useEffect } from 'react'
import axios from 'axios'
import NumbersList from './components/NumbersList'
import Search from './components/Search'
import AddContact from './components/AddContact'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')

  // Get request for fetching person info from the server
  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }

  // Effect hook
  useEffect(hook, [])

  // Info typing handlers
  const handleName = (event) => setNewName(event.target.value)
  const handleNumber = (event) => setNewNumber(event.target.value)
  const handleFilter = (event) => setFilterValue(event.target.value.toLowerCase())
  
  
  // Submit person to phonebook handler
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    const hasDuplicate = persons.some( person => person.name === personObject.name )

    if (hasDuplicate) {
      alert(`${personObject.name} is already added to the phonebook.`)
      setNewName('')
      setNewNumber('')
      return
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  // Value for the filtered persons
  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(filterValue)
  )

  return (
    <div>
      <Search handleFilter={handleFilter} />
      <AddContact newName={newName} newNumber={newNumber} handleName={handleName} handleNumber={handleNumber} addPerson={addPerson} />
      <NumbersList persons={filteredPersons}/>
    </div>
  )
}

export default App