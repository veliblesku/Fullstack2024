import React from 'react'


const Filter = (props) => {
    const {newFilter, handleFilterChange} = props

    const personsToShow = persons.filter(person => person.name.toString().toLowerCase()
                                      .includes(newFilter.toString().toLowerCase()))
    return (
        <div>
            filter shown with: <input value={newFilter}
                                onChange={handleFilterChange}/>
        </div>
    )
}

export default Filter