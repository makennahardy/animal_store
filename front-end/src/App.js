import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from 'axios';
import Store from './Store.js';
import './App.css';
import Home from './Home';
function App() {


  // render results
  return (
  <BrowserRouter basename="/animal_store/front-end/build">
    <Routes>
      <Route path ="/" element={<Home />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;