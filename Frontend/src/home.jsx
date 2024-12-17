import React from "react"
import Carousel from 'react-bootstrap/Carousel';
import ExampleCarouselImage from './components/ExampleCarouselImage'

const Home = () => {
  return (
    <div className="h-[100vh] w-[100vw] bg-sky-950 ">
         <nav  className='w-[100vw]  bg-sky-950 flex'>
          {/* @TODO */}
            <div className='relative py-0.3 mx-auto flex items-center justify-between space-x-10'>
                
                <a href='/' className='cursor-pointer py-7 pr-7 '>
                  <img src="/" width="125px" height="30px" ></img>
                </a>
                
                <ul className='flex space-x-7'>

                  <li className='text-white py-7 hover:text-blue-900 cursor-pointer 
                  transition-all duration-200 relative group'>
                    <a href='#'>Home</a>
                    <div className='absolute bottom-0 w-full h-1 bg-blue-400  hidden group-hover:block  
                    transition-all duration-200'></div>
                  </li>

                  <li className='text-white py-7 hover:text-blue-900 cursor-pointer 
                  transition-all duration-200 relative group'>
                    <a href='#'>Services</a>
                    <div className='absolute bottom-0 w-full h-1 bg-blue-400  hidden group-hover:block  
                    transition-all duration-200'></div>
                  </li>

                  <li className='text-white py-7 hover:text-blue-900 cursor-pointer 
                  transition-all duration-200 relative group'>
                    <a href='#'>About us</a>
                    <div className='absolute bottom-0 w-full h-1 bg-blue-400  hidden group-hover:block  
                    transition-all duration-200'></div>
                  </li>

                  <li className='text-white py-7 hover:text-blue-900 cursor-pointer 
                  transition-all duration-200 relative group'>
                    <a href='#'>Contact</a>
                    <div className='absolute bottom-0 w-full h-1 bg-blue-400  hidden group-hover:block  
                    transition-all duration-200'></div>
                  </li>
                </ul>
                
                <div className="flex space-x-6 " >
                  <button className=' duration-300 px-5 py-3 text-white border rounded-full text-sm font-bold
                   hover:text-blue-200'>Login</button>
                  <button className='px-5 py-3 text-sky-500 border rounded-full text-sm
                   bg-white hover:text-blue-600 transition-all duration-200'>Sign up</button>
                </div>
            </div>
          </nav>
          <div>
            <Carousel>
      <Carousel.Item interval={1000}>
        <ExampleCarouselImage text="First slide" />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={500}>
        <ExampleCarouselImage text="Second slide" />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <ExampleCarouselImage text="Third slide" />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel></div>
       </div>      
  );
}
 export default Home;
