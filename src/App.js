import React from 'react';
import './App.css';
import CreateMeeting from './components/CreateMeeting';
import MeetingList from './components/MeetingList';

function App() {
  return (
    <div className="app">
      <CreateMeeting/>
      <MeetingList/>
    </div>
  );
}

export default App;
