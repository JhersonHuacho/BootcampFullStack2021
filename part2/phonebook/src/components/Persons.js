import React from 'react';


export const Persons = ({persons, search, handleClickDelete}) => {
  return (
    <div>
      {
        persons
          .filter(
            person => person.name.toLocaleLowerCase().includes(search.toLowerCase())
          )
          .map(
            person => {
              return (
                <div key={person.id}>
                  <span>{person.name} - {person.number} </span>
                  <button onClick={() => handleClickDelete(person.id, person.name)}>delete</button>
                </div>
              );
            }
          )
      }
    </div>
  )
}
