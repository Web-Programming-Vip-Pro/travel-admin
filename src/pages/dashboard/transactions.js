import PaginationButton from '@/components/Shared/Pagination'
import Table from '@/components/Shared/Table'
import Admin from '@/layouts/Admin'
import {
  useTransactions,
  mutateTransactions,
  getTransactionStatus,
  updateTransaction,
} from '@/services/transaction'
import { useEffect, useState } from 'react'
import { useToggle } from 'react-use'
import Modal from '@/components/Shared/Modal'
import { useForm } from 'react-hook-form'

function TransactionModal({ isOpen, toggle, transaction }) {
  const { register, handleSubmit } = useForm({
    defaultValues: transaction,
  })
  const [isLoading, setIsLoading] = useState(false)
  async function onSubmit(data) {
    setIsLoading(true)
    const id = transaction.id
    const { status_place, message } = data
    const response = await updateTransaction(id, status_place, message)
    if (response.success) {
      alert('Transaction updated successfully')
    } else {
      alert('Error updating transaction')
    }
    setIsLoading(false)
  }
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <h1 className="text-2xl font-bold">Transaction</h1>
      <Modal.Body>
        {/* Form select with transaction status_place */}
        <div className="flex flex-col">
          <div>Transaction ID: {transaction.id}</div>
          <div>Place: {transaction.place_title}</div>
          <div>Value: {transaction.value}</div>
          <div>Agency: {transaction.agency_name}</div>
          <div>User: {transaction.user_name}</div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col form-group">
            <label className="label">
              <span className="label-text">Status</span>
            </label>
            <select
              className="select select-bordered select-primary"
              {...register('status_place', { required: true })}
              required
            >
              <option value={0}>Waiting for confirmation</option>
              <option value={1}>Booking</option>
              <option value={2}>Cancelled</option>
              <option value={2}>Finished</option>
            </select>
          </div>
          <div className="flex flex-col form-group">
            <label className="label">
              <span className="label-text">Comment</span>
            </label>
            <textarea
              className="textarea textarea-primary"
              {...register('message')}
            />
          </div>
        </div>
      </Modal.Body>
      <Modal.Action>
        <button
          className="btn btn-info"
          onClick={handleSubmit(onSubmit)}
          disabled={isLoading}
        >
          Save
        </button>
      </Modal.Action>
    </Modal>
  )
}

const Transactions = () => {
  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(10)
  const { transactions, totalPages, isLoading, error } = useTransactions(
    page,
    limit
  )
  const [isOpen, toggle] = useToggle(false)
  const [transaction, setTransaction] = useState({})

  useEffect(() => {
    if (!isOpen) {
      setTransaction({})
    }
    mutateTransactions(page, limit)
  }, [isOpen])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error!</div>
  return (
    <>
      <h1 className="text-2xl font-bold">Transaction</h1>
      {isOpen && (
        <TransactionModal
          isOpen={isOpen}
          toggle={toggle}
          transaction={transaction}
        />
      )}
      <Table>
        <Table.Head disableDelete>
          <th>ID</th>
          <th>Place</th>
          <th>Value</th>
          <th>Status</th>
          <th>Agency</th>
          <th>User</th>
        </Table.Head>
        <Table.Body>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.id}</td>
              <td>{transaction.place_title}</td>
              <td>{transaction.value}</td>
              <td>{getTransactionStatus(transaction.status_place)}</td>
              <td>{transaction.agency_name}</td>
              <td>{transaction.user_name}</td>
              <td>
                <Table.EditButton
                  onClick={() => {
                    setTransaction(transaction)
                    toggle()
                  }}
                />
              </td>
            </tr>
          ))}
        </Table.Body>
      </Table>
      <div>
        <PaginationButton
          currentPage={page}
          totalPages={totalPages}
          setPage={setPage}
        />
      </div>
    </>
  )
}

Transactions.layout = Admin

export default Transactions
