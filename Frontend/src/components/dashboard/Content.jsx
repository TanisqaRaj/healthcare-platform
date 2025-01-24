import React from "react";
import DashHeader from "./DashHeader";
import { useNavigate } from "react-router-dom";

const Content = () => {
  const doctorlist = [
    {
      name: "Tanisqa",
      image:
        "https://tse1.mm.bing.net/th?id=OIP.hoDdwwlNXYBkmPjCYh8LwQHaE8&pid=Api&P=0&h=220",
      desc: "Specialized neurologist with expertise in treating complex neurological disorders.",
      fee: "",
    },
    {
      name: "Alisha",
      image:
        "https://tse1.mm.bing.net/th?id=OIP.hoDdwwlNXYBkmPjCYh8LwQHaE8&pid=Api&P=0&h=220",
      desc: "Specialized neurologist with expertise in treating complex neurological disorders.",
      fee: "",
    },
    {
      name: "Taranjeet",
      image:
        "https://tse1.mm.bing.net/th?id=OIP.hoDdwwlNXYBkmPjCYh8LwQHaE8&pid=Api&P=0&h=220",
      desc: "Specialized neurologist with expertise in treating complex neurological disorders.",
      fee: "",
    },
  ];

  const TrendingNews = [
    {
      image:
        "https://static.toiimg.com/thumb/msid-117063963,imgsize-43998,width-400,height-225,resizemode-72/117063963.jpg",
      desc: "no need to panic about the human metapneumovirus",
      link: "https://timesofindia.indiatimes.com/city/chandigarh/no-need-to-panic-about-hmpv-says-punjab-health-minister/articleshow/117063964.cms",
    },
    {
      image:
        "https://static.toiimg.com/thumb/msid-117362027,imgsize-23334,width-400,height-225,resizemode-72/117362027.jpg",
      desc: "Study pressure, romance among factors behind kota student suicides:Health Minister",
      link: "https://timesofindia.indiatimes.com/city/jaipur/study-pressure-romance-among-factors-behind-kota-student-suicides-minister/articleshow/117362030.cms",
    },
    {
      image:
        "https://static.toiimg.com/thumb/msid-117293445,imgsize-1087783,width-400,resizemode-4/117293445.jpg",
      desc: "6 benifits of drinking raisine water in the morning",
      link: "https://timesofindia.indiatimes.com/life-style/health-fitness/diet/6-benefits-of-drinking-raisin-water-in-the-morning/articleshow/117292690.cms",
    },
    {
      image:
        "https://static.toiimg.com/thumb/msid-117294894,imgsize-1249835,width-400,resizemode-4/117294894.jpg",
      desc: "Surprising benifits of running everyday and things to keep in mind during winter",
      link: "https://timesofindia.indiatimes.com/life-style/health-fitness/fitness/surprising-benefits-of-running-every-day-and-things-to-keep-in-mind-during-winter/articleshow/117294808.cms",
    },
    {
      image:
        "https://static.toiimg.com/thumb/msid-117338404,imgsize-98924,width-400,resizemode-4/117338404.jpg",
      desc: "Cancer cases surge in young: simple lifestyle changes to lower your risk",
      link: "https://timesofindia.indiatimes.com/life-style/health-fitness/health-news/cancer-cases-surge-in-young-simple-lifestyle-changes-to-lower-your-risk/articleshow/117338403.cms",
    },
  ];

  const Pharmacy = [
    {
      image:
        "https://tse3.mm.bing.net/th?id=OIP.xn8Es2K1otCm_cjEPHUxXQHaF7&pid=Api&P=0&h=220",
      desc: "no need to panic about the human metapneumovirus",
      link: "https://timesofindia.indiatimes.com/city/chandigarh/no-need-to-panic-about-hmpv-says-punjab-health-minister/articleshow/117063964.cms",
    },
    {
      image:
        "https://tse3.mm.bing.net/th?id=OIP.xn8Es2K1otCm_cjEPHUxXQHaF7&pid=Api&P=0&h=220",
      desc: "Study pressure, romance among factors behind kota student suicides:Health Minister",
      link: "https://timesofindia.indiatimes.com/city/jaipur/study-pressure-romance-among-factors-behind-kota-student-suicides-minister/articleshow/117362030.cms",
    },
    {
      image:
        "https://tse3.mm.bing.net/th?id=OIP.xn8Es2K1otCm_cjEPHUxXQHaF7&pid=Api&P=0&h=220",
      desc: "6 benifits of drinking raisine water in the morning",
      link: "https://timesofindia.indiatimes.com/life-style/health-fitness/diet/6-benefits-of-drinking-raisin-water-in-the-morning/articleshow/117292690.cms",
    },
    {
      image:
        "https://tse3.mm.bing.net/th?id=OIP.xn8Es2K1otCm_cjEPHUxXQHaF7&pid=Api&P=0&h=220",
      desc: "Surprising benifits of running everyday and things to keep in mind during winter",
      link: "https://timesofindia.indiatimes.com/life-style/health-fitness/fitness/surprising-benefits-of-running-every-day-and-things-to-keep-in-mind-during-winter/articleshow/117294808.cms",
    },
    {
      image:
        "https://tse3.mm.bing.net/th?id=OIP.xn8Es2K1otCm_cjEPHUxXQHaF7&pid=Api&P=0&h=220",
      desc: "Cancer cases surge in young: simple lifestyle changes to lower your risk",
      link: "https://timesofindia.indiatimes.com/life-style/health-fitness/health-news/cancer-cases-surge-in-young-simple-lifestyle-changes-to-lower-your-risk/articleshow/117338403.cms",
    },
  ];
  const navigate = useNavigate();
  const navigateAppointment = () => {
    navigate("/registration");
  };

  return (
    <div>
      <DashHeader />

      {/* records */}
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

      {/* doctorlist */}
      <div className="pb-5">
        <p className="px-4 pt-10 lg:px-10 pb-10 text-2xl font-bold text-gray-700 text-start">
          Find Your Doctor
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 lg:px-10">
          {doctorlist.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white border rounded-lg shadow-lg hover:shadow-2xl duration-300 p-4"
            >
              <div className="w-full flex justify-center mb-4">
                <img
                  src={item.image}
                  className=" border w-24 h-24 object-cover rounded-full"
                />
              </div>
              <div className="text-xl font-semibold text-gray-800 text-center">
                {item.name}
              </div>
              <div className="text-sm text-gray-600 text-center mt-2">
                {item.desc}
              </div>
              <button
                className="mt-4 bg-emerald-500 text-white py-2 px-6 rounded-lg hover:bg-emerald-700 duration-300"
                onClick={navigateAppointment}
              >
                Book Appointment
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Trending news */}
      <div className="pb-5">
        <p className="px-4 pt-10 lg:px-10 pb-10 text-2xl font-bold text-gray-700 ">
          Trending News
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-4 lg:px-10">
          {TrendingNews.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white border rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 "
            >
              <div className="w-full flex justify-center mb-4">
                <img
                  src={item.image}
                  className="w-full h-48 object-cover rounded-md"
                />
              </div>
              <a
                href={
                  item.link ||
                  "https://pharmeasy.in/blog/hernia-foods-to-try-and-avoid/"
                }
                className="text-sm text-gray-700 text-center mt-2 mb-2 hover:text-blue-600 transition-colors duration-300"
              >
                {item.desc}
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
          {Pharmacy.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white border rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 "
            >
              <div className="w-full flex justify-center mb-4">
                <img
                  src={item.image}
                  className="w-full h-48 object-cover rounded-md"
                />
              </div>
              <a
                href={
                  item.link ||
                  "https://pharmeasy.in/blog/hernia-foods-to-try-and-avoid/"
                }
                className="text-sm text-gray-700 text-center mt-2 mb-2 hover:text-blue-600 transition-colors duration-300"
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
