const Filter = ({search, handleChangeSearch}) => {
  return (
    <div>
      filter shown with: <input value={search} onChange={handleChangeSearch} />
    </div>
  )
}

export {
  Filter
};