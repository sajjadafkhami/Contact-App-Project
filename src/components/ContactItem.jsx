import React, { useContext } from "react";
import { ContactContext } from "../context/ContactContext";

const ContactItem = ({ contact, onEdit }) => {
  const { state, dispatch } = useContext(ContactContext);
  const isSelected = state.selectedIds.includes(contact.id);

  const handleSelect = () => {
    dispatch({ type: "TOGGLE_SELECT", payload: { id: contact.id } });
  };

  const handleDelete = () => {
    dispatch({
      type: "SET_MODAL",
      payload: {
        message: `آیا از حذف ${contact.firstName} ${contact.lastName} مطمئن هستید؟`,
        onConfirm: () => dispatch({ type: "DELETE_CONTACT", payload: contact.id }),
      },
    });
  };

  return (
    <div className="contact-item">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={handleSelect}
        className="checkbox"
      />
      <div className="contact-info">
        <span>
          {contact.firstName} {contact.lastName} | {contact.email} |{" "}
          {contact.phone} | {contact.job}
        </span>
      </div>
      <div className="contact-actions">
        <button onClick={() => onEdit(contact)}>ویرایش</button>
        <button onClick={handleDelete}>حذف</button>
      </div>
    </div>
  );
};

export default ContactItem;
