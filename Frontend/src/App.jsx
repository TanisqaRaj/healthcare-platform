import { useState } from 'react';
import './app.css';
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes
} from "react-router-dom";

import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  

  return (
         <Routes>
            <Route path="/" element={<Home />} />
            
         </Routes>       
  );
}

export default App;

