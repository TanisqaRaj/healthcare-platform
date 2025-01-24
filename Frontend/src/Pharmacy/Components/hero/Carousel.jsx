import React, { useState, useEffect } from "react";
import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      image: "https://plus.unsplash.com/premium_photo-1668487826871-2f2cac23ad56?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bWVkaWNpbmV8ZW58MHx8MHx8fDA%3D",
      title: "Slide 1 Title",
      description: "This is the description for Slide 1."
    },
    {
      image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1lZGljaW5lfGVufDB8fDB8fHww", 
      title: "Slide 2 Title",
      description: "This is the description for Slide 2."
    },
    {
      image: "https://media.istockphoto.com/id/2147705600/photo/doctor-holding-clipboard-consulting-child.webp?a=1&b=1&s=612x612&w=0&k=20&c=bbX5pyM2bI3OXRUYZNJw9fXN5Xa3bjl7HCN2jCtl08U=", 
      title: "Slide 3 Title",
      description: "This is the description for Slide 3."
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((currentIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((currentIndex - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="w-[100vw]">
      <div className="relative">
        <button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-gray-200 rounded-full hover:bg-gray-300"
          onClick={prevSlide}
        >
          <MdNavigateBefore />
        </button>

        <div className="flex flex-col items-center justify-center w-full h-[400px] bg-white shadow-lg overflow-hidden">
          <img
            src={slides[currentIndex].image}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-10 left-10  bg-opacity-50 text-black p-4 rounded-md">
            <h2 className="text-2xl font-bold mb-2">{slides[currentIndex].title}</h2>
            <p className="text-lg">{slides[currentIndex].description}</p>
          </div>
        </div>

        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-gray-200 rounded-full hover:bg-gray-300"
          onClick={nextSlide}
        >
          <MdNavigateNext />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
