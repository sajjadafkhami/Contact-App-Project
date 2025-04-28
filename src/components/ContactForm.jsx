import React, { useState, useEffect, useContext } from "react";
import { ContactContext } from "../context/ContactContext";

const initialForm = { firstName: "", lastName: "", email: "", phone: "", job: "" };

const ContactForm = ({ editable, onClose }) => {
  const { dispatch} = useContext(ContactContext);

  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editable) setFormData(editable);
    else setFormData(initialForm);
  }, [editable]);

  const validate = () => {
    const errs = {};
    if (!formData.firstName.trim()) errs.firstName = "نام الزامی است";
    if (!formData.lastName.trim()) errs.lastName = "نام خانوادگی الزامی است";
    if (!formData.email.trim()) errs.email = "ایمیل الزامی است";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = "ایمیل نامعتبر است";
    if (!formData.phone.trim()) errs.phone = "تلفن همراه الزامی است";
    else if (!/^\d{11}$/.test(formData.phone)) errs.phone = "شماره تلفن همراه نامعتبر است";
    if (!formData.job.trim()) errs.job = "شغل الزامی است";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
  
    const action = editable ? "UPDATE_CONTACT" : "ADD_CONTACT";
    const message = editable
      ? `آیا از ویرایش ${formData.firstName} ${formData.lastName} مطمئن هستید؟`
      : `آیا از افزودن ${formData.firstName} ${formData.lastName} مطمئن هستید؟`;
  
    dispatch({
      type: "SET_MODAL",
      payload: {
        message,
        onConfirm: () => {
          dispatch({
            type: action,
            payload: {
              ...formData,
              id: editable?.id || Date.now(),
            },
          });
          dispatch({ type: "CLEAR_MODAL" }); // برای اطمینان از بسته شدن مدال
          onClose();
        },
      },
    });
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <div className="contact-form">
        <input
          name="firstName"
          placeholder="نام"
          value={formData.firstName}
          onChange={e => setFormData({ ...formData, firstName: e.target.value })}
          aria-invalid={!!errors.firstName}
        />
        {errors.firstName && <div className="error">{errors.firstName}</div>}
      </div>

      <div className="contact-form">
        <input
          name="lastName"
          placeholder="نام خانوادگی"
          value={formData.lastName}
          onChange={e => setFormData({ ...formData, lastName: e.target.value })}
          aria-invalid={!!errors.lastName}
        />
        {errors.lastName && <div className="error">{errors.lastName}</div>}
      </div>

      <div className="contact-form">
        <input
          name="email"
          placeholder="ایمیل"
          value={formData.email}
          onChange={e => setFormData({ ...formData, email: e.target.value })}
          aria-invalid={!!errors.email}
        />
        {errors.email && <div className="error">{errors.email}</div>}
      </div>

      <div className="contact-form">
        <input
          name="phone"
          placeholder="تلفن همراه"
          value={formData.phone}
          onChange={e => setFormData({ ...formData, phone: e.target.value })}
          aria-invalid={!!errors.phone}
        />
        {errors.phone && <div className="error">{errors.phone}</div>}
      </div>

      <div className="contact-form">
        <input
          name="job"
          placeholder="شغل"
          value={formData.job}
          onChange={e => setFormData({ ...formData, job: e.target.value })}
          aria-invalid={!!errors.job}
        />
        {errors.job && <div className="error">{errors.job}</div>}
      </div>

      <div className="contact-form">
        <button type="button" onClick={onClose}>لغو</button>
        <button type="submit">
          {editable ? "ویرایش" : "افزودن"}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;