import React from 'react'

const BookingRow = ({ booking, onView }) => (
  <tr className="border-b border-black hover:bg-gray-50 transition-colors">
    <td className="py-4 px-4 text-black">
      {new Date(booking.date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })}
    </td>

    <td className="py-4 px-4 text-black">{booking.timeSlot}</td>
    <td className="py-4 px-4 text-black">{booking.title}</td>
    <td className="py-4 px-4 text-black">{booking.package}</td>
    <td className="py-4 px-4">
      <span
        className={`px-2 py-1 rounded text-sm ${
          booking.status === "completed"
            ? "bg-purple-100 text-purple-600 border border-purple-600 rounded-2xl"
            : booking.status === "approved"
            ? "bg-green-100 text-green-600 border border-green-600 rounded-2xl"
            : booking.status === "pending"
            ? "bg-yellow-100 text-yellow-600  border border-yellow-600 rounded-2xl"
            : booking.status === "rejected"
            ? "bg-red-100 text-red-600  border border-red-600 rounded-2xl"
            : "bg-gray-100 text-black border border-black"
        }`}
      >
        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
      </span>
    </td>
    <td className="py-4 px-4">
      <button
        onClick={() => onView(booking)}
        className="text-black hover:text-white cursor-pointer border border-black px-3 py-1 rounded hover:bg-black  transition-colors"
      >
        View
      </button>
    </td>
  </tr>
);

export default BookingRow


