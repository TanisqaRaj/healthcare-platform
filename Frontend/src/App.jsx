import { useState } from 'react';
import './app.css';
import Home from './Home';
import AdminEditProduct from './components/AdminEditProduct';
import {
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes
} from "react-router-dom";



function App() {
  

  return (
    <>
  
    <AdminEditProduct/>
    </>
        //  <Routes>
        //     <Route path="/" element={<Home />} />
            
        //  </Routes>       
  );
}

export default App;

