import React from 'react'
import { X } from 'lucide-react'

const BookingModal = ({ open, onClose,onBook, bookingForm, setBookingForm, selectedPackage, setSelectedPackage, packages }) => {
    if (!open) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-900 rounded-2xl p-8 max-w-md w-full relative border border-gray-700">
          <button
            className="absolute top-4 right-4 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full"
            onClick={onClose}
          >
            <X className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold mb-6 text-center">
            Book Your Session
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onBook();
              onClose();
            }}
            className="space-y-5"
          >
            <div>
              <label className="block text-gray-300 mb-2">Date</label>
              <input
                type="date"
                className="w-full cursor-pointer px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none"
                value={bookingForm.date}
                onChange={(e) =>
                  setBookingForm((f) => ({ ...f, date: e.target.value }))
                }
                required
              />
            </div>
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-gray-300 mb-2">From</label>
                <input
                  type="time"
                  className="w-full cursor-pointer px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none"
                  value={bookingForm.from}
                  onChange={(e) =>
                    setBookingForm((f) => ({ ...f, from: e.target.value }))
                  }
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-300 mb-2">To</label>
                <input
                  type="time"
                  className="w-full cursor-pointer px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none"
                  value={bookingForm.to}
                  onChange={(e) =>
                    setBookingForm((f) => ({ ...f, to: e.target.value }))
                  }
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Package</label>
              <select
                className="w-full cursor-pointer px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none"
                value={selectedPackage}
                onChange={(e) => setSelectedPackage(e.target.value)}
                required
              >
                {packages.map((pkg) => (
                  <option key={pkg.name} value={pkg.name}>
                    {pkg.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-gray-300 mb-2">Notes</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none"
                placeholder="Describe your event (e.g. Birthday, Wedding)"
                value={bookingForm.notes}
                onChange={(e) =>
                  setBookingForm((f) => ({ ...f, notes: e.target.value }))
                }
              />
            </div>
            <button
              type="submit"
              className="w-full cursor-pointer py-3 rounded-xl font-semibold bg-gradient-to-r from-white to-gray-300 text-black transition-all duration-300 transform hover:scale-105 shadow-lg mt-2"
            >
              Confirm Booking
            </button>
          </form>
        </div>
      </div>
    );
}

export default BookingModal


