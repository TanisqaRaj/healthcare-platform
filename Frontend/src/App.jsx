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
        <>
          <Header />
          <Footer />
        </>
        //  <Routes>
        //     <Route path="/" element={<Home />} />
        //     <Route path="Header" element={<Header/>} />
        //  </Routes>       
  );
}

export default App;

