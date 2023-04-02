import React, { useEffect, useRef } from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Modal from "./Modal"

export default function Game() {
  const [currency, setCurrency] = useState(97)
  const [currencyPerSecond, setCurrencyPerSecond] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [activeMenuButton, setActiveMenuButton] = useState(null)
  const [upgrades, setUpgrades] = useState([
    {
      id: 1,
      name: "Employee",
      price: 100,
      multiplier: 0.25,
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
  const [upgradePing, setUpgradePing] = useState(false)
  const achieveOne = useRef(false)

  const purchaseUpgrade = (upgradeId) => {
    const upgrade = upgrades.find((u) => u.id === upgradeId)

    if (!upgrade) {
      console.log(`Upgrade with id ${upgradeId} not found`)
      return
    }
    // Check if user has enough currency
    if (currency < upgrade.price) {
      console.log(
        `Player does not have enough money to purchase ${upgrade.name}`
      )
      return
    }
    // Subtract the cost of the upgrade from users currency
    setCurrency(currency - upgrade.price)

    // Update how many upgrades a user has bought
    const updatedUpgrades = upgrades.map((u) => {
      if (u.id === upgradeId) {
        return {
          ...u,
          owned: u.owned + 1,
        }
      }
      return u
    })

    setUpgrades(updatedUpgrades)

    // Add the the upgrades multiplier to the currencyPerSecond
    setCurrencyPerSecond((prevCPS) => prevCPS + upgrade.multiplier)
  }

  const open = (button) => {
    setModalOpen(true)
    setActiveMenuButton(button)
  }
  const close = () => {
    setModalOpen(false)
    setActiveMenuButton(null)
  }

  const handleHarvestClick = () => {
    setCurrency(currency + 1)
  }

  // Achievements
  const achievementOne = () => {
    setUpgradePing(true)
  }

  // Increment currency by currencyPerSecond every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrency((currency) => currency + currencyPerSecond)
    }, 1000)
    return () => clearInterval(interval)
  }, [currencyPerSecond])

  // Check if user reached a certain currency
  useEffect(() => {
    if (currency >= 100 && !achieveOne.current) {
      achieveOne.current = true
      achievementOne()
    }
  }, [currency])

  const fadeInOut = {
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

  return (
    <div className="bg-gray-800 h-screen text-gray-300 flex flex-col justify-between items-center overflow-x-hidden">
      <AnimatePresence initial={false} wait={true} onExitComplete={() => null}>
        {modalOpen && (
          <Modal
            key="modal"
            modalOpen={modalOpen}
            handleClose={close}
            activeMenuButton={activeMenuButton}
            upgrades={upgrades}
            setUpgrades={setUpgrades}
            purchaseUpgrade={purchaseUpgrade}
            currency={currency}
            fadeInOut={fadeInOut}
            upgradePing={upgradePing}
            setUpgradePing={setUpgradePing}
          />
        )}
      </AnimatePresence>
      <div className="mt-2 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-gray-300">
          <span className="text-amber-600">Farm</span>prenuer
        </h1>
        <p className="mt-32 font-semibold text-5xl text-green-700 w-screen text-center">
          ${currency.toFixed(2)}
        </p>
        {upgrades.some((u) => u.owned > 0) && (
          <p className=" text-xl w-screen text-center mt-6">
            Earns ${currencyPerSecond.toFixed(2)} per second
          </p>
        )}
      </div>
      <motion.button
        onClick={handleHarvestClick}
        className="text-2xl p-10 rounded-2xl bg-amber-800 font-semibold shadow-xl select-none"
        whileTap={{ scale: 1.05 }}
      >
        Harvest
      </motion.button>
      <ul className="flex space-x-2 mb-20">
        <motion.li
          whileTap={{ scale: 1.05 }}
          className="cursor-pointer text-xl font-semibold p-4 rounded-xl bg-blue-700 shadow-md select-none"
          onClick={() => (modalOpen ? close() : open("crop-type"))}
        >
          Crop-type
        </motion.li>
        <motion.li
          whileTap={{ scale: 1.05 }}
          className="cursor-pointer text-xl font-semibold p-4 rounded-xl bg-blue-700 shadow-md select-none relative"
          onClick={() =>
            setUpgradePing(false) && modalOpen ? close() : open("upgrades")
          }
        >
          Upgrades
          <AnimatePresence
            initial={false}
            wait={true}
            onExitComplete={() => null}
          >
            {upgradePing && (
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
        </motion.li>
        <motion.li
          whileTap={{ scale: 1.05 }}
          className="cursor-pointer text-xl font-semibold p-4 rounded-xl bg-blue-700 shadow-md select-none"
          onClick={() => (modalOpen ? close() : open("settings"))}
        >
          Settings
        </motion.li>
      </ul>
    </div>
  )
}
