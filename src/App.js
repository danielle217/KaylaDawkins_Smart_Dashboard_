import React, { useState, useEffect } from 'react';
import Clock from './components/clock';
import Weather from './components/weather';
import News from './components/news';
import Todolist from './components/toDoList';
import SearchBar from './components/searchBar';
import './App.css';
import BackgroundCustomizer from './components/backgroundCustom'; 

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(
    () => JSON.parse(localStorage.getItem('darkMode')) || false
  );
  const [bgUrl, setBgUrl] = useState(
    () => localStorage.getItem('bgUrl') || ''
  );

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('bgUrl', bgUrl);
  }, [bgUrl]);
 
  const backgroundStyle = bgUrl
    ? {
        backgroundImage: `url(${bgUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }
    : {};

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`} style={backgroundStyle}>
      <header>
        <h1>Smart Dashboard</h1>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? 'Light' : 'Dark'}
        </button>
      </header>
      <div className="dashboard-grid">
        <Clock />
        <Weather />
        <Todolist />
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <News searchTerm={searchTerm} />
        <BackgroundCustomizer bgUrl={bgUrl} setBgUrl={setBgUrl} />
      </div>
    </div>
  );
}

export default App;
