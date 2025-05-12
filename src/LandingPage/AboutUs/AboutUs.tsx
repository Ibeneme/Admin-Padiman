import React from "react";
import "./AboutUs.css";
import whoImage from "../../assets/images/taxi.jpg";
import missionImage from "../../assets/images/parcel.jpg";
import visionImage from "../../assets/images/dispatch.jpg";

interface AboutUsProps {
  showCta?: boolean;
}

const AboutUs: React.FC<AboutUsProps> = () => {
  return (
    <section className="about-page">
      {/* Section A */}
      <div className="about-section">
        <div className="about-image">
          <img src={whoImage} alt="About Padiman Route" />
        </div>
        <div className="about-text">
          <h3 style={{ color: "#023009" }}>
            Get paid on your own journeys.
            <br />
            Pay less to travel anywhere.
            <br />
            Send parcels cheaper.
          </h3>
          <p style={{ fontSize: "1rem", marginBottom: "2rem" }}>
            We’re a mobile application connecting verified travellers with
            individuals looking to travel affordably or send parcels
            efficiently. Whether you’re a traveller with extra space in your car
            or someone in need of a cost-effective travel solution, Padiman
            Route has you covered.
          </p>
          <button
            style={{
              backgroundColor: "#8B25BE",
              color: "#fff",
              padding: "1rem 2rem",
              borderRadius: "8px",
              fontWeight: "bold",
              fontSize: "1rem",
              border: "none",
              marginBottom: "1rem",
            }}
          >
            Download App
          </button>
        </div>
      </div>

      {/* Section B - Mission */}
      <div className="about-section-reverse">
        <div className="about-text">
          <h3 style={{ color: "#fff" }}>Smarter Travel, Better Value</h3>
          <p style={{ color: "#fff" }}>
            • <strong>Earn While You Travel:</strong> Monetize empty seats and
            unused trunk space.
            <br /> <br />• <strong>Affordable Rides:</strong> Connect with
            budget-conscious riders and parcel senders.
            <br /> <br />• <strong>Trusted Network:</strong> All users are
            verified to ensure safety and accountability.
          </p>

          <div className="cta-container">
            <button
              className="cta-button"
              style={{
                padding: `24px 26px`,
                borderRadius: 48,
                border: "none",
                marginTop: 24,
                backgroundColor: "#000",
                color: "white",
                fontSize: 17,
              }}
            >
              Start Earning Now
            </button>
          </div>
        </div>
        <div className="about-image">
          <img src={missionImage} alt="Our Mission" />
        </div>
      </div>

      {/* Section C - Vision */}
      <div className="about-section">
        <div className="about-image">
          <img src={visionImage} alt="Our Vision" />
        </div>
        <div className="about-text">
          <h3 style={{ color: "#023009" }}>
            A Community-Driven Travel Solution
          </h3>
          <p>
            At Padiman Route, we envision a world where travel and parcel
            delivery are collaborative, cost-effective, and convenient for
            everyone. By harnessing the power of community, we’re redefining how
            people move and connect.
          </p>
          <p>
            Whether you’re a frequent traveller or just heading home, you can
            now make your trips more rewarding and impactful—every ride counts.
          </p>

          <div className="cta-container">
            <button
              className="cta-button"
              style={{
                padding: 16,
                borderRadius: 48,
                border: "none",
                marginTop: 16,
                backgroundColor: "#8B25BE",
                color: "white",
              }}
            >
              Join the Movement
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
