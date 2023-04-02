import React from "react"
import Backdrop from "./Backdrop"
import { motion } from "framer-motion"

export default function Modal({
  handleClose,
  activeMenuButton,
  upgrades,
  setUpgrades,
}) {
  const fadeIn = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.2,
      },
    },
    exit: {
      opacity: 0,
    },
  }
  switch (activeMenuButton) {
    case "crop-type":
      return (
        <Backdrop onClick={handleClose}>
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="bg-gray-600 rounded-xl fixed inset-0 h-80 w-64 m-auto p-3"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <p className="text-2xl text-center">Crop-types</p>
            <button onClick={handleClose}>Close</button>
          </motion.div>
        </Backdrop>
      )
    case "upgrades":
      return (
        <Backdrop onClick={handleClose}>
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="bg-gray-800 rounded-xl fixed inset-0 h-fit w-fit m-auto p-5"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <h2 className="text-3xl text-center font-semibold text-amber-600">
              Upgrades
            </h2>
            <p className="text-center mt-6 mb-6">
              Click on an upgrade you would like to purchase
            </p>
            {upgrades.map((upgrade) => (
              <div
                key={upgrade.id}
                className="rounded-lg shadow-lg p-3 flex items-center w-full justify-between mt-4 bg-amber-800 hover:bg-amber-700 cursor-pointer"
              >
                <div>
                  <p className="text-4xl">{upgrade.owned}</p>
                </div>
                <div className="flex flex-col">
                  <h3 className="text-xl font-medium">{upgrade.name}</h3>
                  <p>earns ${upgrade.multiplier} per second</p>
                </div>
                <div>
                  <p className="text-xl">${upgrade.price}</p>
                </div>
              </div>
            ))}
            <div className="flex justify-center mt-6">
              <button onClick={handleClose} className="text-lg">
                Cancel
              </button>
            </div>
          </motion.div>
        </Backdrop>
      )
    case "settings":
      return (
        <Backdrop onClick={handleClose}>
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="bg-gray-600 rounded-xl fixed inset-0 h-80 w-64 m-auto p-3"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <p className="text-2xl text-center">Settings</p>
            <button onClick={handleClose}>Close</button>
          </motion.div>
        </Backdrop>
      )
    default:
      return null
  }
}
