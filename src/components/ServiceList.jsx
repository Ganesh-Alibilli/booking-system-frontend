// import React, { useEffect, useState } from "react";

// export default function ServiceList({ type, onChoose, onBack }) {
//   const [services, setServices] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true); // 👈 loading state

//   useEffect(() => {
//     async function fetchServices() {
//       setLoading(true);
//       setError(null);

//       try {
//         const res = await fetch("/api/services");
//         if (!res.ok) throw new Error("Failed to fetch services");

//         const json = await res.json();

//         if (json && json.services && json.services.length) {
//           // Filter by type if provided (case-insensitive match)
//           const list = type
//             ? json.services.filter(
//                 (s) => s.Type?.toLowerCase() === type.toLowerCase()
//               )
//             : json.services;
//           setServices(list);
//         } else {
//           setServices([]);
//         }
//       } catch (err) {
//         console.error("Service fetch error:", err);
//         setError("Unable to load services. Please try again later.");
//         setServices([]);
//       } finally {
//         setLoading(false); // always stop loading
//       }
//     }

//     fetchServices();
//   }, [type]);

//   return (
//     <div style={{ padding: "10px" }}>
//       <button
//         onClick={onBack}
//         disabled={loading}
//         style={{
//           marginBottom: "10px",
//           opacity: loading ? 0.6 : 1,
//           cursor: loading ? "not-allowed" : "pointer",
//         }}
//       >
//         ⬅ Back
//       </button>

//       <h2>Services {type ? `(${type})` : ""}</h2>

//       {/* 🔄 Loading Spinner */}
//       {loading && (
//         <div
//           style={{
//             textAlign: "center",
//             marginTop: "40px",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//         >
//           {/* Inject keyframes directly into component */}
//           <style>
//             {`
//               @keyframes spin {
//                 0% { transform: rotate(0deg); }
//                 100% { transform: rotate(360deg); }
//               }
//             `}
//           </style>

//           <div
//             style={{
//               width: "45px",
//               height: "45px",
//               border: "4px solid #ddd",
//               borderTop: "4px solid #007bff",
//               borderRadius: "50%",
//               animation: "spin 1s linear infinite",
//             }}
//           ></div>

//           <p style={{ marginTop: "12px", color: "#555", fontSize: "14px" }}>
//             Loading services...
//           </p>
//         </div>
//       )}

//       {/* ❌ Error Message */}
//       {!loading && error && (
//         <div style={{ color: "red", margin: "15px 0" }}>{error}</div>
//       )}

//       {/* ⚠️ No Services */}
//       {!loading && services && services.length === 0 && !error && (
//         <div style={{ marginTop: "10px", color: "#666" }}>
//           No services available.
//         </div>
//       )}

//       {/* ✅ Service List */}
//       {!loading &&
//         services &&
//         services.map((service) => (
//           <div
//             key={service.ID}
//             style={{
//               border: "1px solid #ccc",
//               padding: "15px",
//               margin: "12px 0",
//               borderRadius: "8px",
//               background: "#f9f9f9",
//               transition: "all 0.3s ease",
//             }}
//           >
//             <h3 style={{ marginBottom: "6px" }}>{service.Title}</h3>
//             <p style={{ margin: "5px 0" }}>{service.Description}</p>
//             <p style={{ margin: "5px 0" }}>
//               <strong>Duration:</strong> {service.Duration} minutes
//             </p>
//             <button
//               onClick={() => onChoose(service)}
//               style={{
//                 backgroundColor: "#007bff",
//                 color: "white",
//                 border: "none",
//                 padding: "8px 14px",
//                 borderRadius: "5px",
//                 cursor: "pointer",
//                 transition: "background-color 0.2s",
//               }}
//               onMouseEnter={(e) => (e.target.style.backgroundColor = "#006ae0")}
//               onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
//             >
//               Select
//             </button>
//           </div>
//         ))}
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import serviceIcon from "../assets/service-icon.png"; // 🧩 For type = "service"
import consultationIcon from "../assets/consultation-icon.png"; // 🧩 For type = "consultation"

export default function ServiceList({ type, onChoose, onBack }) {
  const [services, setServices] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const baseUrl = import.meta.env.VITE_API_BASE_URL || "";

  useEffect(() => {
    async function fetchServices() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`${baseUrl}/api/services`);
        if (!res.ok) throw new Error("Failed to fetch services");

        const json = await res.json();

        if (json?.services?.length) {
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
        setLoading(false);
      }
    }

    fetchServices();
  }, [type, baseUrl]);

  return (
    <div style={{ padding: "30px", textAlign: "center" }}>
      <button
        onClick={onBack}
        disabled={loading}
        style={{
          marginBottom: "18px",
          opacity: loading ? 0.6 : 1,
          cursor: loading ? "not-allowed" : "pointer",
          background: "transparent",
          border: "1.5px solid #007bff",
          color: "#007bff",
          borderRadius: "8px",
          padding: "4px 10px",
          fontWeight: 600,
        }}
      >
        ← Back
      </button>

      <h2 style={{ marginBottom: "28px", color: "#111", fontSize: "22px" }}>
        Services {type ? `(${type})` : ""}
      </h2>

      {/* 🔄 Loading */}
      {loading && (
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              border: "4px solid #eee",
              borderTop: "4px solid #007bff",
              borderRadius: "50%",
              margin: "0 auto 14px",
              animation: "spin 1s linear infinite",
            }}
          />
          <p style={{ color: "#666" }}>Loading services...</p>
          <style>
            {`@keyframes spin { 0% {transform: rotate(0deg);} 100% {transform: rotate(360deg);} }`}
          </style>
        </div>
      )}

      {/* ❌ Error */}
      {!loading && error && (
        <div style={{ color: "red", margin: "15px 0" }}>{error}</div>
      )}

      {/* ⚠️ No Services */}
      {!loading && services && services.length === 0 && !error && (
        <div style={{ marginTop: "20px", color: "#666" }}>
          No services available.
        </div>
      )}

      {/* ✅ Cards */}
      {!loading && services && services.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "22px",
          }}
        >
          {services.map((service, index) => {
            // 👇 Choose correct icon based on service type
            const iconSrc =
              service.Type?.toLowerCase() === "consultation"
                ? consultationIcon
                : serviceIcon;

            return (
              <div
                key={service.ID ?? index}
                style={{
                  border: "1px solid #e7e7e7",
                  borderRadius: "14px",
                  padding: "28px 25px",
                  background: "linear-gradient(180deg, #fff, #f9fbff)",
                  boxShadow: "0 6px 22px rgba(18,38,63,0.06)",
                  transition: "transform 0.22s ease, box-shadow 0.22s ease",
                  textAlign: "center",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 34px rgba(18,38,63,0.10)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 22px rgba(18,38,63,0.06)";
                }}
              >
                {/* 👇 Icon on top */}
                <div
                  style={{
                    width: 70,
                    height: 70,
                    borderRadius: "14px",
                    background:
                      service.Type?.toLowerCase() === "consultation"
                        ? "rgba(255, 165, 0, 0.1)"
                        : "rgba(0, 123, 255, 0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 16px",
                  }}
                >
                  <img
                    src={iconSrc}
                    alt={service.Type}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "contain",
                      filter:
                        "drop-shadow(0 3px 4px rgba(0,0,0,0.15)) saturate(1.2) brightness(1.1)",
                    }}
                  />
                </div>

                <h3
                  style={{
                    margin: "10px 0 8px",
                    color: "#0e1724",
                    fontSize: "1.1rem",
                    fontWeight: 600,
                  }}
                >
                  {service.Title}
                </h3>
                <p
                  style={{
                    margin: "6px 0 10px",
                    color: "#555",
                    fontSize: "0.95rem",
                  }}
                >
                  {service.Description || "No description available."}
                </p>
                <p style={{ color: "#444", fontSize: "0.9rem" }}>
                  <strong>Duration:</strong> {service.Duration} minutes
                </p>

                <button
                  onClick={() => onChoose(service)}
                  style={{
                    marginTop: "15px",
                    background:
                      service.Type?.toLowerCase() === "consultation"
                        ? "linear-gradient(90deg, #ff9800, #ffb84d)"
                        : "linear-gradient(90deg, #007bff, #00b4ff)",
                    color: "white",
                    border: "none",
                    padding: "10px 18px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: 600,
                    boxShadow: "0 6px 18px rgba(0,123,255,0.18)",
                    transition: "all 0.25s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  Select
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
