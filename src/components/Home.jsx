import React, { useState } from "react";

export default function Home({ onNext }) {
  const [selected, setSelected] = useState(null);

  const handleClick = (type) => {
    setSelected(type);
    onNext(type);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2 style={{ fontSize: "22px", marginBottom: "20px" }}>
        Choose Booking Type
      </h2>

      <div style={{ display: "inline-flex", gap: "15px" }}>
        {["service", "consultation"].map((type) => (
          <button
            key={type}
            onClick={() => handleClick(type)}
            onMouseEnter={(e) => {
              if (selected !== type)
                e.currentTarget.style.backgroundColor = "#007bff";
              if (selected !== type)
                e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              if (selected !== type)
                e.currentTarget.style.backgroundColor = "white";
              if (selected !== type)
                e.currentTarget.style.color = "#007bff";
            }}
            style={{
              padding: "10px 20px",
              borderRadius: "6px",
              border: "1.5px solid #007bff",
              backgroundColor:
                selected === type ? "#007bff" : "white",
              color: selected === type ? "white" : "#007bff",
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.25s ease",
            }}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}
