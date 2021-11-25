import Input from '@/components/Shared/Input'

const TableHeader = ({ toggleModal, setLimit, setSearchText }) => {
  return (
    <div className="flex justify-between">
      <button className="btn btn-success" onClick={toggleModal}>
        Add
      </button>
      <div className="flex space-x-2">
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
        <Input
          className="input input-primary input-bordered"
          type="text"
          placeholder="Search"
          debounce={500}
          onValueChange={setSearchText}
        />
      </div>
    </div>
  )
}

export default TableHeader
