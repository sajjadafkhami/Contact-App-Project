import React, { createContext, useReducer } from "react";

export const ContactContext = createContext();

const initialState = { 
  contacts: [],
  selectedIds: [],
  modal: null
};

function reducer(state, action) {
  switch (action.type) {
    case "ADD_CONTACT":
      return { 
        ...state, 
        contacts: [...state.contacts, action.payload] 
      };
    case "UPDATE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.map(c => 
          c.id === action.payload.id ? action.payload : c
        )
      };
    case "DELETE_CONTACT":
      return { 
        ...state, 
        contacts: state.contacts.filter(c => c.id !== action.payload) 
      };
    case "TOGGLE_SELECT": {
      const id = action.payload.id;
      const selected = state.selectedIds.includes(id);
      return {
        ...state,
        selectedIds: selected
          ? state.selectedIds.filter(i => i !== id)
          : [...state.selectedIds, id]
      };
    }
    case "DELETE_SELECTED":
      return {
        ...state,
        contacts: state.contacts.filter(c => !state.selectedIds.includes(c.id)),
        selectedIds: []
      };
    case "SET_MODAL":
      return { 
        ...state, 
        modal: action.payload 
      };
    case "CLEAR_MODAL":
      return { 
        ...state, 
        modal: null 
      };
    default:
      return state;
  }
}

export const ContactProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ContactContext.Provider value={{ state, dispatch }}>
      {children}
    </ContactContext.Provider>
  );
};