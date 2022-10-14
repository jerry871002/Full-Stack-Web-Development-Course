const Persons = ({ persons, deleteHandler }) => 
  persons.map(person => <p key={person.id}>{person.name} {person.number} <button onClick={deleteHandler(person.id)}>delete</button></p>)

export default Persons
