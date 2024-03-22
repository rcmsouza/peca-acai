import React from 'react';
import './App.css';
import Header from '../components/header';
import Selector from './selector';

function App() {
  return (
    <div className="App">
      <Header title={'peça açaí'}/>
      <Selector />
    </div>
  );
}

export default App;
