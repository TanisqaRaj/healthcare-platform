import { useState } from 'react';
import './app.css';
import Home from './Home';
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes
} from "react-router-dom";



function App() {
  

  return (
         <Routes>
            <Route path="/" element={<Home />} />
            
         </Routes>       
  );
}

export default App;

