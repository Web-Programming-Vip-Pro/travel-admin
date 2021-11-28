const SelectLimit = ({ setLimit }) => {
  return (
    <div className="flex items-center space-x-2">
      <p>Show</p>
      <select className="select" onChange={(e) => setLimit(e.target.value)}>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
      <p>values</p>
    </div>
  )
}

export default SelectLimit
