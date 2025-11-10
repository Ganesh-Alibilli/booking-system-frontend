import React, { useEffect, useState } from 'react';

export default function AdminBookings({ onBack }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/bookings');
      const data = await res.json();
      if (data.ok) {
        const sorted = data.bookings.sort(
          (a, b) => new Date(b.Timestamp) - new Date(a.Timestamp)
        );
        setBookings(sorted);
      } else setError('Failed to load bookings');
    } catch {
      setError('Error fetching data');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div>
      <h2>📋 Admin Bookings</h2>
      <button onClick={onBack}>← Back</button>
      <button onClick={fetchBookings}>🔄 Refresh</button>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && (
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>ID</th>
              <th>Service</th>
              <th>Date</th>
              <th>Time</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b, i) => (
              <tr key={i}>
                <td>{b.BookingID}</td>
                <td>{b.ServiceTitle}</td>
                <td>{b.BookingDate}</td>
                <td>{b.BookingTime}</td>
                <td>{b.FullName}</td>
                <td>{b.Email}</td>
                <td>{b.Status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
