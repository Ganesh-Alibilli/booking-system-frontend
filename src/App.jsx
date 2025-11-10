// import React, { useEffect, useState } from 'react';
// import Home from './components/Home';
// import ServiceList from './components/ServiceList';
// import ServiceDetails from './components/ServiceDetails';
// import ReviewSubmit from './components/ReviewSubmit';

// function App() {
//   const [step, setStep] = useState(1);
//   const [type, setType] = useState(null);
//   const [service, setService] = useState(null);
//   const [slot, setSlot] = useState({ date:'', startTime:'', endTime:'' });
//   const [user, setUser] = useState({ name:'', email:'', phone:'' });

//   return (
//     <div style={{padding:20, fontFamily:'Arial'}}>
//       <h1>Booking System</h1>
//       <div style={{marginBottom:10}}>
//         <strong>Step {step} / 4</strong>
//       </div>

//       {step===1 && <Home onChoose={(t)=>{setType(t); setStep(2);}} />}
//       {step===2 && <ServiceList type={type} onChoose={(s)=>{setService(s); setStep(3);}} onBack={()=>setStep(1)} />}
//       {step===3 && <ServiceDetails service={service} onSelectSlot={(s)=>{setSlot(s); setStep(4);}} onBack={()=>setStep(2)} />}
//       {step===4 && <ReviewSubmit data={{type,service,slot,user}} setUser={setUser} onBack={()=>setStep(3)} />}

//     </div>
//   );
// }

// export default App;

import React, { useState } from "react";
import BookingProgress from "./components/BookingProgress";
import Home from "./components/Home";
import ServiceList from "./components/ServiceList";
import ServiceDetails from "./components/ServiceDetails";
import ReviewSubmit from "./components/ReviewSubmit";

// export default function App() {
//   const [step, setStep] = useState(1);
//   const [selectedType, setSelectedType] = useState(null);
//   const [selectedService, setSelectedService] = useState(null);
//   const [slot, setSlot] = useState(null);
//   const [user, setUser] = useState({ name: "", email: "", phone: "" });

//   return (
//     <div className="min-h-screen bg-white">
//       {/* ✅ Flow Stepper */}
//       <BookingProgress step={step} />

//       <div className="p-6">
//         {step === 1 && (
//           <Home onNext={(type) => { setSelectedType(type); setStep(2); }} />
//         )}
//         {step === 2 && (
//           <ServiceList
//             type={selectedType}
//             onChoose={(service) => { setSelectedService(service); setStep(3); }}
//             onBack={() => setStep(1)}
//           />
//         )}
//         {step === 3 && (
//           <ServiceDetails
//             service={selectedService}
//             onSelectSlot={(slot) => { setSlot(slot); setStep(4); }}
//             onBack={() => setStep(2)}
//           />
//         )}
//         {step === 4 && (
//           <ReviewSubmit
//             data={{ service: selectedService, slot, user }}
//             setUser={setUser}
//             onBack={() => setStep(3)}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

export default function App() {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [slot, setSlot] = useState(null);
  const [user, setUser] = useState({ name: "", email: "", phone: "" });

  return (
    <div style={{ minHeight: "100vh", background: "#fff" }}>
      {/* ✅ Booking Progress Flow Bar */}
      <BookingProgress step={step} />

      {/* Page Content */}
      <div style={{ padding: "20px 40px" }}>
        {step === 1 && (
          <Home
            onNext={(type) => {
              setSelectedType(type);
              setStep(2);
            }}
          />
        )}

        {step === 2 && (
          <ServiceList
            type={selectedType}
            onChoose={(service) => {
              setSelectedService(service);
              setStep(3);
            }}
            onBack={() => setStep(1)}
          />
        )}

        {step === 3 && (
          <ServiceDetails
            service={selectedService}
            onSelectSlot={(selectedSlot) => {
              setSlot(selectedSlot);
              setStep(4);
            }}
            onBack={() => setStep(2)}
          />
        )}

        {step === 4 && (
          <ReviewSubmit
            data={{ service: selectedService, slot, user }}
            setUser={setUser}
            onBack={() => setStep(3)}
          />
        )}
      </div>
    </div>
  );
}