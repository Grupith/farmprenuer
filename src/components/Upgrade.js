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
}) {
  const [upgradeUnlocked, setUpgradeUnlocked] = useState(false)

  useEffect(() => {
    if (currency >= price) {
      setUpgradeUnlocked(true)
    }
  }, [currency, price])

  const handlePurchase = () => {
    purchaseUpgrade(id)
    handleClose()
  }

  return (
    <div
      className={`rounded-lg shadow-lg p-3 flex items-center w-full justify-between mt-4 ${
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
    </div>
  )
}
