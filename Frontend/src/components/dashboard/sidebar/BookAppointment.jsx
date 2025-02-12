import React, { useEffect, useState } from "react";
import DashHeader from "../DashHeader";
import Appointment from "./Appointment";
import { FaStar } from "react-icons/fa";
import { FaIndianRupeeSign } from "react-icons/fa6";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";

const BookAppointment = () => {
  const [appVisible, setAppVisible] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleDoctors, setVisibleDoctors] = useState([]);
  const [page, setPage] = useState(0);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [totalDoctors, setTotalDoctors] = useState([]);

  // const doctorList = Array.from({ length: 100 }, (_, index) => ({
  //   name: `Doctor ${index + 1}`,
  //   image: `https://dummyimage.com/200x200/000/fff&text=Doc+${index + 1}`,
  //   bio: `Experienced doctor specializing in field number ${
  //     index + 1
  //   }. Highly recommended by patients for excellent care and expertise.`,
  //   profession: ["specialist", "consultant", "surgeon"],
  //   fee: `${Math.floor(Math.random() * 500) + 300}`,
  //   rating: (Math.random() * (5 - 3.5) + 3.5).toFixed(1),
  // }));

  useEffect(() => {
    fetchTotalDoctors();
  }, []);

  useEffect(() => {
    if (totalDoctors > 0) {
      fetchData();
    }
  }, [totalDoctors]);

  useEffect(() => {
    filterDoctors();
  }, [searchTerm]);

  //Count Total doctor
  const fetchTotalDoctors = async () => {
    const response = await axios.get(
      "http://localhost:8080/doctors/totaldoctors"
    );
    if (response.data.success) {
      console.log("response is", response.data.totalDoctors);
      setTotalDoctors(response.data.totalDoctors);
      // await fetchData();
    } else {
      alert("somthing went wrong");
    }
  };

  //Display all doctor list
  // const fetchData = () => {
  //   if (visibleDoctors.length >= doctorList.length) {
  //     setHasMore(false);
  //     return;
  //   }
  //   setTimeout(() => {
  //     const newDoctors = doctorList.slice(page, page + 2);
  //     setVisibleDoctors((prev) => [...prev, ...newDoctors]);
  //     setPage((prev) => prev + 2);
  //   }, 2000);
  // };

  const fetchData = async () => {
    console.log(totalDoctors)
    console.log(hasMore)
    console.log("fetch data called")
    if (visibleDoctors.length >= totalDoctors) {
      setHasMore(false);
      return;
    }
    try {
      let url=`http://localhost:8080/doctors/listdoctors?page=${page}&limit=10`
      if(visibleDoctors.length>0){
        const lastDoctor=visibleDoctors[visibleDoctors.length-1]
        url=`http://localhost:8080/doctors/listdoctors?page=${page}&limit=10&lastId=${lastDoctor._id}`
      }
      
      const response = await axios.get(
        url
      );
      if (response.data.success) {
        setVisibleDoctors((prev) => [...prev, ...response.data.doctors]);
        setPage((prev) => prev + 1);
      } else {
        alert("something went wrong");
      }
    } catch (error) {
      console.error("error is", error);
    }
  };

  const fetchNextDoctors = () => {
    fetchData();
  };

  //Search Function
  // const filterDoctors = () => {
  //   if (searchTerm !== "") {
  //     setFilteredDoctors(
  //       doctorList.filter(
  //         (doctor) =>
  //           searchTerm !== "" &&
  //           (doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //             (Array.isArray(doctor.profession) &&
  //               doctor.profession.some((profession) =>
  //                 profession.toLowerCase().includes(searchTerm.toLowerCase())
  //               )))
  //       )
  //     );
  //   } else {
  //     setFilteredDoctors([]);
  //   }
  // };

  const filterDoctors = async () => {
    const response = await axios.get(
      `http://localhost:8080/doctors/searchdoctor?query=${searchTerm}`
    );
    if (response.data.success) {
      setFilteredDoctors(response.data.doctors);
      setHasMore(false);
    } else {
      alert("something went wrong");
    }
  };

  const handleOnClose = () => setAppVisible(false);

  return (
    <div>
      <DashHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="pb-5 px-10 py-10">
        <InfiniteScroll
          dataLength={visibleDoctors.length}
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
                  <div className="hidden sm:block">
                    <img
                      src={item.image}
                      className="border w-30 h-30 object-cover rounded-3xl shadow-lg hover:scale-105 duration-300"
                    />
                  </div>
                  <div className="items-start pl-10 space-y-4">
                    <div className="text-2xl font-semibold text-gray-800 ">
                      {item.name}
                    </div>
                    <div className="flex gap-6">
                      <div className="flex items-center justify-center gap-2">
                        <FaStar />
                        <div className="text-gray-800">{item.rating}</div>
                        <div className="text-gray-600">67 reviews</div>
                      </div>
                      <div className="flex items-center justify-center gap-1">
                        <FaIndianRupeeSign />
                        <div className="font-semibold text-gray-800">
                          {item.fee}
                        </div>
                        <div className="text-gray-600">per consultation</div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 text-center mt-2">
                      {item.bio}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 text-center text-gray-700">
                      {item.profession.map((profession, index) => (
                        <p
                          key={index}
                          className="border bg-slate-200 rounded-lg p-1"
                        >
                          {profession}
                        </p>
                      ))}
                    </div>
                    <button
                      className="mt-4 bg-emerald-500 text-white items-center py-2 px-6 rounded-lg hover:bg-emerald-700 duration-300"
                      onClick={() => setAppVisible(true)}
                    >
                      Book Appointment
                    </button>
                  </div>
                </div>
              ))
            ) : visibleDoctors.length > 0 ? (
              visibleDoctors.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-row items-center bg-white border rounded-lg shadow-lg hover:shadow-2xl duration-300 p-4"
                >
                  <div className="hidden sm:block">
                    <img
                      src={item.image}
                      className="border w-30 h-30 object-cover rounded-3xl shadow-lg hover:scale-105 duration-300"
                    />
                  </div>
                  <div className="items-start pl-10 space-y-4">
                    <div className="text-2xl font-semibold text-gray-800 ">
                      {item.name}
                    </div>
                    <div className="flex gap-6">
                      <div className="flex items-center justify-center gap-2">
                        <FaStar />
                        <div className="text-gray-800">{item.rating}</div>
                        <div className="text-gray-600">67 reviews</div>
                      </div>
                      <div className="flex items-center justify-center gap-1">
                        <FaIndianRupeeSign />
                        <div className="font-semibold text-gray-800">
                          {item.fee}
                        </div>
                        <div className="text-gray-600">per consultation</div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 text-center mt-2">
                      {item.bio}
                    </div>
                    <div className="flex flex-col sm:flex-row gap-2 text-center text-gray-700">
                      {item.profession.map((profession, index) => (
                        <p
                          key={index}
                          className="border bg-slate-200 rounded-lg p-1"
                        >
                          {profession}
                        </p>
                      ))}
                    </div>
                    <button
                      className="mt-4 bg-emerald-500 text-white items-center py-2 px-6 rounded-lg hover:bg-emerald-700 duration-300"
                      onClick={() => setAppVisible(true)}
                    >
                      Book Appointment
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No doctors found</p>
            )}
          </div>
        </InfiniteScroll>
      </div>
      <Appointment onClose={handleOnClose} visible={appVisible} />
    </div>
  );
};

export default BookAppointment;
