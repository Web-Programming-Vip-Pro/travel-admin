function Head({ children }) {
  return (
    <thead>
      <tr>
        {children}
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
  )
}

function Body({ children }) {
  return <tbody>{children}</tbody>
}

function EditButton({ onClick }) {
  return (
    <button className="btn btn-info btn-sm" onClick={onClick}>
      Edit
    </button>
  )
}

function DeleteButton({ onClick }) {
  return (
    <button className="btn btn-error btn-sm" onClick={onClick}>
      Delete
    </button>
  )
}

const Table = ({ children }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">{children}</table>
    </div>
  )
}

Table.Head = Head
Table.Body = Body
Table.EditButton = EditButton
Table.DeleteButton = DeleteButton

export default Table
