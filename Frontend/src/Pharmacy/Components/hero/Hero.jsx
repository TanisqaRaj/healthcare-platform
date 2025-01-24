import React from "react";

const ProductData = [
  {
    id: 1,
    img: "https://tse3.mm.bing.net/th?id=OIP.xn8Es2K1otCm_cjEPHUxXQHaF7&pid=Api&P=0&h=220",
    title: "Vitamins",
  },
  {
    id: 2,
    img: "https://tse3.mm.bing.net/th?id=OIP.xn8Es2K1otCm_cjEPHUxXQHaF7&pid=Api&P=0&h=220",
    title: "Minerals",
  },
  {
    id: 3,
    img: "https://tse3.mm.bing.net/th?id=OIP.xn8Es2K1otCm_cjEPHUxXQHaF7&pid=Api&P=0&h=220",
    title: "Enzymes",
  },
  {
    id: 4,
    img: "https://tse3.mm.bing.net/th?id=OIP.xn8Es2K1otCm_cjEPHUxXQHaF7&pid=Api&P=0&h=220",
    title: "Collagen",
  },
  {
    id: 5,
    img: "https://tse3.mm.bing.net/th?id=OIP.xn8Es2K1otCm_cjEPHUxXQHaF7&pid=Api&P=0&h=220",
    title: "Amino-acid",
  },
];

const Hero = () => {
  return (
    <div className="w-full min-h-screen bg-gray-100">
      {/* Supplement */}
      <header className="flex justify-between items-center py-5 px-5 bg-gradient-to-r from-emerald-500 to-green-700 text-white shadow-md">
        <h2 className="text-2xl font-semibold">Supplement</h2>
        <div>
          <a
            className="text-center border border-white bg-white text-emerald-600 hover:bg-emerald-100 hover:text-emerald-700 py-2 px-6 rounded-lg shadow-md transition duration-300"
            href="#"
          >
            View All
          </a>
        </div>
      </header>

      {/* Product Section */}
      <div className="py-6 px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {ProductData.map((data) => (
            <div
              key={data.id}
              className="flex flex-col items-center bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 overflow-hidden"
            >
              <img
                src={data.img}
                alt={data.title}
                className="h-56 w-full object-cover"
              />
              <h3 className="mt-4 mb-2 text-lg font-medium text-gray-700 px-2 text-center">
                {data.title}
              </h3>
              <button className="mb-4 px-16 py-1 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition duration-300">
                Buy now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* trending medicine */}
      <header className="flex justify-between items-center py-5 px-5 bg-gradient-to-r from-emerald-500 to-green-700 text-white shadow-md">
        <h2 className="text-2xl font-semibold">Trending Medicine</h2>
        <div>
          <a
            className="text-center border border-white bg-white text-emerald-600 hover:bg-emerald-100 hover:text-emerald-700 py-2 px-6 rounded-lg shadow-md transition duration-300"
            href="#"
          >
            View All
          </a>
        </div>
      </header>

      {/* Product Section */}
      <div className="py-6 px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {ProductData.map((data) => (
            <div
              key={data.id}
              className="flex flex-col items-center bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 overflow-hidden"
            >
              <img
                src={data.img}
                alt={data.title}
                className="h-56 w-full object-cover"
              />
              <h3 className="mt-4 mb-2 text-lg font-medium text-gray-700 px-2 text-center">
                {data.title}
              </h3>
              <button className="mb-4  px-16 py-1 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition duration-300">
                Buy now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
