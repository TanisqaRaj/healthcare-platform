import React from "react";
import { useEffect, useState } from "react";
import DashHeader from "../DashHeader";
import Appointment from "./Appointment";
import { FaStar } from "react-icons/fa";
import { FaIndianRupeeSign } from "react-icons/fa6";
import InfiniteScroll from "react-infinite-scroll-component";
// import axios from "axios";

const BookAppointment = () => {
  const [appVisible, setAppVisisble] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  // const [loading, setLoading] = useState(false);
  // const [doctorList, setDoctorList] = useState([]);

  const [doctorList, setDoctorList] = useState([
    {
      name: "Tanisqa",
      image:
        "https://tse1.mm.bing.net/th?id=OIP.hoDdwwlNXYBkmPjCYh8LwQHaE8&pid=Api&P=0&h=220",
      desc: "Specialized neurologist with expertise in treating complex neurological disorders.",
      skill: ["neurosugeon", "neurosugeon", "neurosugeon"],
      fee: "500",
      rating: "4.5",
    },
    {
      name: "Alisha",
      image:
        "https://tse1.mm.bing.net/th?id=OIP.hoDdwwlNXYBkmPjCYh8LwQHaE8&pid=Api&P=0&h=220",
      desc: "Specialized neurologist with expertise in treating complex neurological disorders.",
      skill: ["neurosugeon", "neurosugeon", "neurosugeon"],
      fee: "500",
      rating: "4.5",
    },
    {
      name: "Taranjeet",
      image:
        "https://tse1.mm.bing.net/th?id=OIP.hoDdwwlNXYBkmPjCYh8LwQHaE8&pid=Api&P=0&h=220",
      desc: "Specialized neurologist with expertise in treating complex neurological disorders.",
      skill: ["neurosugeon", "neurosugeon", "neurosugeon"],
      fee: "500",
      rating: "4.5",
    },
    {
      name: "Tanisqa",
      image:
        "https://tse1.mm.bing.net/th?id=OIP.hoDdwwlNXYBkmPjCYh8LwQHaE8&pid=Api&P=0&h=220",
      desc: "Specialized neurologist with expertise in treating complex neurological disorders.",
      skill: ["neurosugeon", "neurosugeon", "neurosugeon"],
      fee: "500",
      rating: "4.5",
    },
    {
      name: "Alisha",
      image:
        "https://tse1.mm.bing.net/th?id=OIP.hoDdwwlNXYBkmPjCYh8LwQHaE8&pid=Api&P=0&h=220",
      desc: "Specialized neurologist with expertise in treating complex neurological disorders.",
      skill: ["neurosugeon", "neurosugeon", "neurosugeon"],
      fee: "500",
      rating: "4.5",
    },
    {
      name: "Taranjeet",
      image:
        "https://tse1.mm.bing.net/th?id=OIP.hoDdwwlNXYBkmPjCYh8LwQHaE8&pid=Api&P=0&h=220",
      desc: "Specialized neurologist with expertise in treating complex neurological disorders.",
      skill: ["neurosugeon", "neurosugeon", "neurosugeon"],
      fee: "500",
      rating: "4.5",
    },
    {
      name: "Tanisqa",
      image:
        "https://tse1.mm.bing.net/th?id=OIP.hoDdwwlNXYBkmPjCYh8LwQHaE8&pid=Api&P=0&h=220",
      desc: "Specialized neurologist with expertise in treating complex neurological disorders.",
      skill: ["neurosugeon", "neurosugeon", "neurosugeon"],
      fee: "500",
      rating: "4.5",
    },
    {
      name: "Alisha",
      image:
        "https://tse1.mm.bing.net/th?id=OIP.hoDdwwlNXYBkmPjCYh8LwQHaE8&pid=Api&P=0&h=220",
      desc: "Specialized neurologist with expertise in treating complex neurological disorders.",
      skill: ["neurosugeon", "neurosugeon", "neurosugeon"],
      fee: "500",
      rating: "4.5",
    },
    {
      name: "Taranjeet",
      image:
        "https://tse1.mm.bing.net/th?id=OIP.hoDdwwlNXYBkmPjCYh8LwQHaE8&pid=Api&P=0&h=220",
      desc: "Specialized neurologist with expertise in treating complex neurological disorders.",
      skill: ["neurosugeon", "neurosugeon", "neurosugeon"],
      fee: "500",
      rating: "4.5",
    },
    {
      name: "Tanisqa",
      image:
        "https://tse1.mm.bing.net/th?id=OIP.hoDdwwlNXYBkmPjCYh8LwQHaE8&pid=Api&P=0&h=220",
      desc: "Specialized neurologist with expertise in treating complex neurological disorders.",
      skill: ["neurosugeon", "neurosugeon", "neurosugeon"],
      fee: "500",
      rating: "4.5",
    },
    {
      name: "Alisha",
      image:
        "https://tse1.mm.bing.net/th?id=OIP.hoDdwwlNXYBkmPjCYh8LwQHaE8&pid=Api&P=0&h=220",
      desc: "Specialized neurologist with expertise in treating complex neurological disorders.",
      skill: ["neurosugeon", "neurosugeon", "neurosugeon"],
      fee: "500",
      rating: "4.5",
    },
    {
      name: "Taranjeet12",
      image:
        "https://tse1.mm.bing.net/th?id=OIP.hoDdwwlNXYBkmPjCYh8LwQHaE8&pid=Api&P=0&h=220",
      desc: "Specialized neurologist with expertise in treating complex neurological disorders.",
      skill: ["neurosugeon", "neurosugeon", "neurosugeon"],
      fee: "500",
      rating: "4.5",
    },
  ]);

  // const [page, setPage] = useState(1);

  //debouncing
  // useEffect(() => {
  //   let timeout = setTimeout(() => {
  //     getDoctorList("url");
  //   }, 800);
  //   return () => clearTimeout(timeout);
  // }, [search]);

  //display all doctors

  // const fetchDoctors = async () => {
  // setLoading(true);
  //   const response = await axios.get("http://localhost:8080/doctors/listdoctors?page=${page}");
  //   if (response.data.length === 0){
  // setHasMore(false);
  // } else{
  // setDoctorList((prevList) => [...prevList, ...response.data]);
  // setPage((prevPage) => prevPage + 1);
  // }
  // setLoading(false);
  // };

  // const fetchDoctors = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.get(`http://localhost:8080/doctors/listdoctors?page=${page}`);
  //     console.log('API Response:', response.data);
  //     if (Array.isArray(response.data)) {
  //       setDoctorList((prevList) => [...prevList, ...response.data]);
  //       setPage((prevPage) => prevPage + 1);
  //     } else {
  //       console.error('API did not return an array:', response.data);
  //       setDoctorList([]); 
  //     }
  //   } catch (error) {
  //     console.error('Error fetching doctors:', error);
  //   }
  //   setLoading(false);
  // };

  // useEffect(() => {
  //   fetchDoctors();
  // }, []);

  // search doctor
  // useEffect(() => {
  //   if (searchTerm.trim() === "") {
  //     fetchDoctors();
  //   } else {
  //     const searchedDoctors = async () => {
  //       try {
  //         const response = await axios.get(
  //           `http://localhost:8080/doctors/searchdoctor?query=${searchTerm}`
  //         );
  //         setDoctorList(response.data);
  //         setHasMore(false);
  //       } catch (error) {
  //         console.error("Error fetching searched doctors:", error);
  //       }
  //     };

  //     const timeout = setTimeout(searchedDoctors, 500);
  //     return () => clearTimeout(timeout);
  //   }
  // }, [searchTerm]);

  //display all record(Infinite scroll)
  const fetchData = () => {
    setTimeout(() => {
      setDoctorList((prevList) => [...prevList, ...prevList]);
      if (doctorList.length >= 20) setHasMore(false);
    }, 1500);
  };

  //Filter function
  const filteredDoctors = doctorList.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (Array.isArray(doctor.skill) && doctor.skill.some((skill) =>
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      ))
  );

  const handleOnClose = () => setAppVisisble(false);

  return (
    <div>
      <DashHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {/* Doctor List Section */}
      <div className="pb-5 px-10 py-10">
        <InfiniteScroll
          dataLength={doctorList.length}
          next={fetchData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
        >
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-6 px-4 lg:px-14">
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-row items-center bg-white border rounded-lg shadow-lg hover:shadow-2xl duration-300 p-4"
                >
                  {/* doctor image */}
                  <div className="hidden sm:block">
                    <img
                      src={item.image}
                      className=" border w-30 h-30 object-cover rounded-3xl shadow-lg hover:scale-105 duration-300"
                    />
                  </div>

                  <div className="items-start pl-10 space-y-4">
                    {/* doctor name */}
                    <div className="text-2xl font-semibold text-gray-800 ">
                      {item.name}
                    </div>

                    {/* rating and consultation fee */}
                    <div className="flex gap-6">
                      <div className="flex items-center justify-center gap-2">
                        <div>
                          <FaStar />
                        </div>
                        <div className="text-gray-800">{item.rating}</div>
                        <div className="text-gray-600">67 reviews</div>
                      </div>

                      <div className="flex items-center justify-center gap-1">
                        <div>
                          <FaIndianRupeeSign />
                        </div>
                        <div className="font-semibold text-gray-800">
                          {item.fee}
                        </div>
                        <div className="text-gray-600">per consultation</div>
                      </div>
                    </div>

                    {/* doctor bio */}
                    <div className="text-sm text-gray-600 text-center mt-2">
                      {item.desc}
                    </div>

                    {/* doctor skills list */}
                    <div className=" flex flex-col  sm:flex-row gap-2 text-center text-gray-700 ">
                      {item.skill.map((skill, index) => (
                        <p
                          key={index}
                          className="border bg-slate-200 rounded-lg p-1"
                        >
                          {skill}
                        </p>
                      ))}
                    </div>

                    {/* book appointment button */}
                    <button
                      className="mt-4 bg-emerald-500 text-white items-center py-2 px-6 rounded-lg hover:bg-emerald-700 duration-300"
                      onClick={() => setAppVisisble(true)}
                    >
                      Book Appointment
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>no doctor found</p>
            )}
          </div>
        </InfiniteScroll>
      </div>
      <Appointment onClose={handleOnClose} visible={appVisible} />
    </div>
  );
};

export default BookAppointment;
