import React from "react";
import "./BookingProgress.css"; 

export default function BookingProgress({ step }) {
  const steps = [
    { id: 1, label: "Booking Type" },
    { id: 2, label: "Select Service" },
    { id: 3, label: "Choose Slot" },
    { id: 4, label: "Review & Confirm" },
  ];

  return (
    <div className="progress-container">
      <div className="progress-steps">
        {steps.map((s, idx) => {
          const isActive = s.id === step;
          const isCompleted = s.id < step;

          return (
            <React.Fragment key={s.id}>
              <div className="progress-step">
                <div
                  className={`step-circle ${
                    isActive
                      ? "active"
                      : isCompleted
                      ? "completed"
                      : "inactive"
                  }`}
                >
                  {String(s.id).padStart(2, "0")}
                </div>
                <div
                  className={`step-label ${
                    isActive
                      ? "label-active"
                      : isCompleted
                      ? "label-completed"
                      : "label-inactive"
                  }`}
                >
                  {s.label}
                </div>
              </div>
              {/* Line between steps */}
              {idx < steps.length - 1 && (
                <div
                  className={`connector ${
                    isCompleted ? "connector-active" : ""
                  }`}
                ></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
