import React, { useEffect, useState } from 'react';
import './NotesList.css';

const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [showNotePopup, setShowNotePopup] = useState(false);

  useEffect(() => {
    fetch('https://api.gyanibooks.com/library/get_dummy_notes/')
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch notes');
        }
      })
      .then((data) => setNotes(data))
      .catch((error) => console.error(error));
  }, []);

  const parseNotesContent = (notes) => {
    const parsedNotes = JSON.parse(notes);

    let content = '';
    if (parsedNotes && parsedNotes.content) {
      parsedNotes.content.forEach((item) => {
        if (item.type === 'blockGroup' && item.content) {
          item.content.forEach((blockContainer) => {
            if (blockContainer.type === 'blockContainer' && blockContainer.content) {
              blockContainer.content.forEach((block) => {
                if (block.type === 'paragraph' && block.content) {
                  block.content.forEach((text) => {
                    if (text.type === 'text') {
                      content += text.text;
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
    if (content === '') {
        content = 'Please provide note';
      }
    return content;
  };

  const handleNoteClick = (note) => {
    setSelectedNote(note);
    setShowNotePopup(true);
  };

  const closeNotePopup = () => {
    setShowNotePopup(false);
  };

  return (
    <div className="notes-list">
      <h2 className="title">Notes</h2>
      <div className="click">Click box to get notes and scroll for more</div>
      <div className="notes-container">
        {notes.map((note) => (
          <div key={note.id} className="note-card" onClick={() => handleNoteClick(note)}>
            <h3 className="note-title">Title: {note.title}</h3>
            <p className="note-content">Category: {note.category}</p>
            <p className="note-content">User: {note.user}</p>
          </div>
        ))}
      </div>
      {showNotePopup && (
        <div className="note-popup">
          <div className="note-popup-content">
            <h3 className="note-details-title">Notes</h3>
            <p className="note-details-content">{selectedNote.notes ? parseNotesContent(selectedNote.notes) : 'Please provide note entry for this field'}</p>
            <button className="close-button" onClick={closeNotePopup}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesList;
