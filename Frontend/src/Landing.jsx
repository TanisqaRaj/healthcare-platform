import { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import doctor from "./assets/images/doctorsGrpPic.png";
import doctors from './assets/images/Doctors.png.png'
import CountUp from "react-countup";

const Landing = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const [totalDoctors, setTotalDoctors] = useState(0);
  const [totalUsers, setTotalusers] = useState(0);

  const fetchTotalUsers = async () => {
    try {
      const response = await axios.get(
        "https://healthcare-platform-server.vercel.app/doctors/totalusers"
      );
      const success = response?.data?.success;

      if (success) {
        const total = response.data.totalUsers;
        setTotalusers(total);
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error("❌ Error fetching total doctors:", error);
    }
  };

  const fetchTotalDoctors = async () => {
    try {
      const response = await axios.get(
        "https://healthcare-platform-server.vercel.app/doctors/totaldoctors"
      );
      const success = response?.data?.success;

      if (success) {
        const total = response.data.totalDoctors;
        setTotalDoctors(total);
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error("❌ Error fetching total doctors:", error);
    }
  };

  useEffect(() => {
    fetchTotalUsers();
    fetchTotalDoctors();
    
  }, []);

  return (
    <div className="w-full m-0 p-0 overflow-hidden">
      <title>Doctor Appointment</title>

      {/* Landing Hero Section */}
      <section
        className="bg-emerald-700 w-full min-h-screen text-white py-20"
        data-aos="fade-up"
      >
        <div className="container mx-auto flex flex-col md:flex-row items-center p-4">
          <div className="md:w-1/2">
            <h1 className="text-4xl font-bold mb-4">
              Doctor Appointment Booking
            </h1>
            <p className="mb-6">
              Book your appointment with our experienced doctors. Get the best
              healthcare services at your convenience.
            </p>
            <a
              className="bg-white text-emerald-600 px-6 py-2 rounded-full font-semibold"
              href="/login"
            >
              Book Appointment
            </a>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0 flex justify-end h-[80vh]">
            <img
              alt="Doctor"
              // className="rounded-lg shadow-lg"
              src={doctor}
              // src="https://images.unsplash.com/photo-1550831107-1553da8c8464?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGRvY3RvcnxlbnwwfHx8fDE2NjU2NjY2NzA&ixlib=rb-1.2.1&q=80&w=1080"
              width={500}
            />
          </div>
        </div>
      </section>

      {/* Total registered doctors */}
      <div
        className="flex flex-col md:flex-row items-center mb-10 p-8 mr-8"
        data-aos="fade-right"
      >
        <div className="md:w-1/2">
          <img
            alt="Doctor and Patient"
            className="rounded-lg shadow-lg"
            height={300}
            src={doctors}
            // src="https://storage.googleapis.com/a1aa/image/buWFEDMxXxIfWqRLRKURPIjw9eej0uj94p012ovfpS4iae4fE.jpg"
            width={500}
          />
        </div>
        <div className="md:w-1/2 md:pl-10 mt-10 md:mt-0 p-4 text-center">
          <h2 className="text-3xl font-bold">Trusted by Millions Globally</h2>
          <div>
            Explore the essential metrics that showcase our platform's trust,
            quality, and commitment to healthcare excellence.
          </div>
          <div className="flex justify-between p-6 py-10 pl-16 pr-16 border rounded-2xl shadow-2xl mt-6 space-x-24 ">
            <div className="font-sm text-4xl  w-full border p-10 bg-emerald-50 rounded-2xl shadow-md  hover:bg-emerald-100 duration-400">
              <div className="font-semibold">
                <CountUp end={totalDoctors} duration={4} />+
              </div>
              <div className="text-sm font-medium">Registered Doctors</div>
            </div>
            <div className="font-sm text-4xl  w-full border p-11 bg-emerald-100 rounded-2xl shadow-md hover:bg-emerald-200 duration-400">
              <div className="font-semibold">
                <CountUp end={totalUsers} duration={4} />+
              </div>
              <div className="text-sm font-medium">Registered Users</div>
            </div>
          </div>
        </div>
      </div>

      {/* Landing Services Section */}
      <section className="py-20 px-4 w-full">
        <div className="container mx-auto mr-0 justify-between">
          <div
            className="flex flex-col md:flex-row items-center mb-10"
            data-aos="fade-right"
          >
            <div className="md:w-1/2">
              <img
                alt="Doctor and Patient"
                className="rounded-lg shadow-lg"
                height={300}
                src="https://storage.googleapis.com/a1aa/image/buWFEDMxXxIfWqRLRKURPIjw9eej0uj94p012ovfpS4iae4fE.jpg"
                width={500}
              />
            </div>
            <div className="md:w-1/2 md:pl-10 mt-10 md:mt-0 p-4">
              <h2 className="text-3xl font-bold mb-4">
                Pro Doctor Pharmacy Services
              </h2>
              <p className="mb-6">
                Get professional pharmacy services from our experienced staff.
                We ensure the best care for your health needs.
              </p>
              <a
                className="bg-emerald-600 text-white px-6 py-2 rounded-full font-semibold"
                href="/pharmacy-services"
              >
                Learn More
              </a>
            </div>
          </div>
          <div
            className="flex flex-col md:flex-row items-center ml-8"
            data-aos="fade-left"
          >
            <div className="md:w-1/2 md:pr-10">
              <h2 className="text-3xl font-bold mb-4">
                Basic Safety Medication Usages
              </h2>
              <p className="mb-6">
                Learn about the safe usage of medications. Our experts provide
                the best tips and guidelines for your safety.
              </p>
              <a
                className="bg-emerald-600 text-white px-6 py-2 rounded-full font-semibold"
                href="/medication-usage"
              >
                Learn More
              </a>
            </div>
            <div className="md:w-1/2 mt-10 md:mt-0 p-4 items-end">
              <img
                alt="Medication"
                className="rounded-lg shadow-lg"
                height={300}
                src="https://storage.googleapis.com/a1aa/image/6Qgf5o3nTI2fmUNDlVYjG7jsJKfndHLAJjLHOlfUMNg8ae4fE.jpg"
                width={500}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Landing Video Section */}
  <section
  className="bg-gray-200 py-20 w-[100vw] min-h-screen"
  data-aos="zoom-in"
>
  <div className="container mx-auto text-center">
    <h2 className="text-3xl font-bold mb-4">
      Doctor Pharmacy Reservation
    </h2>
    <p className="mb-6">
      Reserve your spot with our expert doctors. Get the best healthcare
      services at your convenience.
    </p>
    <a
      className="bg-emerald-600 text-white px-6 py-2 rounded-full font-semibold"
      href="/login"
    >
      Reserve Now
    </a>

    {/* Embedded YouTube Video */}
    <div className="mt-10 max-w-4xl mx-auto">
      <iframe
        className="rounded-lg shadow-lg w-full h-[60vh]"
        width="560"
        height="315"
        src="https://www.youtube.com/embed/74DWwSxsVSs?si=u72BmFp_AZdDeydO"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  </div>
</section>



      {/* Landing Health Tips Section */}
      <section className="py-20 w-[100vw] min-h-screen px-8">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">
            Basic Safety Medication Usages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div
              className="bg-white p-6 rounded-lg shadow-lg"
              data-aos="fade-up"
            >
              <img
                alt="Health Tip 1"
                className="rounded-lg mb-4"
                height={200}
                src="https://storage.googleapis.com/a1aa/image/6L2UhYwK4HI1JVepl0dQ3HR3Xc1mi8DWgUQQcSvl9UNZzjfTA.jpg"
                width={300}
              />
              <h3 className="text-xl font-bold mb-2">Health Tip 1</h3>
              <p>
                Learn about the best practices for maintaining your health and
                well-being.
              </p>
            </div>
            <div
              className="bg-white p-6 rounded-lg shadow-lg"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <img
                alt="Health Tip 2"
                className="rounded-lg mb-4"
                height={200}
                src="https://storage.googleapis.com/a1aa/image/LeUy9mmJnS33KC2JOV3mtC829bnGJkXDzKDb8sUeQhstmHfnA.jpg"
                width={300}
              />
              <h3 className="text-xl font-bold mb-2">Health Tip 2</h3>
              <p>
                Discover the latest tips and advice from our healthcare experts.
              </p>
            </div>
            <div
              className="bg-white p-6 rounded-lg shadow-lg"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <img
                alt="Health Tip 3"
                className="rounded-lg mb-4"
                height={200}
                src="https://storage.googleapis.com/a1aa/image/kNs5YkmtMCYcFFxWDgsT7A4zudhyazFSuNYBlE04YeIazjfTA.jpg"
                width={300}
              />
              <h3 className="text-xl font-bold mb-2">Health Tip 3</h3>
              <p>
                Stay informed with the most recent health and wellness
                information.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
