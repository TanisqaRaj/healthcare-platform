import { useState } from 'react';
import './app.css';
import Home from './home';
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

