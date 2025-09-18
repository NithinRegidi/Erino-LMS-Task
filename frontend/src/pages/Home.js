

import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import '../pages/styles/Home.css';

function Home() {
  const { user } = useContext(AuthContext);
  const ctaLink = user ? "/leads" : "/register";
  const ctaText = user ? "Go to Dashboard" : "Get Started for Free";

  return (
    <div className="home-hero">
      <div className="home-content">
        <h1 className="home-title">
          Manage Your Leads, <span className="home-highlight">Effortlessly</span>.
        </h1>
        <p className="home-subtitle">
          Erino LMS is the all-in-one platform to track, manage, and convert your leads into valuable customers.
        </p>
        <ul className="home-feature-list">
          <li className="home-feature-item"><span className="home-check">✓</span> Centralized lead dashboard</li>
          <li className="home-feature-item"><span className="home-check">✓</span> Advanced filtering and search</li>
          <li className="home-feature-item"><span className="home-check">✓</span> Secure user authentication</li>
          <li className="home-feature-item"><span className="home-check">✓</span> Seamless data import/export</li>
        </ul>
        <Link to={ctaLink} className="home-cta-button">
          {ctaText}
        </Link>
      </div>

      <div className="home-image-wrapper">
        <img
          src="/images/lead2.jpg"
            alt="Lead Management Dashboard"
          className="home-image"
        />
      </div>
    </div>
  );
}

export default Home;