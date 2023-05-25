import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database

export const putDb = async (value) => {
  try {
    const jatedb = await openDB('jate', 1);
    const tx = jatedb.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');
    const request= store.add({value});
    const result = await request;
    console.log('Content added to database:', result);
  } catch (error) {
    console.error('Error adding content to database:', error);
  }
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    console.log('GET all from the database');
    const jatedb = await openDB('jate', 1);
    const tx = jatedb.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const result = await store.getAll();
    console.log('result.value', result);
    return result;
  } catch (error) {
    console.error('Error retrieving content from database:', error);
    return [];
  }
};


initdb();
