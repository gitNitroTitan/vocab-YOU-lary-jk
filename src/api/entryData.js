import axios from 'axios';
import firebaseConfig from './apiKeys';

const dbUrl = firebaseConfig.databaseURL;

const getEntry = () => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/vocabulary.json`)
    .then((response) => {
      if (response.data) {
        resolve(Object.values(response.data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => reject(error));
});

// CREATE ENTRY
const createEntry = (uid, vocabObj) => new Promise((resolve, reject) => {
  axios.post(`${dbUrl}/vocabulary.json`, vocabObj)
    .then((response) => {
      const payload = { firebaseKey: response.data.name };
      axios.patch(`${dbUrl}/vocabulary/${response.data.name}.json`, payload)
        .then(() => {
          getEntry(uid).then(resolve);
        });
    }).catch(reject);
});

// GET SINGLE ENTRY
const getSingleEntry = (firebaseKey, uid) => new Promise((resolve, reject) => {
  axios.get(`${dbUrl}/vocabulary/${firebaseKey}.json`, uid)
    .then((response) => resolve(response.data))
    .catch((error) => reject(error));
});

// DELETE ENTRY
const deleteSingleEntry = (firebaseKey, uid) => new Promise((resolve, reject) => {
  axios.delete(`${dbUrl}/vocabulary/${firebaseKey}.json`, uid)
    .then(() => {
      getEntry(uid).then((vocabArray) => resolve(vocabArray));
    })
    .catch((error) => reject(error));
});

// EDIT ENTRY
const editEntry = (vocabObj) => new Promise((resolve, reject) => {
  axios.patch(`${dbUrl}/vocabulary/${vocabObj.firebaseKey}.json`, vocabObj)
    .then(() => getEntry(vocabObj.uid).then(resolve))
    .catch((error) => reject(error));
});

export {
  getEntry,
  createEntry,
  deleteSingleEntry,
  editEntry,
  getSingleEntry
};