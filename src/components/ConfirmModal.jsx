import React, { useContext } from "react";
import { ContactContext } from "../context/ContactContext";

const ConfirmModal = () => {
  const { state, dispatch } = useContext(ContactContext);
  const modal = state.modal;
  if (!modal) return null;

  const handleConfirm = () => { 
    modal.onConfirm();
    dispatch({ type: "CLEAR_MODAL" });
  };
  const handleCancel = () => dispatch({ type: "CLEAR_MODAL" });

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">
          <p>{modal.message}</p>
          <div className="modal-actions">
            <button onClick={handleConfirm}>تأیید</button>
            <button onClick={handleCancel}>لغو</button>
          </div>
        </div> 
      </div>
    </div>
  );
};

export default ConfirmModal;