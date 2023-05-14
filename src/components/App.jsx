import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import ContactsForm from './ContactsForm/ContactsForm';
import { ContactsList } from './ContactsList/ContactsList';
import { Filter } from './Filter/Filter';
import { Title } from './Title/Title';
import { FilterTitle } from './Title/FilterTitle';
import { ContactsTitle } from './Title/ContactsTitle';

const LOCAL_STORAGE_KEY = 'contacts';

export function App() {
  const [contacts, setContacts] = useState(JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY )) ?? []);
  const [filter, setFilter] = useState('');

  const handleAddContact = contact => {
    if (contacts.some(item => item.name === contact.name)) {
      toast.error('Contact already exists');
      return true;
    }
    setContacts(prevContacts => [...prevContacts, contact]);
    return false;
  };

  const handleDeleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const handleChangeFilter = evt => {
    setFilter(evt.target.value);
  };

  const handleFilterContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase().trim())
    );
  }; 
    
  

  useEffect(() => {
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  });
    
    
    
  // useEffect(() => {
  //   const contacts = localStorage.getItem('contacts');
  //   const parsedContacts = JSON.parse(contacts);
  //   if (parsedContacts) {
  //     setContacts(parsedContacts);
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem('contacts', JSON.stringify(contacts));
  // }, [contacts]);

  return (
    <>
      <div className="container">
        <Title title="Phonebook" />
        <ContactsForm addContact={handleAddContact} />
        <ContactsTitle contactsTitle="Contacts" />
        <FilterTitle filterTitle="Find contacts by name" />
        <Filter value={filter} handleChange={handleChangeFilter} />
        <ContactsList
          contacts={handleFilterContacts()}
          deleteContact={handleDeleteContact}
        />
        <Toaster />
      </div>
    </>
  );
}

export default App;
