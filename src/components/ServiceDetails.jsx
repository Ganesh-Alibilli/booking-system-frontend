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
            border-radius: 6px;
            font-size: 13px;
            padding: 8px 0;
            cursor: pointer;
            font-weight: 500;
            box-shadow: 0 1px 3px rgba(0,0,0,0.06);
            transition: all 0.2s ease;
          }
          .booking-slot-btn:hover, .booking-slot-btn:focus {
            background: orange !important;
            color: white !important;
            transform: scale(1.03);
            outline: none;
          }
          .booking-slot-btn.selected {
            background: orange !important;
            color: white !important;
            font-weight: bold;
            transform: scale(1.05);
            box-shadow: 0 2px 12px rgba(255,160,0,0.18);
          }
          .booking-slot-more-btn {
            width: 100%;
            margin: 3px 0;
            background: #1580C4;
            color: white;
            border: none;
            border-radius: 6px;
            font-size: 12px;
            padding: 7px 0;
            cursor: pointer;
            font-weight: 600;
            box-shadow: 0 1px 3px rgba(0,0,0,0.04);
            transition: all 0.2s ease;
          }
          .booking-slot-more-btn:hover {
            background: #0d6ead;
          }
          .slot-col {
            background: #f8fafd;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
            padding: 12px 10px;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }
          .slot-col:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.08);
          }
          .slot-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 20px;
            justify-items: center;
            width: 100%;
          }
          @media (max-width: 768px) {
            .slot-grid {
              grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
              gap: 14px;
            }
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
          <button
            onClick={onBack}
            style={{
              border: "1px solid #007bff",
              background: "transparent",
              color: "#007bff",
              borderRadius: 8,
              padding: "6px 12px",
              cursor: "pointer",
              fontWeight: 500,
              marginBottom: 10,
            }}
          >
            ← Back
          </button>
          <h2 style={{ color: "#111", marginBottom: "10px" }}>
            {service?.Title || "Booking System"}
          </h2>
          <p style={{ color: "#555", marginBottom: "20px" }}>
            {service?.Description}
          </p>
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
                padding: "6px 8px",
                borderRadius: 6,
                border: "1px solid #bbb",
                outline: "none",
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
        <div style={{ width: "100%" }}>
          {visibleDates.length > 0 && (
            <div className="slot-grid">
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
                        marginBottom: 6,
                        paddingBottom: 4,
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

                      // Calculate endTime dynamically
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

                            // Send both start & end time up
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
