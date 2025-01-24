import "./app.css";
import About from "./components/pages/About";
import Header from "./Pharmacy/Components/Header";
import Footer from "./Pharmacy/Components/Footer";
import Hero from "./Pharmacy/Components/hero/Hero";
import NavBar from "./Pharmacy/Components/NavBar";
import Services from "./Pharmacy/Components/navbar/Services";
import Contact from "./components/pages/Contact/Contact";
import NotFound from "./Pharmacy/Components/navbar/NotFound";
import Carousel from "./Pharmacy/Components/hero/Carousel";
import TermsAndCond from "./Pharmacy/Components/hero/footer/TermsAndCond";
import HelpCenter from "./Pharmacy/Components/hero/footer/HelpCenter";
import Registration from "./components/Registration";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivacyPolicy from "./Pharmacy/Components/hero/footer/PrivacyPolicy";
import Landing from "./Landing";
import Login from "./components/Login";
import Sidebar from "./components/dashboard/Sidebar";
import Content from "./components/dashboard/Content";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <Landing />
          <Footer />
        </div>
      ),
    },
    {
      path: "/about",
      element: (
        <div>
          <NavBar />
          {/* <Header /> */}
          <About />
          <Footer />
        </div>
      ),
    },
    {
      path: "/services",
      element: (
        <div>
          <NavBar />
          <Services />
          <Footer />
        </div>
      ),
    },
    {
      path: "/contact",
      element: (
        <div>
          <NavBar />
          <Contact />
          <Footer />
        </div>
      ),
    },
    {
      path: "/pharmacy",
      element: (
        <div>
          <NavBar />
          <Header />
          <Carousel />
          <Hero />
          <Footer />
        </div>
      ),
    },
    {
      path: "/login",
      element: (
        <div>
          <NavBar />
          <Login />,
          <Footer />
        </div>
      ),
    },
    {
      path: "/registration",
      element: (
        <div>
          <NavBar />
          <Registration />,
          <Footer />
        </div>
      ),
    },
    {
      path: "/terms",
      element: (
        <div>
          <NavBar />
          <TermsAndCond />
          <Footer />
        </div>
      ),
    },
    {
      path: "/privacypolicy",
      element: (
        <div>
          <NavBar />
          <Carousel />
          <PrivacyPolicy />
          <Footer />
        </div>
      ),
    },
    {
      path: "/helpcenter",
      element: (
        <div>
          <NavBar />
          <HelpCenter />
          <Footer />
        </div>
      ),
    },
    {
      path: "/dashboard",
      element: (
        <div>
          <NavBar />
          <div className="flex">
            <Sidebar />
            <Content />
          </div>
          <Footer />
        </div>
      ),
    },
    {
      path: "/*",
      element: <NotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
