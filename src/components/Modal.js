import React from "react"
import Backdrop from "./Backdrop"
import { motion } from "framer-motion"
import Upgrade from "./Upgrade"

export default function Modal({
  handleClose,
  activeMenuButton,
  upgrades,
  purchaseUpgrade,
  currency,
  fadeInOut,
  upgradePing,
  setUpgradePing,
}) {
  switch (activeMenuButton) {
    case "crop-type":
      return (
        <Backdrop onClick={handleClose}>
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="bg-gray-600 rounded-xl fixed inset-0 h-80 w-64 m-auto p-3"
            variants={fadeInOut}
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
            className="bg-gray-800 rounded-xl fixed inset-0 h-fit w-fit m-auto select-none p-4"
            variants={fadeInOut}
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
            <ul className="h-80 overflow-y-auto overflow-x-hidden px-2">
              {upgrades.map((upgrade) => (
                <Upgrade
                  key={upgrade.id}
                  id={upgrade.id}
                  owned={upgrade.owned}
                  name={upgrade.name}
                  multiplier={upgrade.multiplier}
                  price={upgrade.price}
                  purchaseUpgrade={purchaseUpgrade}
                  currency={currency}
                  handleClose={handleClose}
                  fadeInOut={fadeInOut}
                  upgradePing={upgradePing}
                  setUpgradePing={setUpgradePing}
                />
              ))}
            </ul>
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
            variants={fadeInOut}
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
