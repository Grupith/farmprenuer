import React from "react"
import Backdrop from "./Backdrop"
import { motion } from "framer-motion"
import Upgrade from "./Upgrade"
import Croptype from "./Croptype"
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
  croptypes,
  purchaseCroptype,
}) {
  switch (activeMenuButton) {
    // Render Crop-type Menu
    case "crop-type":
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
            <div className="flex justify-end">
              <MdCancel
                onClick={handleClose}
                className="h-6 w-6 cursor-pointer"
              />
            </div>
            <h2 className="text-3xl text-center font-semibold text-amber-600">
              Crop-types
            </h2>
            <p className="text-center mt-6 mb-6">
              A crop-type upgrades the manual click multiplier
            </p>
            <ul className="h-80 overflow-y-auto overflow-x-hidden px-2 pt-6 z-50">
              {croptypes.map((croptype) => (
                <Croptype
                  key={croptype.id}
                  id={croptype.id}
                  name={croptype.name}
                  price={croptype.price}
                  owned={croptype.owned}
                  description={croptype.description}
                  multiplier={croptype.multiplier}
                  currency={currency}
                  fadeInOut={fadeInOut}
                  purchaseCroptype={purchaseCroptype}
                />
              ))}
            </ul>
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
            className="bg-gray-800 rounded-xl fixed inset-0 h-80 w-64 m-auto select-none p-4"
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
