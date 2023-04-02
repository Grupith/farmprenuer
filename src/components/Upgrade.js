import { AnimatePresence, motion } from "framer-motion"
import React, { useEffect, useState } from "react"

export default function Upgrade({
  id,
  owned,
  name,
  multiplier,
  price,
  purchaseUpgrade,
  currency,
  handleClose,
  fadeInOut,
  upgradePing,
  setUpgradePing,
}) {
  const [upgradeUnlocked, setUpgradeUnlocked] = useState(false)

  // Unlock the upgrade when user reaches price
  useEffect(() => {
    if (currency >= price) {
      setUpgradeUnlocked(true)
    }
  }, [currency, price])

  const handlePurchase = () => {
    purchaseUpgrade(id)
    if (upgradeUnlocked) {
      handleClose()
      setUpgradePing(false)
    }
  }

  return (
    <div
      className={`rounded-lg shadow-lg p-3 flex relative items-center w-full justify-between mt-4 ${
        upgradeUnlocked ? "bg-amber-800" : "bg-red-900 hover:bg-red-800"
      } hover:bg-amber-700 cursor-pointer`}
      onClick={handlePurchase}
    >
      <div>
        <p className="text-4xl">{owned}</p>
      </div>
      <div className="flex flex-col">
        <h3 className="text-xl font-medium">{name}</h3>
        <p>Earns ${multiplier} per second</p>
      </div>
      <div>
        <p className="text-xl">${price}</p>
      </div>
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
