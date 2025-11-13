// import React, { useState } from "react";

// export default function ReviewSubmit({ data, setUser, onBack }) {
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = async () => {
//     setLoading(true);
//     setError("");

//     const payload = {
//       serviceId: data.service.ID,
//       serviceType: data.service.Type,
//       serviceTitle: data.service.Title,
//       date: data.slot.date,
//       startTime: data.slot.startTime,
//       endTime: data.slot.endTime,
//       user: {
//         name: data.user.name,
//         email: data.user.email,
//         phone: data.user.phone,
//       },
//     };

//     try {
//       const res = await fetch("/api/bookings", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });
//       const resp = await res.json();

//       if (resp.ok) {
//         setSuccess(true);
//       } else {
//         console.error(resp);
//         setError("Failed to create booking. Please try again.");
//       }
//     } catch (err) {
//       console.error(err);
//       setError("Error connecting to server.");
//     }

//     setLoading(false);
//   };

//   if (success) {
//     return (
//       <div style={{ padding: "20px" }}>
//         <h2 style={{ color: "#007bff" }}>✅ Booking Confirmed!</h2>
//         <p>
//           Thank you, <b>{data.user.name}</b>. Your booking for{" "}
//           <b>{data.service.Title}</b> on <b>{data.slot.date}</b> at{" "}
//           <b>{data.slot.startTime}</b> is confirmed.
//         </p>
//         <p>
//           A confirmation email has been sent to <b>{data.user.email}</b>.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2 style={{ marginBottom: "15px" }}>Review & Submit</h2>

//       <div style={{ marginBottom: "20px" }}>
//         <p>
//           <b>Service:</b> {data.service.Title} ({data.service.Type})
//         </p>
//         <p>
//           <b>Date:</b> {data.slot.date}
//         </p>
//         <p>
//           <b>Time:</b> {data.slot.startTime} - {data.slot.endTime}
//         </p>
//       </div>

//       {/* Label and input beside each other */}
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           gap: "12px",
//           maxWidth: "500px",
//         }}
//       >
//         {/* Name */}
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: "10px",
//           }}
//         >
//           <label style={{ width: "100px", fontWeight: 500 }}>Name:</label>
//           <input
//             type="text"
//             value={data.user.name}
//             onChange={(e) =>
//               setUser({ ...data.user, name: e.target.value })
//             }
//             placeholder="Enter your name"
//             style={{
//               flex: 1,
//               padding: "8px",
//               borderRadius: "5px",
//               border: "1px solid #ccc",
//             }}
//           />
//         </div>

//         {/* Email */}
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: "10px",
//           }}
//         >
//           <label style={{ width: "100px", fontWeight: 500 }}>Email:</label>
//           <input
//             type="email"
//             value={data.user.email}
//             onChange={(e) =>
//               setUser({ ...data.user, email: e.target.value })
//             }
//             placeholder="Enter your email"
//             style={{
//               flex: 1,
//               padding: "8px",
//               borderRadius: "5px",
//               border: "1px solid #ccc",
//             }}
//           />
//         </div>

//         {/* Phone */}
//         <div
//           style={{
//             display: "flex",
//             alignItems: "center",
//             gap: "10px",
//           }}
//         >
//           <label style={{ width: "100px", fontWeight: 500 }}>Phone:</label>
//           <input
//             type="text"
//             value={data.user.phone}
//             onChange={(e) =>
//               setUser({ ...data.user, phone: e.target.value })
//             }
//             placeholder="Enter your phone number"
//             style={{
//               flex: 1,
//               padding: "8px",
//               borderRadius: "5px",
//               border: "1px solid #ccc",
//             }}
//           />
//         </div>
//       </div>

//       {/* Buttons */}
//       <div style={{ marginTop: "20px" }}>
//         <button
//           onClick={onBack}
//           disabled={loading}
//           style={{
//             backgroundColor: "#ccc",
//             color: "#000",
//             padding: "8px 14px",
//             border: "none",
//             borderRadius: "5px",
//             cursor: loading ? "not-allowed" : "pointer",
//             marginRight: "10px",
//           }}
//         >
//           ← Back
//         </button>

//         <button
//           onClick={handleSubmit}
//           disabled={loading}
//           style={{
//             backgroundColor: "#007bff",
//             color: "#fff",
//             padding: "8px 16px",
//             border: "none",
//             borderRadius: "5px",
//             cursor: loading ? "not-allowed" : "pointer",
//             transition: "background-color 0.2s",
//           }}
//           onMouseEnter={(e) => (e.target.style.backgroundColor = "#006ae0")}
//           onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
//         >
//           {loading ? "Submitting..." : "Confirm Booking"}
//         </button>
//       </div>

//       {error && (
//         <p style={{ color: "red", marginTop: "12px" }}>{error}</p>
//       )}
//     </div>
//   );
// }
import React, { useState } from "react";

//  Define extra form fields for specific services or consultations
const getExtraFields = (serviceTitle, serviceType) => {
  if (!serviceTitle || !serviceType) return [];

  const title = serviceTitle.trim().toLowerCase(); // normalize input

  if (serviceType === "consultation") {
    return [
      { label: "Consultation Topic", key: "topic", placeholder: "e.g., Cloud Migration, App Architecture" },
      { label: "Mode", key: "mode", placeholder: "e.g., Online / In-person" },
      { label: "Duration", key: "duration", placeholder: "e.g., 30 mins / 1 hour" },
    ];
  }

  if (serviceType === "service") {
    switch (title) {  // use trimmed lowercase title
      case "web development":
        return [
          { label: "Project Type", key: "projectType", placeholder: "e.g., Website / Web App / Portal" },
          { label: "Technology Stack", key: "techStack", placeholder: "e.g., React, Node.js, MongoDB" },
          { label: "Launch Deadline", key: "deadline", placeholder: "e.g., 30-11-2025" },
        ];

      case "cloud solutions":
        return [
          { label: "Cloud Provider", key: "provider", placeholder: "e.g., AWS / Azure / GCP" },
          { label: "Deployment Type", key: "deployment", placeholder: "e.g., Hybrid / Private / Public" },
          { label: "Storage Requirement", key: "storage", placeholder: "e.g., 100GB / 1TB" },
        ];

      case "seo":
        return [
          { label: "Website URL", key: "url", placeholder: "e.g., https://yourwebsite.com" },
          { label: "Target Keywords", key: "keywords", placeholder: "e.g., digital marketing, online growth" },
          { label: "Goal", key: "goal", placeholder: "e.g., Increase organic traffic by 50%" },
        ];

      case "data analytics":
        return [
          { label: "Data Source", key: "dataSource", placeholder: "e.g., CRM / Google Analytics / Excel" },
          { label: "Report Type", key: "reportType", placeholder: "e.g., Sales / Marketing / Operations" },
          { label: "Frequency", key: "frequency", placeholder: "e.g., Weekly / Monthly" },
        ];

      case "digital marketing":
        return [
          { label: "Campaign Type", key: "campaignType", placeholder: "e.g., Social Media / PPC / Email" },
          { label: "Target Audience", key: "audience", placeholder: "e.g., Small Business Owners / Students" },
          { label: "Budget Range", key: "budget", placeholder: "e.g., $500 - $2000" },
        ];

      case "e-commerce services":
        return [
          { label: "Platform", key: "platform", placeholder: "e.g., Shopify / WooCommerce / Custom" },
          { label: "Product Count", key: "products", placeholder: "e.g., 50 / 200+" },
          { label: "Payment Integration", key: "payment", placeholder: "e.g., Stripe / Razorpay" },
        ];

      case "web hosting services":
        return [
          { label: "Hosting Type", key: "hostingType", placeholder: "e.g., Shared / VPS / Dedicated" },
          { label: "Expected Traffic", key: "traffic", placeholder: "e.g., 10K visitors/month" },
          { label: "Preferred Provider", key: "provider", placeholder: "e.g., AWS / GoDaddy / Hostinger" },
        ];

      case "software development":
        return [
          { label: "Software Type", key: "softwareType", placeholder: "e.g., ERP / CRM / Custom Tool" },
          { label: "Users", key: "users", placeholder: "e.g., 10 / 100 / 1000" },
          { label: "Technology Preference", key: "technology", placeholder: "e.g., .NET / MERN / Python" },
        ];

      case "it support":
        return [
          { label: "Issue Category", key: "issueCategory", placeholder: "e.g., Network / Hardware / Software" },
          { label: "Urgency", key: "urgency", placeholder: "e.g., Low / Medium / High" },
          { label: "Support Duration", key: "supportDuration", placeholder: "e.g., 1 day / 1 month" },
        ];

      case "m365 administration":
        return [
          { label: "Subscription Type", key: "subscription", placeholder: "e.g., Business / Enterprise" },
          { label: "User Count", key: "users", placeholder: "e.g., 25 / 100" },
          { label: "Setup Required", key: "setup", placeholder: "e.g., Email / Teams / SharePoint" },
        ];

      case "networking":
        return [
          { label: "Network Type", key: "networkType", placeholder: "e.g., LAN / WAN / VPN" },
          { label: "Devices Count", key: "devices", placeholder: "e.g., 20 / 100 / 500" },
          { label: "Setup Location", key: "location", placeholder: "e.g., Hyderabad Office / Remote Site" },
        ];

      default:
        return [
          { label: "Details", key: "details", placeholder: "Enter any relevant information" },
        ];
    }
  }

  return [];
};

export default function ReviewSubmit({ data, setUser, onBack }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const baseUrl = import.meta.env.VITE_API_BASE_URL || "";

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    const extraFields = getExtraFields(data.service.Title, data.service.Type)
      .reduce((acc, field) => {
        acc[field.key] = data.user[field.key] || "";
        return acc;
      }, {});

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
         extra: extraFields //  backend receives structured object
      },
    };

    try {
      const res = await fetch(`${baseUrl}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const resp = await res.json();
      if (resp.ok) {
        setSuccess(true);
      } else {
        setError("Failed to create booking. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Error connecting to server.");
    }

    setLoading(false);
  };

  // Booking success message
  if (success) {
    return (
      <div style={{ padding: "40px 20px", textAlign: "center" }}>
        <div
          style={{
            background: "linear-gradient(135deg, #e3f2fd 0%, #ffffff 100%)",
            padding: "40px 30px",
            borderRadius: "14px",
            boxShadow: "0 6px 25px rgba(0,0,0,0.08)",
            display: "inline-block",
            maxWidth: "500px",
          }}
        >
          <h2 style={{ color: "#007bff", marginBottom: "10px" }}>
            ✅ Booking Confirmed!
          </h2>
          <p style={{ color: "#444", fontSize: "16px" }}>
            Thank you, <b>{data.user.name}</b>. Your booking for{" "}
            <b>{data.service.Title}</b> on <b>{data.slot.date}</b> from{" "}
            <b>{data.slot.startTime}</b> to <b>{data.slot.endTime}</b> has been
            confirmed.
          </p>
          <p style={{ color: "#666", marginTop: "10px" }}>
            A confirmation email has been sent to <b>{data.user.email}</b>.
          </p>
        </div>
      </div>
    );
  }

  // Main review & submit form
  return (
    <div style={{ padding: "30px" }}>
      <h2
        style={{
          marginBottom: "25px",
          textAlign: "center",
          fontSize: "1.5rem",
          color: "#0e1724",
          fontWeight: 600,
        }}
      >
        Review & Submit
      </h2>

      {/* Summary Section */}
      <div
        style={{
          background: "#f8fafd",
          borderRadius: "12px",
          padding: "18px 25px",
          boxShadow: "0 3px 12px rgba(0,0,0,0.05)",
          marginBottom: "30px",
        }}
      >
        <p style={{ margin: "6px 0", fontSize: "15px" }}>
          <b>Service:</b> {data.service.Title} ({data.service.Type})
        </p>
        <p style={{ margin: "6px 0", fontSize: "15px" }}>
          <b>Date:</b> {data.slot.date}
        </p>
        <p style={{ margin: "6px 0", fontSize: "15px" }}>
          <b>Time:</b> {data.slot.startTime} - {data.slot.endTime}
        </p>
      </div>

      {/* Unified Input Section */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          maxWidth: "520px",
          margin: "0 auto",
        }}
      >
        {[
          { label: "Name", type: "text", key: "name", placeholder: "Enter your name" },
          { label: "Email", type: "email", key: "email", placeholder: "Enter your email" },
          { label: "Phone", type: "text", key: "phone", placeholder: "Enter your phone number" },
          ...getExtraFields(data.service.Title, data.service.Type),
        ].map((field) => (
          <div
            key={field.key}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <label
              style={{
                width: "100px",
                fontWeight: 500,
                color: "#333",
                textAlign: "right",
              }}
            >
              {field.label}:
            </label>
            <input
              type={field.type || "text"}
              value={data.user[field.key] || ""}
              onChange={(e) =>
                setUser({ ...data.user, [field.key]: e.target.value })
              }
              placeholder={field.placeholder}
              style={{
                flex: 1,
                padding: "10px 12px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "15px",
                backgroundColor: "#fff",
                transition: "all 0.2s ease",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#007bff")}
              onBlur={(e) => (e.target.style.borderColor = "#ccc")}
            />
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div
        style={{
          marginTop: "30px",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          gap: "15px",
        }}
      >
        <button
          onClick={onBack}
          disabled={loading}
          style={{
            backgroundColor: "#e9ecef",
            color: "#333",
            padding: "10px 20px",
            border: "none",
            borderRadius: "8px",
            fontWeight: 500,
            cursor: loading ? "not-allowed" : "pointer",
            boxShadow: "0 3px 8px rgba(0,0,0,0.06)",
          }}
        >
          ← Back
        </button>

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            background: "linear-gradient(90deg, #007bff, #00b4ff)",
            color: "#fff",
            padding: "10px 24px",
            border: "none",
            borderRadius: "8px",
            fontWeight: 600,
            cursor: loading ? "not-allowed" : "pointer",
            boxShadow: "0 6px 18px rgba(0,123,255,0.2)",
          }}
        >
          {loading ? "Submitting..." : "Confirm Booking"}
        </button>
      </div>

      {error && (
        <p
          style={{
            color: "red",
            marginTop: "18px",
            textAlign: "center",
            fontWeight: 500,
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
}
