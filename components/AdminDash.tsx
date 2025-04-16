"use client";

import {
  FaPlus,
  FaPencilAlt,
  FaExclamationCircle,
  FaEye,
} from "react-icons/fa";
import { Transition } from "@headlessui/react";
import { useState } from "react";

export default function DashboardContent() {
  return (
    <div className="p-4 md:p-8 bg-white min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Registered Card */}
        <div className="bg-gray-100 rounded-lg p-6 flex flex-col items-center justify-center text-center">
          <div className="text-6xl font-bold text-blue-800">97</div>
          <div className="text-gray-700 mt-2">registered</div>
        </div>

        {/* Announcements */}
        <div className="lg:col-span-2 bg-gray-100 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Announcements
            </h2>
            <button className="bg-green-500 hover:bg-green-600 text-white rounded-full p-2">
              <FaPlus size={14} />
            </button>
          </div>
          <ul className="space-y-3">
            {[1, 2, 3, 4].map((num) => (
              <li
                key={num}
                className="flex justify-between  items-center bg-white rounded p-3 shadow-sm"
              >
                <div>
                  <div className="font-semibold text-gray-800">
                    Title Number {num}
                  </div>
                  <div className="text-sm text-gray-400">
                    3/14/25
                    <span className="italic text-gray-500 ml-2">
                      Here is some of the cont...
                    </span>
                  </div>
                </div>
                <div className="flex items-center  space-x-3">
                  <Tooltip
                    icon={<FaEye size={14} className="hover:cursor-pointer" />}
                    label="View post"
                  />
                  <Tooltip
                    icon={
                      <FaPencilAlt size={14} className="hover:cursor-pointer" />
                    }
                    label="Edit post"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Review Registrants */}
        <div className="bg-gray-100 rounded-lg p-6 flex items-center space-x-4">
          <div className="text-blue-800">
            <FaExclamationCircle size={28} />
          </div>
          <div>
            <p className="text-gray-800 mb-2">
              There are <strong>3</strong> registrants that need your review.
            </p>
            <button className="bg-blue-800 text-white px-4 py-1 rounded hover:bg-blue-900 text-sm">
              Review them now
            </button>
          </div>
        </div>

        {/* Empty block */}
        <div className="bg-gray-100 rounded-lg p-6" />
      </div>
    </div>
  );
}

// Tooltip component with Headless UI animation
function Tooltip({ icon, label }: { icon: React.ReactNode; label: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button className="text-gray-500 hover:text-gray-700">{icon}</button>
      <Transition
        show={hovered}
        enter="transition ease-out duration-150"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10 shadow-md">
          {label}
        </div>
      </Transition>
    </div>
  );
}
