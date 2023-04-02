import React, { useEffect } from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Modal from "./Modal"

export default function Game() {
  const [currency, setCurrency] = useState(0)
  const [currencyPerSecond, setCurrencyPerSecond] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [activeMenuButton, setActiveMenuButton] = useState(null)
  const [upgrades, setUpgrades] = useState([
    {
      id: 1,
      name: "Employee",
      price: 100,
      multiplier: 2,
      owned: 0,
    },
    {
      id: 2,
      name: "Tractor",
      price: 500,
      multiplier: 5,
      owned: 0,
    },
    {
      id: 3,
      name: "Silo",
      price: 1000,
      multiplier: 10,
      owned: 0,
    },
  ])

  const open = (button) => {
    setModalOpen(true)
    setActiveMenuButton(button)
  }
  const close = () => {
    setModalOpen(false)
    setActiveMenuButton(null)
  }

  const handleHarvest = () => {
    setCurrency(currency + 1)
  }

  // Increment currency by currencyPerSecond every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrency((currency) => currency + currencyPerSecond)
    }, 1000)
    return () => clearInterval(interval)
  }, [currencyPerSecond])

  return (
    <AnimatePresence initial={false} wait={true} onExitComplete={() => null}>
      <div className="bg-gray-800 h-screen text-gray-300 flex flex-col justify-between items-center overflow-x-hidden">
        {modalOpen && (
          <Modal
            modalOpen={modalOpen}
            handleClose={close}
            activeMenuButton={activeMenuButton}
            upgrades={upgrades}
            setUpgrades={setUpgrades}
          />
        )}
        <div className="mt-2 flex flex-col items-center">
          <h1 className="text-4xl font-bold text-gray-300">
            <span className="text-amber-600">Farm</span>prenuer
          </h1>
          <p className="mt-32 font-semibold text-5xl text-green-700 w-screen text-center">
            ${currency}
          </p>
          <p className="font-medium text-2xl w-screen text-center mt-4">
            ${!currencyPerSecond && "0"} per second
          </p>
        </div>
        <motion.button
          onClick={handleHarvest}
          className="text-2xl p-10 rounded-2xl bg-amber-800 font-semibold shadow-xl"
          whileTap={{ scale: 1.05 }}
        >
          Harvest
        </motion.button>
        <ul className="flex space-x-2 mb-20">
          <motion.li
            whileTap={{ scale: 1.05 }}
            className="cursor-pointer text-xl font-semibold p-4 rounded-xl bg-blue-700 shadow-md"
            onClick={() => (modalOpen ? close() : open("crop-type"))}
          >
            Crop-type
          </motion.li>
          <motion.li
            whileTap={{ scale: 1.05 }}
            className="cursor-pointer text-xl font-semibold p-4 rounded-xl bg-blue-700 shadow-md"
            onClick={() => (modalOpen ? close() : open("upgrades"))}
          >
            Upgrades
          </motion.li>
          <motion.li
            whileTap={{ scale: 1.05 }}
            className="cursor-pointer text-xl font-semibold p-4 rounded-xl bg-blue-700 shadow-md"
            onClick={() => (modalOpen ? close() : open("settings"))}
          >
            Settings
          </motion.li>
        </ul>
      </div>
    </AnimatePresence>
  )
}
