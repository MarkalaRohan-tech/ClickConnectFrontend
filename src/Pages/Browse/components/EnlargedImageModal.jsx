import React from 'react'
import { X } from 'lucide-react'

const EnlargedImageModal = ({ src, onClose }) => {
    if (!src) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 p-4 overflow-auto">
        <button
          onClick={onClose}
          className="absolute cursor-pointer top-4 right-4 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all duration-300"
        >
          <X className="w-6 h-6" />
        </button>
        <img
          src={src}
          alt="Enlarged view"
          className="max-w-[90vw] max-h-[90vh] w-auto h-auto object-contain"
        />
      </div>
    );
}

export default EnlargedImageModal


