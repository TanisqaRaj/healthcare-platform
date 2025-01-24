import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Logo from "./assets/images/logo2.jpg";
import { RiArrowDropDownLine } from "react-icons/ri";

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

  return (
    <div className="w-[100vw] m-0 p-0">
      <title>Doctor Appointment</title>

      {/* Landing Header */}
      <header className="bg-white shadow-md w-[100vw] sticky top-0 z-50">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          {/* Logo Section */}
          <div className="flex items-center">
            <img
              alt="Logo"
              className="h-10"
              height={150}
              src={Logo}
              width={50}
            />
          </div>
          {/* Navigation Bar */}
          <nav className="flex-grow flex justify-center space-x-6">
            <a className="text-gray-700 hover:text-teal-600" href="/">
              Home
            </a>
            <a className="text-gray-700 hover:text-teal-600" href="/about">
              About
            </a>
            <div className="relative">
              <div
                className="flex items-center cursor-pointer text-gray-700 hover:text-teal-600"
                onClick={toggleDropdown}
              >
                <a>Services</a>
                <RiArrowDropDownLine className="ml-1" />
              </div>

              {isOpen && (
                <div className="absolute mt-2 bg-white border rounded shadow-lg w-48 z-10">
                  <ul className="py-2">
                    <li className="px-4 py-2 hover:bg-teal-100">
                      <a href="/appointment">Appointment</a>
                    </li>
                    <li className="px-4 py-2 hover:bg-teal-100">
                      <a href="/pharmacy">Pharmacy</a>
                    </li>
                    <li className="px-4 py-2 hover:bg-teal-100">
                      <a href="/chatbot">Chatbot</a>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <a className="text-gray-700 hover:text-teal-600" href="/contact">
              Contact
            </a>
            <a className="text-gray-700 hover:text-teal-600" href="/pharmacy">
              Pharmacy
            </a>
          </nav>
          {/* Login/Register Section */}
          <div className="flex items-center space-x-4">
            <a className="text-gray-700 hover:text-teal-600" href="/login">
              Login
            </a>
            <a
              className="text-gray-700 hover:text-teal-600"
              href="/registration"
            >
              Register
            </a>
          </div>
        </div>
      </header>

      {/* Landing Hero Section */}
      <section
        className="bg-teal-600 w-[100vw] h-[100vh] text-white py-20"
        data-aos="fade-up"
      >
        <div className="container mx-auto flex flex-col md:flex-row items-center">
          <div className="md:w-1/2">
            <h1 className="text-4xl font-bold mb-4">
              Doctor Appointment Booking
            </h1>
            <p className="mb-6">
              Book your appointment with our experienced doctors. Get the best
              healthcare services at your convenience.
            </p>
            <a
              className="bg-white text-teal-600 px-6 py-2 rounded-full font-semibold"
              href="/dashboard"
            >
              Book Appointment
            </a>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0 flex justify-end h-[80vh]">
            <img
              alt="Doctor"
              className="rounded-lg shadow-lg"
              src="https://images.unsplash.com/photo-1550831107-1553da8c8464?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGRvY3RvcnxlbnwwfHx8fDE2NjU2NjY2NzA&ixlib=rb-1.2.1&q=80&w=1080"
              width={500}
            />
          </div>
        </div>
      </section>

      {/* Landing Services Section */}
      <section className="py-20 w-[100vw]">
        <div className="container mx-auto">
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
            <div className="md:w-1/2 md:pl-10 mt-10 md:mt-0">
              <h2 className="text-3xl font-bold mb-4">
                Pro Doctor Pharmacy Services
              </h2>
              <p className="mb-6">
                Get professional pharmacy services from our experienced staff.
                We ensure the best care for your health needs.
              </p>
              <a
                className="bg-teal-600 text-white px-6 py-2 rounded-full font-semibold"
                href="/pharmacy-services"
              >
                Learn More
              </a>
            </div>
          </div>
          <div
            className="flex flex-col md:flex-row items-center"
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
                className="bg-teal-600 text-white px-6 py-2 rounded-full font-semibold"
                href="/medication-usage"
              >
                Learn More
              </a>
            </div>
            <div className="md:w-1/2 mt-10 md:mt-0">
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
        className="bg-gray-200 py-20 w-[100vw] h-[100vh]"
        data-aos="zoom-in "
      >
        <div className="container mx-auto text-center ">
          <h2 className="text-3xl font-bold mb-4">
            Doctor Pharmacy Reservation
          </h2>
          <p className="mb-6">
            Reserve your spot with our expert doctors. Get the best healthcare
            services at your convenience.
          </p>
          <a
            className="bg-teal-600 text-white px-6 py-2 rounded-full font-semibold"
            href="/reserve"
          >
            Reserve Now
          </a>
          <div className="mt-10 ">
            <img
              alt="Doctor Video"
              className="rounded-lg shadow-lg mx-auto h-[80vh]"
              src="https://storage.googleapis.com/a1aa/image/mfx3ThaRELQaFi4RJppZNyeTXCwIuKg0vdbLN9yxuuYqmHfnA.jpg"
              width={800}
            />
          </div>
        </div>
      </section>

      {/* Landing Health Tips Section */}
      <section className="py-20 w-[100vw] h-[100vh]">
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
