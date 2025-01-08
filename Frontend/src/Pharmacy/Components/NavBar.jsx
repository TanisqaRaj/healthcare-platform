import React from 'react'
import About from './navbar/About'
import Contact from './navbar/Contact'
// import Contact from '../../Components/pages/Contact/Contact'
import Services from './navbar/Services'
import Home from '../../components/Pages/Home'
import { NavLink } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

import './NavBar.css'

const NavBar = () => {

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignUpClick = () => {
    navigate("/registration");
  }

  return (
    <nav className="w-[100vw] h-[10vh] p-3 bg-emerald-400 flex  ">
      <div className=' items-center justify-between '>
      <a href="/" className="cursor-pointer py-7 pr-2 items-center justify-between">
          <img className='h-[50px] w-[50px]' src="data:image/jpeg;base64,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" alt="Logo" width="125px" height="30px" />
        </a>
      </div>
      <div className="relative py-0.3 mx-auto flex items-center justify-between  space-x-10">
        
        <ul className='hidden lg:flex   space-x-7'>
          <li>
            <NavLink to='/services' className={({isActive}) => isActive ? "active-link": " "}>
                Services
            </NavLink>              
          </li>
          <li>
            <NavLink to='/about' className={({isActive}) => isActive ? "active-link": " "}>
                About Us
            </NavLink>
          </li>
          <li>
            <NavLink to='/pharmacy' className={({isActive}) => isActive ? "active-link": " "}>
                Pharmacy
            </NavLink>
          </li>
          <li>
            <NavLink to='/contact' className={({isActive}) => isActive ? "active-link": " "}>
                Contact
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="flex space-x-3 ">
        <button className="duration-300 px-4 py-1 text-white border rounded-full text-sm font-bold hover:text-blue-200"
         onClick={handleLoginClick}>
          Login
        </button>
        <button 
          onClick={handleSignUpClick}
          className="px-4 py-1 text-sky-500 border rounded-full text-sm bg-white hover:text-blue-600 transition-all duration-200">
          Sign up
        </button>
      </div>
    </nav>
  )
}

export default NavBar


    // <nav className="w-[100vw] h-[10vh] p-3 bg-emerald-400 flex items-center justify-between sm:justify-around">
   
    //   <div className='items-center'>
    //     <a href="/" className="cursor-pointer py-7 pr-2">
    //       <img 
    //         className='h-[50px] w-[50px]' 
    //         src="data:image/jpeg;base64,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" 
    //         alt="Logo" 
    //         width="125px" 
    //         height="30px" 
    //       />
    //     </a>
    //   </div>

    //   <div className="hidden md:flex items-center justify-between space-x-10 md:space-x-5">
    //     <ul className='hidden lg:flex space-x-7'>
    //       <li>
    //         <NavLink to='/services' className={({ isActive }) => isActive ? "active-link" : ""}>
    //           Services
    //         </NavLink>
    //       </li>
    //       <li>
    //         <NavLink to='/about' className={({ isActive }) => isActive ? "active-link" : ""}>
    //           About Us
    //         </NavLink>
    //       </li>
    //       <li>
    //         <NavLink to='/pharmacy' className={({ isActive }) => isActive ? "active-link" : ""}>
    //           Pharmacy
    //         </NavLink>
    //       </li>
    //       <li>
    //         <NavLink to='/contact' className={({ isActive }) => isActive ? "active-link" : ""}>
    //           Contact
    //         </NavLink>
    //       </li>
    //     </ul>
    //   </div>

    //   <div className="flex space-x-3">
    //     <button 
    //       className="duration-300 px-4 py-1 text-white border rounded-full text-sm font-bold hover:text-blue-200"
    //       onClick={handleLoginClick}>
    //       Login
    //     </button>
    //     <button className="px-4 py-1 text-sky-500 border rounded-full text-sm bg-white hover:text-blue-600 transition-all duration-200">
    //       Sign up
    //     </button>
    //   </div>
    // </nav>