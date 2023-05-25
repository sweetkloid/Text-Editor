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

export const putDb = (id, content) => {
  return new Promise((resolve, reject) => {
    const request = openDB('jate', 1)
      .then(jatedb => {
        const tx = jatedb.transaction('jate', 'readwrite');
        const store = tx.objectStore('jate');
        const addRequest = store.add({ id, content });
        addRequest.onsuccess = () => {
          tx.complete.then(() => {
            console.log('Content added to database');
            resolve();
          });
        };
        addRequest.onerror = (error) => {
          console.error('Error adding content to database:', error);
          reject(error);
        };
      })
      .catch(error => {
        console.error('Error opening database:', error);
        reject(error);
      });
  });
};


// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    console.log('GET all from the database');
    const jatedb = await openDB('jate', 1);
    const tx = jatedb.transaction('jate', 'readonly');
    const store = tx.objectStore('jate');
    const result = await store.getAll();
    console.log('Content retrieved from database:', result);
    return result;
  } catch (error) {
    console.error('Error retrieving content from database:', error);
    return [];
  }
};


initdb();
