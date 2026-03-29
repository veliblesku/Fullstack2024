import { useState, useEffect } from 'react'
import axios from 'axios'
import './index.css'
import AddPersonForm from './components/AddPersonForm'
import PersonsList from './components/PersonsList'
import Filter from './components/Filter'
import personService from './services/persons'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [filter, setFilter] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  const clearForm = () => {
    setNewName('')
    setNewNumber('')
  }

/*   const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }
    const exists = (p) => p.name === newName

    if (persons.some(exists)) {
      alert(`${newName} is already added to phonebook`)

    } else {
      personService
        .create({name: newName, number:newNumber})
        .then(response => {
          setPersons(persons.concat(response))
          clearForm()
        })
    }
  } */

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if(persons.findIndex(person => person.name === personObject.name) === -1 ) {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson)) 
        },
        setMessageType("success"),
        setSuccessMessage(`added '${personObject.name}'`),
        setTimeout(()=> {
          setSuccessMessage(null)
        },5000))
      
    } else {

      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const personToUpdate = persons.find(person => person.name === personObject.name)
        const changedPerson = {...personToUpdate, number: newNumber}
        personService
          .update(changedPerson.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== changedPerson.id ? person : returnedPerson))
          },
          setMessageType("success"),
          setSuccessMessage(`updated '${changedPerson.name}'`),
          setTimeout(()=> {
            setSuccessMessage(null)
          },5000))
          .catch(error=>{
            setMessageType("error")
            setSuccessMessage(`User '${newName}' has already been removed`)
            setTimeout(()=> {
              setSuccessMessage(null)
            },5000)
          })
      } 
    }
    setNewName('')
    setNewNumber('')
  }
  const removePerson = (id) => {
    const personToDelete = persons.filter(person => {
      return person.id === id
    })[0]
    //const personToDelete = personToDelete1[0]
    console.log(personToDelete, typeof(personToDelete))
    if(window.confirm("Are you sure you want to delete?")){


      personService
        .remove(id)
        .then(setPersons(persons.filter(person => person.id !== id)),
        setMessageType("success"),
        setSuccessMessage(`deleted '${personToDelete.name}'`),
        setTimeout(()=> {
          setSuccessMessage(null)
        },5000))
        .catch(error=>{
          setMessageType("error")
          setSuccessMessage(`User '${personToDelete.name}' has already been removed`)
          setTimeout(()=> {
            setSuccessMessage(null)
          },5000)
        })
        
    }
      
  }
  /*   const personsToShow = persons.filter((person) => person.name.toString().toLowerCase()
      .includes(newFilter.toString().toLowerCase())) */


  /*   useEffect(() => {
      console.log('effect')
      axios
        .get('http://localhost:3001/persons')
        .then(response => {
          console.log('promise fulfilled')
          setPersons(response.data)
        })
    }, [])
   */
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
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} type={messageType}/>
      <Filter Filter={Filter} handleFilterChange={handleFilterChange} />
      <AddPersonForm addPerson={addPerson} handleNameChange={handleNameChange} newName={newName}
                     handleNumberChange={handleNumberChange} newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <PersonsList persons={personsToShow} filter={filter} removePerson={removePerson}/>

    </div>
  )

}

export default App
