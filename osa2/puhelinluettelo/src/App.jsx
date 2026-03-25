import { useState } from 'react'
import './index.css'
import AddPersonForm from './components/AddPersonForm'
import PersonsList from './components/PersonsList'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ]) 
    
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const personsToShow = persons.filter(person => person.name.toString().toLowerCase()
                                    .includes(newFilter.toString().toLowerCase()))

  const addPerson = (event) => {
    event.preventDefault()   
    const personObject = {
      name: newName,
      number: newNumber
    }
    const exists = (p) => p.name === newName

    if(persons.some(exists)){
      alert(`${newName} is already added to phonebook`)

    } else {
      setPersons(persons.concat(personObject))
      setNewPerson('')
      setNewNumber('')
    }
  }


  const handleNameChange = (event) => {    
    console.log(event.target.value)    
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {    
    console.log(event.target.value)    
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <AddPersonForm addPerson={addPerson} handleNameChange={handleNameChange} newName={newName}
                     handleNumberChange={handleNumberChange} newNumber={newNumber}
                     />
      <h2>Numbers</h2>
      <PersonsList persons={personsToShow}/>

    </div>
  )

}

export default App
