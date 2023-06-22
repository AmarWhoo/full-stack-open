import { useState } from 'react'
import NumbersList from './components/NumbersList'
import Search from './components/Search'
import AddContact from './components/AddContact'

const App = () => {
  const [persons, setPersons] = useState([ // Values for testing
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  // States
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')

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