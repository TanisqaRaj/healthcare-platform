// src/ThankYou.jsx

import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './ThankYou.css'; // Import the CSS file

const ThankYou = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleGoHome = () => {
    navigate('/'); // Navigate to the home page
  };

  return (
    <div className="content">
      <div className="wrapper-1">
        <div className="wrapper-2">
          <h1>Thank you!</h1>
          <p>Thanks for contacting us. We will notify you with details as soon as possible.</p>
          <p>You should receive a confirmation email soon.</p>
          <button className="go-home" onClick={handleGoHome}>
            Go Home
          </button>
        </div>
        <div className="footer-like">
          <p>
            Email not received? <a href="#">Click here to send again</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
