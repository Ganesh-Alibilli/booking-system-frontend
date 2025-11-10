// import React, { useState, useEffect } from "react";

// export default function ServiceDetails({ service, onSelectSlot, onBack }) {
//   const [date, setDate] = useState("");
//   const [slots, setSlots] = useState([]);
//   const [selectedSlot, setSelectedSlot] = useState(null);

//   // Generate weekly grid slots (like a calendar layout)
//   useEffect(() => {
//     if (!service) return;
//     const duration = service.Duration || 30;

//     // Base time slots (for each day)
//     const timeSlots = [];
//     let h = 9, m = 0;
//     while (h < 17) {
//       const start = String(h).padStart(2, "0") + ":" + String(m).padStart(2, "0");
//       const endDate = new Date(2000, 0, 1, h, m);
//       endDate.setMinutes(endDate.getMinutes() + duration);
//       const end = endDate.toTimeString().substring(0, 5);
//       timeSlots.push({ start, end });
//       m += duration;
//       while (m >= 60) {
//         m -= 60;
//         h++;
//       }
//     }

//     // Generate a 4-day grid from selected date
//     if (date) {
//       const baseDate = new Date(date);
//       const days = [...Array(4)].map((_, i) => {
//         const d = new Date(baseDate);
//         d.setDate(baseDate.getDate() + i);
//         return d;
//       });
//       setSlots({ days, timeSlots });
//     }
//   }, [date, service]);

//   const handleSelect = (day, slot) => {
//     setSelectedSlot(`${day.toDateString()}_${slot.start}`);
//     onSelectSlot({
//       date: day.toISOString().split("T")[0],
//       startTime: slot.start,
//       endTime: slot.end,
//     });
//   };

//   return (
//     <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 30, padding: "20px" }}>
//       {/* Left side */}
//       <div>
//         <button onClick={onBack} style={{ marginBottom: 10 }}>← Back</button>
//         <h2>{service?.Title}</h2>
//         <p style={{ color: "#555" }}>{service?.Description}</p>

//         <div style={{ marginTop: 20 }}>
//           <label style={{ fontWeight: "bold" }}>Select Start Date:</label>
//           <input
//             type="date"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//             style={{
//               marginLeft: 10,
//               padding: "6px 10px",
//               borderRadius: 5,
//               border: "1px solid #ccc",
//             }}
//           />
//         </div>
//       </div>

//       {/* Right side (slot calendar layout) */}
//       <div>
//         <h3>Available Slots</h3>

//         {!date && <p style={{ color: "#888" }}>Please select a start date.</p>}

//         {date && slots.days && (
//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: `repeat(${slots.days.length + 1}, 1fr)`,
//               border: "1px solid #ccc",
//               borderRadius: "10px",
//               overflow: "hidden",
//             }}
//           >
//             {/* Header Row */}
//             <div style={{ background: "#f7f9fb", padding: "10px", fontWeight: "bold" }}>
//               Time
//             </div>
//             {slots.days.map((day) => (
//               <div
//                 key={day.toISOString()}
//                 style={{
//                   background: "#f7f9fb",
//                   padding: "10px",
//                   fontWeight: "bold",
//                   textAlign: "center",
//                 }}
//               >
//                 {day.toLocaleDateString("en-US", { weekday: "short" })} <br />
//                 <small>{day.toLocaleDateString("en-GB")}</small>
//               </div>
//             ))}

//             {/* Time Rows */}
//             {slots.timeSlots.map((slot) => (
//               <>
//                 {/* Time Label */}
//                 <div
//                   key={`label-${slot.start}`}
//                   style={{
//                     background: "#fafafa",
//                     padding: "10px",
//                     textAlign: "center",
//                     borderTop: "1px solid #eee",
//                     fontWeight: 500,
//                     fontSize: "14px",
//                   }}
//                 >
//                   {slot.start}
//                 </div>

//                 {/* Slot cells */}
//                 {slots.days.map((day) => {
//                   const slotKey = `${day.toDateString()}_${slot.start}`;
//                   const isSelected = selectedSlot === slotKey;
//                   return (
//                     <div
//                       key={slotKey}
//                       onClick={() => handleSelect(day, slot)}
//                       style={{
//                         padding: "10px",
//                         textAlign: "center",
//                         borderTop: "1px solid #eee",
//                         borderLeft: "1px solid #eee",
//                         cursor: "pointer",
//                         backgroundColor: isSelected ? "#007bff" : "#e3f2fd",
//                         color: isSelected ? "white" : "#007bff",
//                         transition: "0.2s",
//                       }}
//                       onMouseEnter={(e) => {
//                         if (!isSelected) e.currentTarget.style.backgroundColor = "#bbdefb";
//                       }}
//                       onMouseLeave={(e) => {
//                         if (!isSelected) e.currentTarget.style.backgroundColor = "#e3f2fd";
//                       }}
//                     >
//                       {slot.start}
//                     </div>
//                   );
//                 })}
//               </>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


// import React, { useState, useEffect } from 'react';

// export default function ServiceDetails({ service, onSelectSlot, onBack }) {
//   const [date, setDate] = useState('');
//   const [slots, setSlots] = useState([]);

//   useEffect(()=> {
//     if (!date || !service) return;
//     const duration = service.duration || 30;
//     const slotsArr = [];
//     let h = 9, m = 0;
//     while (h < 17) {
//       const start = String(h).padStart(2,'0') + ':' + String(m).padStart(2,'0');
//       const endDate = new Date(2000,0,1,h,m);
//       endDate.setMinutes(endDate.getMinutes() + duration);
//       const end = endDate.toTimeString().substr(0,5);
//       slotsArr.push({start, end});
//       m += duration;
//       while (m >= 60) { m -= 60; h += 1; }
//     }
//     setSlots(slotsArr);
//   }, [date, service]);

//   return (
//     <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:20}}>
//       <div>
//         <button onClick={onBack}>Back</button>
//         <h2>{service?.title}</h2>
//         <p>{service?.description}</p>
//         <label>Select date: <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} /></label>
//       </div>
//       <div>
//         <h3>Available slots</h3>
//         {!date && <div>Please select a date</div>}
//         {date && slots.map(s => (
//           <div key={s.start} style={{marginBottom:6}}>
//             <button onClick={()=>onSelectSlot({date, startTime:s.start, endTime:s.end})}>{s.start} - {s.end}</button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
// -----------------------------------------------------------------------------------
// import React, { useState, useEffect } from "react";

// function getDates(startDate, days = 4) {
//   // Returns an array of Date objects for consecutive days
//   const dates = [];
//   const start = new Date(startDate);
//   for (let i = 0; i < days; i++) {
//     const d = new Date(start);
//     d.setDate(start.getDate() + i);
//     dates.push(d);
//   }
//   return dates;
// }

// export default function ServiceDetails({ service, onSelectSlot, onBack }) {
//   const [selectedDate, setSelectedDate] = useState("");
//   const [visibleDates, setVisibleDates] = useState([]);
//   const [slotsMap, setSlotsMap] = useState({});
//   const [selectedSlot, setSelectedSlot] = useState(null);

//   useEffect(() => {
//     if (!selectedDate) return;
//     setVisibleDates(getDates(selectedDate, 4));
//   }, [selectedDate]);

//   useEffect(() => {
//     if (!service) return;
//     const duration = service.duration || 30;
//     const newSlotsMap = {};
//     visibleDates.forEach((date) => {
//       let h = 9,
//         m = 45;
//       const slots = [];
//       while (h < 12) {
//         // Time slots between 09:45 and 11:45 am
//         const hour = h.toString().padStart(2, "0");
//         const minute = m.toString().padStart(2, "0");
//         const label = `${hour}:${minute} am`;
//         slots.push({ time: `${hour}:${minute}`, label });
//         m += duration;
//         while (m >= 60) {
//           m -= 60;
//           h += 1;
//         }
//       }
//       newSlotsMap[date.toDateString()] = slots;
//     });
//     setSlotsMap(newSlotsMap);
//   }, [visibleDates, service]);

//   return (
//     <div
//       style={{
//         display: "grid",
//         gridTemplateColumns: "320px 1fr",
//         gap: 36,
//         alignItems: "flex-start",
//         marginTop: 24,
//       }}
//     >
//       {/* Left: Booking Info and Date Picker */}
//       <div>
//         <button onClick={onBack}>Back</button>
//         <h2>{service?.title || "Booking System"}</h2>
//         <p>{service?.description}</p>
//         <label>
//           <b>Select starting date:</b>
//           <br />
//           <input
//             type="date"
//             value={selectedDate}
//             onChange={(e) => setSelectedDate(e.target.value)}
//             style={{ marginTop: 8, fontSize: 16, padding: "4px 8px" }}
//           />
//         </label>
//         {visibleDates.length === 0 && (
//           <div style={{ marginTop: 28, color: "#555" }}>
//             Please select a date for slot booking.
//           </div>
//         )}
//       </div>
  
//       {/* Right: Slot Selection Grid */}
//       <div>
//         {visibleDates.length > 0 && (
//           <div
//             style={{
//               display: "flex",
//               gap: 10, // reduced gap between columns
//             }}
//           >
//             {visibleDates.map((date) => (
//               <div key={date.toDateString()} style={{ minWidth: 90, maxWidth: 250, width: 220 }}>
//                 <div
//                   style={{
//                     fontWeight: "bold",
//                     borderBottom: "2px solid #eee",
//                     textAlign: "center",
//                     fontSize: 14,
//                     marginBottom: 3,
//                   }}
//                 >
//                   {date
//                     .toLocaleDateString("en-US", { weekday: "short" })
//                     .toUpperCase()}
//                   <br />
//                   {date.toISOString().slice(0, 10)}
//                 </div>
//                 {slotsMap[date.toDateString()]?.map((slot) => {
//                   const isSelected =
//                     selectedSlot &&
//                     selectedSlot.date === date.toDateString() &&
//                     selectedSlot.time === slot.time;
//                   return (
//                     <button
//                       key={slot.time}
//                       onClick={() => {
//                         setSelectedSlot({
//                           date: date.toDateString(),
//                           time: slot.time,
//                         });
//                         onSelectSlot({
//                           date: date.toISOString().slice(0, 10),
//                           startTime: slot.time,
//                           endTime: "", // Add calculation if you want
//                         });
//                       }}
//                       style={{
//                         width: "100%",
//                         margin: "3px 0", // reduced margin
//                         background: isSelected ? "orange" : "#2196F3",
//                         color: "white",
//                         border: "none",
//                         borderRadius: 4, // smaller border radius
//                         fontSize: 13, // smaller font size
//                         padding: "6px 0", // less vertical padding
//                         cursor: "pointer",
//                         fontWeight: isSelected ? "bold" : "normal",
//                       }}
//                     >
//                       {slot.label}
//                     </button>
//                   );
//                 })}
//                 <button
//                   style={{
//                     width: "100%",
//                     margin: "3px 0", // reduced margin
//                     background: "#0d6efd",
//                     color: "white",
//                     border: "none",
//                     borderRadius: 4,
//                     fontSize: 12, // smaller font size
//                     padding: "5px 0", // less vertical padding
//                     cursor: "pointer",
//                   }}
//                 >
//                   MORE...
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
// ---------------------------------------------------------------------
// import React, { useState, useEffect } from "react";

// function getDates(startDate, days = 4) {
//   const dates = [];
//   const start = new Date(startDate);
//   for (let i = 0; i < days; i++) {
//     const d = new Date(start);
//     d.setDate(start.getDate() + i);
//     dates.push(d);
//   }
//   return dates;
// }

// export default function ServiceDetails({ service, onSelectSlot, onBack }) {
//   const [selectedDate, setSelectedDate] = useState("");
//   const [visibleDates, setVisibleDates] = useState([]);
//   const [slotsMap, setSlotsMap] = useState({});
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [expandedCols, setExpandedCols] = useState({}); // For "MORE..."/show all functionality

//   const DEFAULT_SLOTS_TO_SHOW = 10;

//   useEffect(() => {
//     if (!selectedDate) return;
//     setVisibleDates(getDates(selectedDate, 4));
//   }, [selectedDate]);

//   useEffect(() => {
//     if (!service) return;
//     const duration = service.Duration || 30; // minutes
//     const newSlotsMap = {};
//     visibleDates.forEach((date) => {
//       let h = 9, m = 0;
//       const slots = [];
//       while (h < 18) { // 9:00 to 18:00
//         const hour = h.toString().padStart(2, "0");
//         const minute = m.toString().padStart(2, "0");
//         const label = `${hour}:${minute} ${h < 12 ? "am" : "pm"}`;
//         slots.push({ time: `${hour}:${minute}`, label });
//         m += duration;
//         while (m >= 60) {
//           m -= 60;
//           h += 1;
//         }
//       }
//       newSlotsMap[date.toDateString()] = slots;
//     });
//     setSlotsMap(newSlotsMap);
//   }, [visibleDates, service]);

//   return (
//     <>
//       <style>
//         {`
//           .booking-slot-btn {
//             width: 100%;
//             margin: 3px 0;
//             background: #2196F3;
//             color: white;
//             border: none;
//             border-radius: 4px;
//             font-size: 13px;
//             padding: 8px 0;
//             cursor: pointer;
//             font-weight: normal;
//             box-shadow: 0 1px 3px 0 rgba(0,0,0,0.06);
//             transition: box-shadow 0.15s, background 0.15s;
//           }
//           .booking-slot-btn:hover, .booking-slot-btn:focus {
//             background: orange !important;
//             color: white !important;
//             box-shadow: 0 2px 10px 0 rgba(255,140,0,0.15), 0 2px 7px 0 rgba(0,0,0,0.09);
//             outline: none;
//           }
//           .booking-slot-btn.selected, .booking-slot-btn.selected:focus {
//             background: orange !important;
//             color: white !important;
//             font-weight: bold;
//             box-shadow: 0 2px 12px 0 rgba(255,160,0,0.18);
//             outline: none;
//           }
//           .booking-slot-more-btn {
//             width: 100%;
//             margin: 3px 0;
//             background: #1580C4;
//             color: white;
//             border: none;
//             border-radius: 4px;
//             font-size: 12px;
//             padding: 7px 0;
//             cursor: pointer;
//             font-weight: bold;
//             box-shadow: 0 1px 3px 0 rgba(0,0,0,0.04);
//           }
//           .slot-col {
//             background: #f8fafd;
//             border-radius: 7px;
//             box-shadow: 0 2px 16px 0 rgba(0,0,0,0.06);
//             padding: 10px 7px;
//             min-width: 120px;
//             max-width: 150px;
//             height: auto;
//             margin-bottom: 10px;
//             margin-top: 6px;
//           }
//         `}
//       </style>
//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "320px 1fr",
//           gap: 36,
//           alignItems: "flex-start",
//           marginTop: 24,
//         }}
//       >
//         {/* Left: Booking Info and Date Picker */}
//         <div>
//           <button onClick={onBack}>Back</button>
//           <h2>{service?.Title || "Booking System"}</h2>
//           <p>{service?.Description}</p>
//           <label>
//             <b>Select starting date:</b>
//             <br />
//             <input
//               type="date"
//               value={selectedDate}
//               onChange={(e) => setSelectedDate(e.target.value)}
//               style={{
//                 marginTop: 8,
//                 fontSize: 16,
//                 padding: "4px 8px",
//                 borderRadius: 4,
//                 border: "1px solid #bbb"
//               }}
//             />
//           </label>
//           {visibleDates.length === 0 && (
//             <div style={{ marginTop: 28, color: "#555" }}>
//               Please select a date for slot booking.
//             </div>
//           )}
//         </div>

//         {/* Right: Slot Selection Grid */}
//         <div>
//           {visibleDates.length > 0 && (
//             <div
//               style={{
//                 display: "flex",
//                 gap: 18,
//                 flexWrap: "wrap"
//               }}
//             >
//               {visibleDates.map((date) => {
//                 const dayKey = date.toDateString();
//                 const allSlots = slotsMap[dayKey] || [];
//                 const isExpanded = expandedCols[dayKey];
//                 const slotsToDisplay = isExpanded
//                   ? allSlots
//                   : allSlots.slice(0, DEFAULT_SLOTS_TO_SHOW);

//                 return (
//                   <div key={dayKey} className="slot-col">
//                     <div
//                       style={{
//                         fontWeight: "bold",
//                         borderBottom: "2px solid #eee",
//                         textAlign: "center",
//                         fontSize: 15,
//                         marginBottom: 1,
//                         letterSpacing: "0.5px",
//                       }}
//                     >
//                       {date
//                         .toLocaleDateString("en-US", { weekday: "short" })
//                         .toUpperCase()}
//                       <br />
//                       <span style={{ fontWeight: 400, color: "#a4a4a4", fontSize: 13, letterSpacing: "0.2px" }}>
//                         {date.toISOString().slice(0, 10)}
//                       </span>
//                     </div>
//                     {slotsToDisplay.map((slot) => {
//                       const isSelected =
//                         selectedSlot &&
//                         selectedSlot.date === dayKey &&
//                         selectedSlot.time === slot.time;
//                       return (
//                         <button
//                           key={slot.time}
//                           className={
//                             "booking-slot-btn" +
//                             (isSelected ? " selected" : "")
//                           }
//                           onClick={() => {
//                             setSelectedSlot({
//                               date: dayKey,
//                               time: slot.time,
//                             });
//                             onSelectSlot({
//                               date: date.toISOString().slice(0, 10),
//                               startTime: slot.time,
//                               endTime: "",
//                             });
//                           }
//                         }
//                         >
//                           {slot.label}
//                         </button>
//                       );
//                     })}
//                     {allSlots.length > DEFAULT_SLOTS_TO_SHOW && !isExpanded && (
//                       <button
//                         className="booking-slot-more-btn"
//                         onClick={() =>
//                           setExpandedCols((prev) => ({
//                             ...prev, [dayKey]: true
//                           }))
//                         }
//                       >
//                         MORE...
//                       </button>
//                     )}
//                     {isExpanded && allSlots.length > DEFAULT_SLOTS_TO_SHOW && (
//                       <button
//                         className="booking-slot-more-btn"
//                         onClick={() =>
//                           setExpandedCols((prev) => ({
//                             ...prev, [dayKey]: false
//                           }))
//                         }
//                       >
//                         LESS
//                       </button>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// ----------------------------------------------------------------------------
import React, { useState, useEffect } from "react";

function getDates(startDate, days = 4) {
  const dates = [];
  const start = new Date(startDate);
  for (let i = 0; i < days; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    dates.push(d);
  }
  return dates;
}

export default function ServiceDetails({ service, onSelectSlot, onBack }) {
  const [selectedDate, setSelectedDate] = useState("");
  const [visibleDates, setVisibleDates] = useState([]);
  const [slotsMap, setSlotsMap] = useState({});
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [expandedCols, setExpandedCols] = useState({});

  const DEFAULT_SLOTS_TO_SHOW = 10;

  useEffect(() => {
    if (!selectedDate) return;
    setVisibleDates(getDates(selectedDate, 4));
  }, [selectedDate]);

  useEffect(() => {
    if (!service) return;
    const duration = service.Duration || 30; // minutes
    const newSlotsMap = {};
    visibleDates.forEach((date) => {
      let h = 9,
        m = 0;
      const slots = [];
      while (h < 18) {
        // 9:00 AM to 6:00 PM
        const hour = h.toString().padStart(2, "0");
        const minute = m.toString().padStart(2, "0");
        const label = `${hour}:${minute} ${h < 12 ? "am" : "pm"}`;
        slots.push({ time: `${hour}:${minute}`, label });
        m += duration;
        while (m >= 60) {
          m -= 60;
          h += 1;
        }
      }
      newSlotsMap[date.toDateString()] = slots;
    });
    setSlotsMap(newSlotsMap);
  }, [visibleDates, service]);

  return (
    <>
      <style>
        {`
          .booking-slot-btn {
            width: 100%;
            margin: 3px 0;
            background: #2196F3;
            color: white;
            border: none;
            border-radius: 4px;
            font-size: 13px;
            padding: 8px 0;
            cursor: pointer;
            font-weight: normal;
            box-shadow: 0 1px 3px 0 rgba(0,0,0,0.06);
            transition: box-shadow 0.15s, background 0.15s;
          }
          .booking-slot-btn:hover, .booking-slot-btn:focus {
            background: orange !important;
            color: white !important;
            box-shadow: 0 2px 10px 0 rgba(255,140,0,0.15), 0 2px 7px 0 rgba(0,0,0,0.09);
            outline: none;
          }
          .booking-slot-btn.selected, .booking-slot-btn.selected:focus {
            background: orange !important;
            color: white !important;
            font-weight: bold;
            box-shadow: 0 2px 12px 0 rgba(255,160,0,0.18);
            outline: none;
          }
          .booking-slot-more-btn {
            width: 100%;
            margin: 3px 0;
            background: #1580C4;
            color: white;
            border: none;
            border-radius: 4px;
            font-size: 12px;
            padding: 7px 0;
            cursor: pointer;
            font-weight: bold;
            box-shadow: 0 1px 3px 0 rgba(0,0,0,0.04);
          }
          .slot-col {
            background: #f8fafd;
            border-radius: 7px;
            box-shadow: 0 2px 16px 0 rgba(0,0,0,0.06);
            padding: 10px 7px;
            min-width: 120px;
            max-width: 150px;
            height: auto;
            margin-bottom: 10px;
            margin-top: 6px;
          }
        `}
      </style>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "320px 1fr",
          gap: 36,
          alignItems: "flex-start",
          marginTop: 24,
        }}
      >
        {/* Left: Booking Info and Date Picker */}
        <div>
          <button onClick={onBack}>⬅ Back</button>
          <h2>{service?.Title || "Booking System"}</h2>
          <p>{service?.Description}</p>
          <label>
            <b>Select starting date:</b>
            <br />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              style={{
                marginTop: 8,
                fontSize: 16,
                padding: "4px 8px",
                borderRadius: 4,
                border: "1px solid #bbb",
              }}
            />
          </label>
          {visibleDates.length === 0 && (
            <div style={{ marginTop: 28, color: "#555" }}>
              Please select a date for slot booking.
            </div>
          )}
        </div>

        {/* Right: Slot Selection Grid */}
        <div>
          {visibleDates.length > 0 && (
            <div
              style={{
                display: "flex",
                gap: 18,
                flexWrap: "wrap",
              }}
            >
              {visibleDates.map((date) => {
                const dayKey = date.toDateString();
                const allSlots = slotsMap[dayKey] || [];
                const isExpanded = expandedCols[dayKey];
                const slotsToDisplay = isExpanded
                  ? allSlots
                  : allSlots.slice(0, DEFAULT_SLOTS_TO_SHOW);

                return (
                  <div key={dayKey} className="slot-col">
                    <div
                      style={{
                        fontWeight: "bold",
                        borderBottom: "2px solid #eee",
                        textAlign: "center",
                        fontSize: 15,
                        marginBottom: 1,
                        letterSpacing: "0.5px",
                      }}
                    >
                      {date
                        .toLocaleDateString("en-US", { weekday: "short" })
                        .toUpperCase()}
                      <br />
                      <span
                        style={{
                          fontWeight: 400,
                          color: "#a4a4a4",
                          fontSize: 13,
                          letterSpacing: "0.2px",
                        }}
                      >
                        {date.toISOString().slice(0, 10)}
                      </span>
                    </div>

                    {slotsToDisplay.map((slot) => {
                      const isSelected =
                        selectedSlot &&
                        selectedSlot.date === dayKey &&
                        selectedSlot.time === slot.time;

                      // 🔹 Calculate endTime dynamically
                      const [h, m] = slot.time.split(":").map(Number);
                      const duration = service?.Duration || 30;
                      const endDate = new Date(2000, 0, 1, h, m);
                      endDate.setMinutes(endDate.getMinutes() + duration);
                      const endH = String(endDate.getHours()).padStart(2, "0");
                      const endM = String(endDate.getMinutes()).padStart(2, "0");
                      const endTime = `${endH}:${endM}`;

                      return (
                        <button
                          key={slot.time}
                          className={
                            "booking-slot-btn" +
                            (isSelected ? " selected" : "")
                          }
                          onClick={() => {
                            setSelectedSlot({
                              date: dayKey,
                              time: slot.time,
                            });

                            // ✅ Send both start & end time up
                            onSelectSlot({
                              date: date.toISOString().slice(0, 10),
                              startTime: slot.time,
                              endTime,
                            });
                          }}
                        >
                          {`${slot.label} - ${endTime}`}
                        </button>
                      );
                    })}

                    {/* MORE/LESS buttons */}
                    {allSlots.length > DEFAULT_SLOTS_TO_SHOW && !isExpanded && (
                      <button
                        className="booking-slot-more-btn"
                        onClick={() =>
                          setExpandedCols((prev) => ({
                            ...prev,
                            [dayKey]: true,
                          }))
                        }
                      >
                        MORE...
                      </button>
                    )}
                    {isExpanded &&
                      allSlots.length > DEFAULT_SLOTS_TO_SHOW && (
                        <button
                          className="booking-slot-more-btn"
                          onClick={() =>
                            setExpandedCols((prev) => ({
                              ...prev,
                              [dayKey]: false,
                            }))
                          }
                        >
                          LESS
                        </button>
                      )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

