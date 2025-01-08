import About from "./components/pages/About";
// import Contact from './components/pages/Contact/Contact'
import "./app.css";
import Home from "./components/Pages/Home";
import Header from "./Pharmacy/Components/Header";
import Footer from "./Pharmacy/Components/Footer";
import Hero from "./Pharmacy/Components/hero/Hero";
import NavBar from "./Pharmacy/Components/NavBar";
// import About from './Pharmacy/Components/navbar/About';
import Services from "./Pharmacy/Components/navbar/Services";
import Contact from "./Pharmacy/Components/navbar/Contact";
import NotFound from "./Pharmacy/Components/navbar/NotFound";
// import Login from './Pharmacy/Login';
import Login from "./components/Login";
import Carousel from "./Pharmacy/Components/hero/Carousel";
import TermsAndCond from "./Pharmacy/Components/hero/footer/TermsAndCond";
import HelpCenter from "./Pharmacy/Components/hero/footer/HelpCenter";
import Registration from "./components/Registration";
import Landing from "./Landing";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PrivacyPolicy from "./Pharmacy/Components/hero/footer/PrivacyPolicy";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <Landing />
          {/* <NavBar/>
            <Header/>
            <Home/>
            <Footer/> */}
        </div>
      ),
    },
    {
      path: "/about",
      element: (
        <div>
          <NavBar />
          <Header />
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
          <Header />
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
          <Header />
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
      element: <Login />,
    },
    {
      path: "/registration",
      element: <Registration />,
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
      path: "/*",
      element: <NotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
