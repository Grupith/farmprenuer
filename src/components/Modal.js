import React from "react"
import Backdrop from "./Backdrop"
import { motion } from "framer-motion"
import Upgrade from "./Upgrade"
import { MdCancel } from "react-icons/md"

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
    // Render Crop-type Menu
    case "crop-type":
      return (
        <Backdrop onClick={handleClose}>
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="bg-gray-800 rounded-xl fixed inset-0 h-64 w-48 m-auto select-none p-4"
            variants={fadeInOut}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex justify-end">
              <MdCancel
                onClick={handleClose}
                className="h-6 w-6 cursor-pointer"
              />
            </div>
            <p className="text-2xl text-center">Crop-types</p>
          </motion.div>
        </Backdrop>
      )
    // Render Upgrades Menu
    case "upgrades":
      return (
        <Backdrop onClick={handleClose}>
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="bg-gray-800 rounded-xl fixed inset-0 h-fit w-fit m-auto select-none p-4 pb-10"
            variants={fadeInOut}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex justify-end">
              <MdCancel
                onClick={handleClose}
                className="h-6 w-6 cursor-pointer"
              />
            </div>
            <h2 className="text-3xl text-center font-semibold text-amber-600">
              Upgrades
            </h2>
            <p className="text-center mt-6 mb-6">
              Click on an upgrade you would like to purchase
            </p>
            <ul className="h-80 overflow-y-auto overflow-x-hidden px-2 pt-6 z-50">
              {upgrades.map((upgrade) => (
                <Upgrade
                  key={upgrade.id}
                  id={upgrade.id}
                  owned={upgrade.owned}
                  name={upgrade.name}
                  multiplier={upgrade.multiplier}
                  price={upgrade.price}
                  description={upgrade.description}
                  purchaseUpgrade={purchaseUpgrade}
                  currency={currency}
                  handleClose={handleClose}
                  fadeInOut={fadeInOut}
                  upgradePing={upgradePing}
                  setUpgradePing={setUpgradePing}
                />
              ))}
            </ul>
          </motion.div>
        </Backdrop>
      )
    // Render Settings Menu
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
            <div className="flex justify-end">
              <MdCancel
                onClick={handleClose}
                className="h-6 w-6 cursor-pointer"
              />
            </div>
            <p className="text-2xl text-center">Settings</p>
          </motion.div>
        </Backdrop>
      )
    default:
      return null
  }
}
