interface modalProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const Modal = ({ message, onConfirm, onCancel }: modalProps) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{message}</h3>
        <div className="modal-actions">
          <button onClick={onConfirm}>Si</button>
          <button onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  )
}

export default Modal