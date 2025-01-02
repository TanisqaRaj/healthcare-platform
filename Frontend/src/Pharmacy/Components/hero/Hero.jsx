import React from 'react';


const ProductData = [
  {
    id: 1,
    img: "https://media.istockphoto.com/id/1321617070/vector/health-medical-logo.jpg",
    title: "Vitamins",
  },
  {
    id: 2,
    img: "https://media.istockphoto.com/id/1321617070/vector/health-medical-logo.jpg",
    title: "Minerals",
  },
  {
    id: 3,
    img: "skin.jpg",
    title: "Enzymes",
  },
  {
    id: 4,
    img: "", 
    title: "Collagen",
  },
  {
    id: 5,
    img: "",
    title: "Amino-acid",
  },
  {
    id: 6,
    img: "", 
    title: "Protein",
  },
];

const Hero = () => {
  return (
    <div className="w-[100vw]">
      
      <header className="flex justify-between py-3 px-4">
        <h2 className="">Supplement</h2>
        <div className="flex justify-center">
          <a
            className="text-center mt-10 border cursor-pointer bg-primary text-white py-1 px-5 rounded-md"
            href="#"
          >
            View All
          </a>
        </div>
      </header>

      
      <div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 px-3 py-3 gap-x-4 gap-y-4 border h-[400px]">
          {ProductData.map((data) => (
            <div key={data.id} className="flex flex-col items-center">
              <img
                src={data.img}
                alt={data.title}
                className="h-[220px] w-[150px] object-cover rounded-md"
              />
              <h3 className="mt-2 text-center">{data.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
