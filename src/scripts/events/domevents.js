import { getSingleEntry, deleteSingleEntry } from '../../api/entryData';
import { showEntry } from '../components/pages/vocab';
import viewVocab from '../components/pages/viewVocab';
import addEntryForm from '../components/forms/addVocabForm';

const domEvents = (uid) => {
  document.querySelector('#main-container').addEventListener('click', (e) => {
    // CLICK EVENT FOR DELETING AN ENTRY
    if (e.target.id.includes('delete-entry')) {
      // eslint-disable-next-line no-alert
      if (window.confirm('Want to delete?')) {
        const [, firebaseKey] = e.target.id.split('--');
        deleteSingleEntry(firebaseKey).then((vocabArray) => showEntry(vocabArray));
      }
    }

    // CLICK EVENT FOR SHOWING FORM FOR ADDING AN ENTRY
    if (e.target.id.includes('add-entry-btn')) {
      console.warn('ADD ENTRY');
      addEntryForm(uid);
    }

    // CLICK EVENT EDITING/UPDATING AN ENTRY
    if (e.target.id.includes('edit-entry-btn')) {
      console.warn('EDIT ENTRY', e.target.id);
      const [, firebaseKey] = e.target.id.split('--');

      // 1.pass the entry***
      // 2.pass the entry object to vocab form*** along with uid
      getSingleEntry(firebaseKey).then((vocabObject) => addEntryForm(uid, vocabObject));
    }

    // CLICK EVENT FOR VIEW VOCAB DETAILS
    if (e.target.id.includes('view-entry-btn')) {
      console.warn('clicked view-btn');
      const [, vocabFirebaseKey] = e.target.id.split('--');
      console.warn(e.target.id);
      viewVocab(vocabFirebaseKey).then((vocabObject) => viewVocab(vocabObject));
    }
  });
};

export default domEvents;
