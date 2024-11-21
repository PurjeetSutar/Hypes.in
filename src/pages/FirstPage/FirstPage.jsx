import React from "react";
import "./FirstPage.css"; // Add CSS for styling
import { useNavigate } from "react-router-dom";

const FirstPage = () => {
  const navigate = useNavigate();

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="FirstPage">
      {/* Navigation Bar */}
      <div className="Login-button">
        <button onClick={() => navigate("/LoginPage")}>Login / Signup</button>
      </div>

      {/* Navigation Bar */}
      <div className="home-button">
        <button onClick={() => scrollToSection("HomeSection")}>
  <img src="Logo 2.png" alt="Logo" style={{ width: "35px", height: "35px" }} />
</button>
      </div>

      
      <div className="navibar"> 
      <div className="about-button">

        <button onClick={() => scrollToSection("aboutSection")}>About</button>
        </div>

        <div className="feature-button">
        <button onClick={() => scrollToSection("featuresSection")}>Features</button>
      </div>
      </div>

      {/* Home Section */}
      <div id="HomeSection" className="section">
      {/* Video Background */}
      <video className="background-video" autoPlay loop muted>
        <source src="Hypes.in.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      </div>

      {/* About Section */}
      <div id="aboutSection" className="section">
      <div className="text-section">
        <h2>Welcome to Hypes.in</h2>
        <p>
          At Hypes.in, we believe every great idea deserves a platform to
          thrive. Designed exclusively for startups, entrepreneurs, and
          visionaries, Hypes.in is where innovation meets opportunity.  
          Our mission is simple: to create a dynamic ecosystem where startups 
          gain visibility, secure funding, and build lasting connections.  
        </p>
        <p>
          Join a community that celebrates innovation, fosters collaboration, 
          and drives growth. Start your journey today, pitch your ideas, and 
          shape the future one step at a time.
        </p>
        </div>
      </div>

      {/* Features Section */}
      <div id="featuresSection" className="section">
      <div className="text-section">
      <h2>What Hypes.in Brings to Your Startup Journey</h2>
        <p>
          <li><strong>Gain Visibility:</strong> Showcase your business to a community eager to support innovation.</li>
          <li><strong>Secure Funding:</strong> Connect with investors, crowd-funders, and mentors to access capital.</li>
          <li><strong>Collaborate and Network:</strong> Build meaningful connections with like-minded entrepreneurs.</li>
          <li><strong>Access Expert Guidance:</strong> Learn from seasoned mentors and gain insights to overcome challenges.</li>
          <li><strong>Leverage Data and Insights:</strong> Stay informed with market statistics and benchmarks.</li>
          <li><strong>Test and Improve Products:</strong> Gather real-time feedback from a supportive community.</li>
          <li><strong>Foster Skill Development:</strong> Access workshops and resources to sharpen your edge.</li>
        </p>
        </div>
      </div>
    </div>
  );
};

export default FirstPage;
