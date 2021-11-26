import { shorten } from '@/utils'

function Head({ children, disableEdit, disableDelete }) {
  return (
    <thead>
      <tr>
        {children}
        {!disableEdit && <th>Edit</th>}
        {!disableDelete && <th>Delete</th>}
      </tr>
    </thead>
  )
}

function Body({ children }) {
  return <tbody>{children}</tbody>
}

function Row({ children }) {
  if (typeof children !== 'string') return <td>{children}</td>
  return <td>{children.length > 20 ? shorten(children) : children}</td>
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
Table.Row = Row
Table.EditButton = EditButton
Table.DeleteButton = DeleteButton

export default Table
