import { useRef } from 'react'
import { useClickAway } from 'react-use'

function Body({ children }) {
  return <div className="p-2">{children}</div>
}

function Action({ children }) {
  return <div className="modal-action">{children}</div>
}

const Modal = ({ isOpen, toggle, children }) => {
  const ref = useRef(null)
  useClickAway(ref, () => {
    if (isOpen) {
      toggle(false)
    }
  })
  return (
    <div className={`modal ${isOpen && 'modal-open'}`}>
      <div className="modal-box" ref={ref}>
        {children}
      </div>
    </div>
  )
}

Modal.Body = Body
Modal.Action = Action

export default Modal
