import { useState } from 'react';
// import  { Component } from 'react';
import { nanoid } from 'nanoid';
import css from '../ContactsForm/ContactsForm.module.css';
import propTypes from 'prop-types';

export function ContactsForm({ addContact }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = evt => {
    evt.preventDefault();
    const isContactExists = addContact({
      id: nanoid(7),
      name: name,
      number: number,
    });
    if (!isContactExists) {
      reset();
    }
  };

  const handleChange = evt => {
    const { name, value } = evt.target;
    name === 'name' ? setName(value) : setNumber(value);
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <label className={css.label}>
        Name
        <input
          onChange={handleChange}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
          className={css.input}
        />
      </label>
      <label className={css.label}>
        Number
        <input
          onChange={handleChange}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          className={css.input}
        />
      </label>
      <button type="submit" className={css.button}>
        Add Contact
      </button>
    </form>
  );
}

ContactsForm.propTypes = {
  name: propTypes.string,
  number: propTypes.string,
};

export default ContactsForm;
