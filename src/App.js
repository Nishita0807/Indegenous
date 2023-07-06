import React from 'react';
import './App.css';
import NotesList from './NotesList';

const App = () => {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Notes App</h1>
      </header>
      <main className="app-main">
        <NotesList />
      </main>
      <footer className="footer">
        <p>&copy; 2023 The Indegenous :: My Notes App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
