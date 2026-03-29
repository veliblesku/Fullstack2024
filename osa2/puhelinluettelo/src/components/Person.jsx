import React from 'react'


const Person = (props) => {
    const {person, removePerson} = props

    return (
        <div>
            {person.name} {person.number}
            <button onClick={()=>removePerson(person.id)}>delete</button>
        </div>
    )

}

export default Person