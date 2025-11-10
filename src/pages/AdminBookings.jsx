import React, { useEffect, useState } from "react";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/bookings");
      const data = await res.json();
      if (data.ok) {
        const sorted = data.bookings.sort(
          (a, b) => new Date(b.Timestamp) - new Date(a.Timestamp)
        );
        setBookings(sorted);
      } else setError("Failed to load bookings");
    } catch (err) {
      setError("Error fetching data");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">📋 Admin Bookings</h2>
      <button onClick={fetchBookings} className="px-3 py-1 mb-3 bg-blue-600 text-white rounded">
        Refresh
      </button>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Booking ID</th>
              <th className="border p-2">Service</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Time</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b, i) => (
              <tr key={i}>
                <td className="border p-2">{b.BookingID}</td>
                <td className="border p-2">{b.ServiceTitle}</td>
                <td className="border p-2">{b.BookingDate}</td>
                <td className="border p-2">{b.BookingTime}</td>
                <td className="border p-2">{b.FullName}</td>
                <td className="border p-2">{b.Email}</td>
                <td className="border p-2">{b.Status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
