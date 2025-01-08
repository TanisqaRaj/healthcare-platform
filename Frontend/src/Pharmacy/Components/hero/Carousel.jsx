import React, { useState, useEffect } from "react";
import { MdNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    {
      image: "C:\Users\rajta\OneDrive\Desktop\Projects\healthcare-platform\Frontend\src\assets\pharmacy\skin_care1_1920.jpg",
      title: "Slide 1 Title",
      description: "This is the description for Slide 1."
    },
    {
      image: "C:\Users\rajta\OneDrive\Desktop\Projects\healthcare-platform\Frontend\src\assets\pharmacy\skin_care1_1920.jpg", 
      title: "Slide 2 Title",
      description: "This is the description for Slide 2."
    },
    {
      image: "C:\Users\rajta\OneDrive\Desktop\Projects\healthcare-platform\Frontend\src\assets\pharmacy\skin_care1_1920.jpg", 
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
