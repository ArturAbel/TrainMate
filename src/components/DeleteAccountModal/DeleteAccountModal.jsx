import { IoClose } from "react-icons/io5";

import "./DeleteAccountModal.css";

const DeleteAccountModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="delete-account-modal-overlay">
      <div className="delete-account-modal-content">
        <button className="delete-account-modal-close-button" onClick={onClose}>
          <IoClose />
        </button>
        {children}
      </div>
    </div>
  );
};

export default DeleteAccountModal;
