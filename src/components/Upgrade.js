import { AnimatePresence, motion } from "framer-motion"
import React, { useEffect, useState } from "react"
import { MdHelpOutline, MdHelp } from "react-icons/md"

export default function Upgrade({
  id,
  owned,
  name,
  multiplier,
  price,
  description,
  purchaseUpgrade,
  currency,
  handleClose,
  fadeInOut,
  upgradePing,
  setUpgradePing,
}) {
  const [upgradeUnlocked, setUpgradeUnlocked] = useState(false)
  const [showUpgradeInfo, setShowUpgradeInfo] = useState(false)

  // Unlock the upgrade when user reaches price
  useEffect(() => {
    if (currency >= price) {
      setUpgradeUnlocked(true)
    } else {
      setUpgradeUnlocked(false)
    }
  }, [currency, price])

  const handlePurchase = () => {
    purchaseUpgrade(id)
    if (upgradeUnlocked) {
      setUpgradePing(false)
    }
  }

  useEffect(() => {
    if (showUpgradeInfo) {
      console.log("started timeout")
      const timeout = setTimeout(() => {
        setShowUpgradeInfo(false)
      }, 3000)
      return () => {
        clearTimeout(timeout)
        console.log("cleared timeout")
      }
    }
  }, [setShowUpgradeInfo, showUpgradeInfo])

  return (
    <div
      className={`rounded-lg shadow-lg p-3 flex relative items-center w-full justify-between mt-4 select-none ${
        upgradeUnlocked
          ? "bg-green-800 hover:bg-green-700 cursor-pointer"
          : "bg-red-900 hover:bg-red-800 cursor-pointer"
      }`}
      onClick={handlePurchase}
    >
      <div>
        <p className="text-4xl">{owned}</p>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center">
          <h3 className="text-xl font-medium">{name}</h3>
          <div
            className="m-1"
            onClick={() => setShowUpgradeInfo((prev) => !prev)}
          >
            {showUpgradeInfo ? (
              <MdHelp className="h-5 w-5" />
            ) : (
              <MdHelpOutline className="h-5 w-5" />
            )}
          </div>
        </div>
        <p>Earns ${multiplier.toFixed(2)} per second</p>
      </div>
      <div>
        <p className="text-xl">${price}</p>
      </div>
      {showUpgradeInfo && (
        <div className="absolute -top-10 left-20 p-2 bg-cyan-600 text-white text-xs rounded-lg shadow-lg">
          <p>{description}!</p>
        </div>
      )}
      <AnimatePresence initial={false} wait={true} onExitComplete={() => null}>
        {upgradeUnlocked && owned === 0 && (
          <motion.span
            className="absolute flex h-4 w-4 top-0 right-0 -mt-1 -mr-1"
            variants={fadeInOut}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-sky-500"></span>
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}
