import React, { useState } from "react";

export default function ReviewSubmit({ data, setUser, onBack }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    const payload = {
      serviceId: data.service.ID,
      serviceType: data.service.Type,
      serviceTitle: data.service.Title,
      date: data.slot.date,
      startTime: data.slot.startTime,
      endTime: data.slot.endTime,
      user: {
        name: data.user.name,
        email: data.user.email,
        phone: data.user.phone,
      },
    };

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const resp = await res.json();

      if (resp.ok) {
        setSuccess(true);
      } else {
        console.error(resp);
        setError("Failed to create booking. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Error connecting to server.");
    }

    setLoading(false);
  };

  if (success) {
    return (
      <div style={{ padding: "20px" }}>
        <h2 style={{ color: "#007bff" }}>✅ Booking Confirmed!</h2>
        <p>
          Thank you, <b>{data.user.name}</b>. Your booking for{" "}
          <b>{data.service.Title}</b> on <b>{data.slot.date}</b> at{" "}
          <b>{data.slot.startTime}</b> is confirmed.
        </p>
        <p>
          A confirmation email has been sent to <b>{data.user.email}</b>.
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "15px" }}>Review & Submit</h2>

      <div style={{ marginBottom: "20px" }}>
        <p>
          <b>Service:</b> {data.service.Title} ({data.service.Type})
        </p>
        <p>
          <b>Date:</b> {data.slot.date}
        </p>
        <p>
          <b>Time:</b> {data.slot.startTime} - {data.slot.endTime}
        </p>
      </div>

      {/* Label and input beside each other */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          maxWidth: "500px",
        }}
      >
        {/* Name */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <label style={{ width: "100px", fontWeight: 500 }}>Name:</label>
          <input
            type="text"
            value={data.user.name}
            onChange={(e) =>
              setUser({ ...data.user, name: e.target.value })
            }
            placeholder="Enter your name"
            style={{
              flex: 1,
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        {/* Email */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <label style={{ width: "100px", fontWeight: 500 }}>Email:</label>
          <input
            type="email"
            value={data.user.email}
            onChange={(e) =>
              setUser({ ...data.user, email: e.target.value })
            }
            placeholder="Enter your email"
            style={{
              flex: 1,
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        {/* Phone */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <label style={{ width: "100px", fontWeight: 500 }}>Phone:</label>
          <input
            type="text"
            value={data.user.phone}
            onChange={(e) =>
              setUser({ ...data.user, phone: e.target.value })
            }
            placeholder="Enter your phone number"
            style={{
              flex: 1,
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>
      </div>

      {/* Buttons */}
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={onBack}
          disabled={loading}
          style={{
            backgroundColor: "#ccc",
            color: "#000",
            padding: "8px 14px",
            border: "none",
            borderRadius: "5px",
            cursor: loading ? "not-allowed" : "pointer",
            marginRight: "10px",
          }}
        >
          ← Back
        </button>

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            padding: "8px 16px",
            border: "none",
            borderRadius: "5px",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#006ae0")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
          {loading ? "Submitting..." : "Confirm Booking"}
        </button>
      </div>

      {error && (
        <p style={{ color: "red", marginTop: "12px" }}>{error}</p>
      )}
    </div>
  );
}
