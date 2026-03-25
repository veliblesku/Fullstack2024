import React from 'react'
import Person from './Person'

const PersonsList = (props) => {
    const {persons, newFilter} = props


    
    return (
        <li>
            {persons.map(person =>
            <p key={person.name}> {person.name} {person.number}</p>
        )}
    
        </li>
    )
}

export default PersonsList