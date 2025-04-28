import React, { useContext, useState } from "react";
import { ContactContext } from "../context/ContactContext";
import SearchBar from "./SearchBar";
import ContactForm from "./ContactForm";
import ContactItem from "./ContactItem";
import ConfirmModal from "./ConfirmModal";

const ContactList = () => {
  const { state, dispatch } = useContext(ContactContext);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  const handleAdd = () => { setEditing(null); setShowForm(true); };
  const handleEdit = contact => { setEditing(contact); setShowForm(true); };
  const handleDeleteSelected = () => {
    dispatch({ type: "SET_MODAL", payload: {
      message: "آیا از حذف مخاطبین انتخاب شده مطمئن هستید؟",
      onConfirm: () => dispatch({ type: "DELETE_SELECTED" })
    }});
  };

  const filtered = state.contacts.filter(c => {
    const term = search.toLowerCase();
    return (
      c.firstName.toLowerCase().includes(term) ||
      c.lastName.toLowerCase().includes(term) ||
      c.email.toLowerCase().includes(term) ||
      c.phone.toLowerCase().includes(term) || 
      c.job.toLowerCase().includes(term)       
    );
  });

  return (
    <div>
      <ConfirmModal />
      <button onClick={handleAdd} className="add-contact-btn">افزودن مخاطب</button>
      {state.selectedIds.length > 0 && (
        <button onClick={handleDeleteSelected} className="delete-selected-btn">
          حذف گروهی ({state.selectedIds.length})
        </button>
      )}

      <SearchBar value={search} onChange={setSearch} />
      <hr />

      {showForm && <ContactForm editable={editing} onClose={() => setShowForm(false)} />}

      {filtered.map(contact => (
        <ContactItem key={contact.id} contact={contact} onEdit={handleEdit} />
      ))}
    </div>
  );
};

export default ContactList;