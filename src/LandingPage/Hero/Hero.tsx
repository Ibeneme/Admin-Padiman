import React from "react";
import "./Hero.css";
import heroImg from "../../assets/images/rider.jpg";

const Hero: React.FC = () => {
  return (
    <div
      className="hero"
      style={{
        backgroundImage: `url(${heroImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        // width: "100vw",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        // padding: "1rem",
        color: "#fff",
        textAlign: "center",
      }}
    >
      <div className="hero-content" style={{}}>
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          Get paid on your own journeys.
          <br />
          Pay less to travel anywhere.
          <br />
          Send parcels cheaper.
        </h1>
        <p style={{ fontSize: "1rem", marginBottom: "2rem" }}>
          We’re a mobile application connecting verified travellers with
          individuals looking to travel affordably or send parcels efficiently.
          Whether you’re a traveller with extra space in your car or someone in
          need of a cost-effective travel solution, Padiman Route has you
          covered.
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

        {/* <div
          style={{
            fontSize: "0.9rem",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          Contact An Agent &gt;
        </div> */}
      </div>
    </div>
  );
};

export default Hero;
