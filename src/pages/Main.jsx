import React from "react";
import BookingPopup from "../components/BookingPopup";

export default function Main() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8fbff",
        fontFamily: "'Poppins', sans-serif",
        color: "#222",
        textAlign: "center",
        margin: 0,
        padding: 0,
        overflow: "hidden",
      }}
    >
      <style>
        {`
          * {
            box-sizing: border-box;
          }
          html, body {
            margin: 0;
            padding: 0;
          }
          h1 {
            font-size: 2.3rem;
            font-weight: 600;
            color: #111;
            margin-bottom: 10px;
          }
          p {
            font-size: 1rem;
            color: #555;
            margin-bottom: 25px;
          }
        `}
      </style>

      <div
        style={{
          background: "#fff",
          padding: "45px 60px",
          borderRadius: "12px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
          width: "90%",
          maxWidth: "750px",
          textAlign: "center",
        }}
      >
        <h1>Welcome to Our Booking System</h1>
        <p>Click below to book a service</p>
        <BookingPopup />
      </div>

      <footer
        style={{
          position: "fixed",
          bottom: "15px",
          fontSize: "13px",
          color: "#888",
          textAlign: "center",
        }}
      >
        © {new Date().getFullYear()} Service Booking Portal · SDG Solutions
      </footer>
    </div>
  );
}
