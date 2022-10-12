const Filter = ({nameFilter, handleFilterChange}) =>
  <div>
    filter shown with
    <input
      value={nameFilter}
      onChange={handleFilterChange}
    />
  </div>

export default Filter
