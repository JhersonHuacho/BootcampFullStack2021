export const PersonForm = ({
  newName, 
  newNumber, 
  handleChangeName, 
  handleChangeNumber, 
  handleSubmit
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name: <input value={newName} onChange={handleChangeName} />
        number: <input value={newNumber} onChange={handleChangeNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

