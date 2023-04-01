import React from "react"
import { useState } from "react"

export default function Game() {
  const [currency, setCurrency] = useState(0)

  const handleHarvest = () => {
    setCurrency(currency + 1)
  }

  return (
    <div className="bg-gray-800 h-screen text-gray-300 flex flex-col justify-between items-center overflow-x-hidden">
      <div className="mt-2 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-gray-300">
          <span className="text-amber-600">Farm</span>prenuer
        </h1>
        <p className="mt-32 font-semibold text-5xl text-green-700 w-screen text-center">
          ${currency}
        </p>
      </div>
      <button
        onClick={handleHarvest}
        className="text-2xl p-10 rounded-2xl bg-amber-700 font-semibold shadow-xl"
      >
        Harvest
      </button>
      <ul className="flex space-x-2 mb-6">
        <li className="text-xl font-semibold p-4 rounded-xl bg-blue-700 shadow-md">
          Crop-type
        </li>
        <li className="text-xl font-semibold p-4 rounded-xl bg-blue-700 shadow-md">
          Upgrades
        </li>
        <li className="text-xl font-semibold p-4 rounded-xl bg-blue-700 shadow-md">
          Settings
        </li>
      </ul>
    </div>
  )
}
