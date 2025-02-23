import { useEffect, useState } from "react";
import DashHeader from "./DashHeader";

const Content = () => {
  const [trendingNews, setTrendingNews] = useState([]);

  const pharmacy = [
    {
      image:
        "https://tse3.mm.bing.net/th?id=OIP.xn8Es2K1otCm_cjEPHUxXQHaF7&pid=Api&P=0&h=220",
      desc: "No need to panic about the human metapneumovirus",
      link: "https://timesofindia.indiatimes.com/city/chandigarh/no-need-to-panic-about-hmpv-says-punjab-health-minister/articleshow/117063964.cms",
    },
    {
      image:
        "https://tse3.mm.bing.net/th?id=OIP.xn8Es2K1otCm_cjEPHUxXQHaF7&pid=Api&P=0&h=220",
      desc: "Study pressure, romance among factors behind Kota student suicides: Health Minister",
      link: "https://timesofindia.indiatimes.com/city/jaipur/study-pressure-romance-among-factors-behind-kota-student-suicides-minister/articleshow/117362030.cms",
    },
  ]; 

  // newsApi call
  useEffect(() => {
    const fetchTrendingNews = async () => {
      try {
        const response = await fetch(
          "https://newsdata.io/api/1/news?apikey=pub_66565584764af6605af174ba32fd202a15cfd&q=health&country=in&language=en,hi&category=health  "
        );
        const data = await response.json();
        setTrendingNews(data.results || []);
      } catch (error) {
        console.error("Error fetching trending news:", error);
      }
    };

    fetchTrendingNews();
  }, []);

  return (
    <div className="w-full">

      {/* Records Section */}
      <div className="pt-20 px-4 lg:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 h-[30vh]">
          <div className="border shadow-lg rounded-lg p-6 flex flex-col items-center justify-center bg-white hover:shadow-2xl duration-300">
            <div className="text-4xl font-bold text-emerald-500 mb-4">45</div>
            <div className="bg-emerald-100 text-emerald-600 w-full text-center py-2 rounded-md font-medium">
              Number of Appointments
            </div>
          </div>

          <div className="border shadow-lg rounded-lg p-6 flex flex-col items-center justify-center bg-white hover:shadow-2xl duration-300">
            <div className="text-4xl font-bold text-emerald-500 mb-4">12</div>
            <div className="bg-emerald-100 text-emerald-600 w-full text-center py-2 rounded-md font-medium">
              Approved Appointments
            </div>
          </div>

          <div className="border shadow-lg rounded-lg p-6 flex flex-col items-center justify-center bg-white hover:shadow-2xl duration-300">
            <div className="text-4xl font-bold text-emerald-500 mb-4">8</div>
            <div className="bg-emerald-100 text-emerald-600 w-full text-center py-2 rounded-md font-medium">
              Completed Appointments
            </div>
          </div>
        </div>
      </div>

      {/* Trending News Section */}
      <div className="pb-5">
        <p className="px-4 pt-10 lg:px-10 pb-10 text-2xl font-bold text-gray-700 ">
          Trending News
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-4 lg:px-10">
          {trendingNews.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white border rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 "
            >
              <div className="w-full flex justify-center mb-4">
                <img
                  src={item.image_url}
                  className="w-full h-48 object-cover rounded-md"
                  alt="Trending News"
                />
              </div>
              <a
                href={item.link || "#"}
                className="text-sm text-gray-700 text-center mt-2 mb-2 hover:text-blue-600 transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.title}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Pharmacy Section */}
      <div className="pb-5">
        <p className="px-4 pt-10 lg:px-10 pb-10 text-2xl font-bold text-gray-700 ">
          Buy Medicine
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-4 lg:px-10">
          {pharmacy.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white border rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 "
            >
              <div className="w-full flex justify-center mb-4">
                <img
                  src={item.image}
                  className="w-full h-48 object-cover rounded-md"
                  alt="Pharmacy"
                />
              </div>
              <a
                href={item.link}
                className="text-sm text-gray-700 text-center mt-2 mb-2 hover:text-blue-600 transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.desc}
              </a>
            </div>
          ))}
        </div>
      </div>


      
    </div>
  );
};

export default Content;
