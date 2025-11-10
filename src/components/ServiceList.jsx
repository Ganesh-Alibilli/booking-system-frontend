

import React, { useEffect, useState } from "react";

export default function ServiceList({ type, onChoose, onBack }) {
  const [services, setServices] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // 👈 loading state

  useEffect(() => {
    async function fetchServices() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("/api/services");
        if (!res.ok) throw new Error("Failed to fetch services");

        const json = await res.json();

        if (json && json.services && json.services.length) {
          // Filter by type if provided (case-insensitive match)
          const list = type
            ? json.services.filter(
                (s) => s.Type?.toLowerCase() === type.toLowerCase()
              )
            : json.services;
          setServices(list);
        } else {
          setServices([]);
        }
      } catch (err) {
        console.error("Service fetch error:", err);
        setError("Unable to load services. Please try again later.");
        setServices([]);
      } finally {
        setLoading(false); // always stop loading
      }
    }

    fetchServices();
  }, [type]);

  return (
    <div style={{ padding: "10px" }}>
      <button
        onClick={onBack}
        disabled={loading}
        style={{
          marginBottom: "10px",
          opacity: loading ? 0.6 : 1,
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        ⬅ Back
      </button>

      <h2>Services {type ? `(${type})` : ""}</h2>

      {/* 🔄 Loading Spinner */}
      {loading && (
        <div
          style={{
            textAlign: "center",
            marginTop: "40px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Inject keyframes directly into component */}
          <style>
            {`
              @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}
          </style>

          <div
            style={{
              width: "45px",
              height: "45px",
              border: "4px solid #ddd",
              borderTop: "4px solid #007bff",
              borderRadius: "50%",
              animation: "spin 1s linear infinite",
            }}
          ></div>

          <p style={{ marginTop: "12px", color: "#555", fontSize: "14px" }}>
            Loading services...
          </p>
        </div>
      )}

      {/* ❌ Error Message */}
      {!loading && error && (
        <div style={{ color: "red", margin: "15px 0" }}>{error}</div>
      )}

      {/* ⚠️ No Services */}
      {!loading && services && services.length === 0 && !error && (
        <div style={{ marginTop: "10px", color: "#666" }}>
          No services available.
        </div>
      )}

      {/* ✅ Service List */}
      {!loading &&
        services &&
        services.map((service) => (
          <div
            key={service.ID}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              margin: "12px 0",
              borderRadius: "8px",
              background: "#f9f9f9",
              transition: "all 0.3s ease",
            }}
          >
            <h3 style={{ marginBottom: "6px" }}>{service.Title}</h3>
            <p style={{ margin: "5px 0" }}>{service.Description}</p>
            <p style={{ margin: "5px 0" }}>
              <strong>Duration:</strong> {service.Duration} minutes
            </p>
            <button
              onClick={() => onChoose(service)}
              style={{
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                padding: "8px 14px",
                borderRadius: "5px",
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#006ae0")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
            >
              Select
            </button>
          </div>
        ))}
    </div>
  );
}
