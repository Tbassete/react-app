import React from 'react';
import './App.css';
import Cabeca from './components/Headerr';
import Main from './components/Main';
import Footer from './components/Footer';

function App() {
  return (
    <div className="container-app">
      <Cabeca />
      <Main/>
      <Footer />
    </div>
  );
}

export default App;