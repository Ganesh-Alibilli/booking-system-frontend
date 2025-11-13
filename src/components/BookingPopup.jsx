import React, { useState } from "react";
import App from "../App"; // This is your booking system (Home → Services → Review)

export default function BookingPopup() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {/* Button to open popup */}
      <button
        onClick={handleOpen}
        style={{
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          padding: "12px 24px",
          borderRadius: "8px",
          fontSize: "16px",
          cursor: "pointer",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#006ae0")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
      >
        Book Now
      </button>

      {/* Popup Modal */}
      {open && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.4)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            animation: "fadeBg 0.3s ease",
          }}
        >
          <div
            className="popup-content"
            style={{
              background: "#fff",
              width: "95%",
              maxWidth: "1000px",
              borderRadius: "12px",
              padding: "25px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
              position: "relative",
              maxHeight: "90vh",
              overflowY: "auto",
              animation: "popupSlideIn 0.35s ease",
            }}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              style={{
                position: "absolute",
                top: "10px",
                right: "15px",
                background: "transparent",
                border: "none",
                fontSize: "24px",
                cursor: "pointer",
                color: "#555",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#000")}
              onMouseLeave={(e) => (e.target.style.color = "#555")}
            >
              ✕
            </button>

            {/* The Booking System Inside Popup */}
            <App />
          </div>
        </div>
      )}

      {/* Inline Styles for Animations */}
      <style>
        {`
          @keyframes fadeBg {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes popupSlideIn {
            from {
              opacity: 0;
              transform: translateY(-15px) scale(0.97);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          /* Smooth Scroll inside popup */
          .popup-content::-webkit-scrollbar {
            width: 6px;
          }
          .popup-content::-webkit-scrollbar-thumb {
            background-color: rgba(0,0,0,0.2);
            border-radius: 3px;
          }
        `}
      </style>
    </div>
  );
}
