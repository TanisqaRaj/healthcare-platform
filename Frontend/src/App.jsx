
import './app.css';
import Home from './components/Pages/Home';
import {

  Route,

  Routes
} from "react-router-dom";



function App() {


  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/pharmacy' element={<pharmacy/>} />

    </Routes>
  );
}

export default App;

