import React from 'react'
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'

const PortfolioCarousel = ({ item, index, getIndex, onPrev, onNext, onDot, onEnlarge }) => {
    console.log(item.url);
    return (
      <div className="relative">
        <div className="relative overflow-hidden rounded-2xl bg-gray-800 group">
          <img
            src={item.url?.[getIndex(index)] || "/profilePic (1).jpg"}
            alt={`${item.title} ${getIndex(index)}`}
            className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <button
            onClick={() => onEnlarge(item.url[getIndex(index)])}
            className="absolute top-4 right-4 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all duration-300"
          >
            <Maximize2 className="w-5 h-5" />
          </button>

          {item.url.length > 1 && (
            <>
              <button
                onClick={() => onPrev(index)}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all duration-300"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => onNext(index)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all duration-300"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
            {getIndex(index) + 1} / {item.url.length}
          </div>
        </div>

        <div className="flex justify-center mt-4 space-x-2">
          {item.url.map((_, idx) => (
            <button
              key={idx}
              onClick={() => onDot(index, idx)}
              className={`w-3 h-3 rounded-full transition-all cursor-pointer duration-300 ${
                idx === getIndex(index)
                  ? "bg-white"
                  : "bg-gray-600 hover:bg-gray-500"
              }`}
            />
          ))}
        </div>
      </div>
    );}

export default PortfolioCarousel


