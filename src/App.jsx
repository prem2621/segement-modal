import React, { useState } from 'react';
import Segment  from './segement/Segement';
import './segement/Segement.css';
import './App.css'

export default function App(){
  const [open, setOpen] = useState(false);

  return (
    <div className="app">
       
      <header className="app-header">
        <h2>
          <span>&lt;</span> View Audience
        </h2>
      </header>

      <main className="center">
        <button className="popup" onClick={() => setOpen(true)}>
          Save segment
        </button>
      </main>

      {open && <Segment onClose={() => setOpen(false)} />}
    </div>
  );
}
