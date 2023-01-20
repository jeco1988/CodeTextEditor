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

//GET function
export const getDb = async (value) => {
  console.log('Getting data from the jateDB');
  //connect to DB
  const jateDb = await openDB('jate', 1);
  //new transaction
  const tx = jateDb.transaction('jate', 'readwrite');
  //open object store
  const objStore = tx.objectStore('jate');
  //Get all the content in the DB
  const req = objStore.getAll()
  //fetch confirmation
  const res = await req;
  console.log('data saved to the jateDB', res);
};

//PUT function
export const putDb = async (id, value) => {
  console.log('PUT request to update the jateDB');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const objStore = tx.objectStore('jate');
  //use .add() to add content
  const req = objStore.put({ id: id, value: value })
  //data add confirmation
  const res = await req;
  console.log('data saved to the jateDB', res);
};


initdb();