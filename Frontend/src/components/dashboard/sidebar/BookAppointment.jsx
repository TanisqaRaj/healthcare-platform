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
  // const [searchTerm, setSearchTerm] = useState("");
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

  //Count Total doctor
  const fetchTotalDoctors = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/doctors/totaldoctors"
      );

      const success = response?.data?.success;
      if (success) {
        const total = response.data.totalDoctors;
        setTotalDoctors(total);

        if (total > 0) {
          await fetchInitialData();
        }
      } else {
        alert("something went wrong");
      }
    } catch (error) {
      console.error("error is", error);
    }
  };

  useEffect(() => {
    filterDoctors();
  }, [searchTerm]);

  const fetchInitialData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/doctors/listdoctors?page=0&limit=10"
      );
      const success = response?.data?.success;
      if (success) {
        setVisibleDoctors(response.data.doctors);
        setPage((prev) => prev + 1);
      } else {
        alert("something went wrong");
      }
    } catch (error) {
      console.error("error is", error);
    }
  };

  //Display all doctor list
  const fetchData = async () => {
    if (visibleDoctors.length >= totalDoctors) {
      setHasMore(false);
      return;
    }
    try {
      let url = `http://localhost:8080/doctors/listdoctors?page=${page}&limit=10`;
      if (visibleDoctors.length > 0) {
        const lastDoctor = visibleDoctors[visibleDoctors.length - 1];
        url = `http://localhost:8080/doctors/listdoctors?page=${page}&limit=10&lastId=${lastDoctor._id}`;
      }

      const response = await axios.get(url);
      let success = response?.data?.success;
      if (success) {
        setVisibleDoctors((prev) => [...prev, ...response.data.doctors]);
        setPage((prev) => prev + 1);
      } else {
        alert("something went wrong");
      }
    } catch (error) {
      console.error("error is", error);
    }
  };

  const handleOnClose = () => setAppVisible(false);

  return (
    <div>
      <DashHeader setFilteredDoctors={setFilteredDoctors}/>
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
                       src={`data:image/png;base64,${item?.image}`}
                       style={{ height: "250px", width: "350px", objectFit: "cover" }}
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
                      src={`data:image/png;base64,${item?.image}`}
                      style={{ height: "250px", width: "350px", objectFit: "cover" }}
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
