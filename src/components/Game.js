import React, { useEffect, useRef } from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Modal from "./Modal"

export default function Game() {
  const [currency, setCurrency] = useState(499)
  const [currencyPerSecond, setCurrencyPerSecond] = useState(0)
  const [currenyPerClick, setCurrencyPerClick] = useState(0.1)
  const [modalOpen, setModalOpen] = useState(false)
  const [activeMenuButton, setActiveMenuButton] = useState(null)
  const [upgradePing, setUpgradePing] = useState(false)
  const [upgrades, setUpgrades] = useState([
    {
      id: 1,
      name: "Tractor",
      price: 100,
      multiplier: 0.15,
      owned: 0,
      description: "Increases your farming efficiency by 15%.",
    },
    {
      id: 2,
      name: "Grain Bin",
      price: 250,
      multiplier: 0.25,
      owned: 0,
      description:
        "Stores more grain, allowing you to increase your profits by 25%.",
    },
    {
      id: 3,
      name: "Field",
      price: 500,
      multiplier: 0.4,
      owned: 0,
      description:
        "Expands your farming operations, providing a 40% boost to your earnings.",
    },
    {
      id: 4,
      name: "Greenhouse",
      price: 1000,
      multiplier: 0.65,
      owned: 0,
      description:
        "Enables you to grow crops year-round and increases profits by 65%.",
    },
    {
      id: 5,
      name: "Livestock Pen",
      price: 2000,
      multiplier: 1.05,
      owned: 0,
      description:
        "Allows you to raise animals and earn more money from their products, increasing profits by 105%.",
    },
    {
      id: 6,
      name: "Irrigation System",
      price: 5000,
      multiplier: 1.7,
      owned: 0,
      description:
        "Provides a steady supply of water to your crops, boosting profits by 170%.",
    },
  ])
  const [croptypes, setCroptypes] = useState([
    {
      id: 1,
      name: "Wheat",
      price: 500,
      multiplier: 0.3,
      owned: 0,
      description:
        "Boosts your manual clicking rate with the power of freshly harvested wheat.",
    },
    {
      id: 2,
      name: "Corn",
      price: 1000,
      multiplier: 0.5,
      owned: 0,
      description:
        "The power of corn helps you click faster and earn more coins.",
    },
    {
      id: 3,
      name: "Tomato",
      price: 3000,
      multiplier: 0.8,
      owned: 0,
      description:
        "Use the juicy, ripe tomatoes to supercharge your clicking speed and earn coins even faster.",
    },
  ])
  // Set upgradeRefs to false becuase user has not reached Upgrade price
  const firstUpgradeRef = useRef(false)
  const secondUpgradeRef = useRef(false)
  const thirdUpgradeRef = useRef(false)
  const fourthUpgradeRef = useRef(false)
  const fifthUpgradeRef = useRef(false)
  const sixthUpgradeRef = useRef(false)

  // Purchase an upgrade from the upgrades menu in the Modal
  const purchaseUpgrade = (upgradeId) => {
    const upgrade = upgrades.find((u) => u.id === upgradeId)

    if (!upgrade) {
      console.log(`Upgrade with id ${upgradeId} not found`)
      return
    }
    // Only allow if user has enough currency to purchase
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
  // Purchase an croptype from the crop-type menu in the Modal
  const purchaseCroptype = (croptypeId) => {
    const croptype = croptypes.find((crop) => crop.id === croptypeId)

    if (!croptype) {
      console.log(`croptype with id ${croptypeId} not found`)
      return
    }
    // Only allow if user has enough currency to purchase
    if (currency < croptype.price) {
      console.log(
        `Player does not have enough money to purchase ${croptype.name}`
      )
      return
    }
    // Subtract the cost of the croptype from users currency
    setCurrency(currency - croptype.price)

    // Update how many upgrades a user has bought
    const updatedCroptypes = croptypes.map((crop) => {
      if (crop.id === croptypeId) {
        return {
          ...crop,
          owned: crop.owned + 1,
        }
      }
      return crop
    })

    setUpgrades(updatedCroptypes)

    //TODO: Add the the croptypes multiplier to the currencyPerClick
    setCurrencyPerClick((prevCPC) => prevCPC + croptype.multiplier)
  }

  const open = (button) => {
    setModalOpen(true)
    setActiveMenuButton(button)
  }
  const close = () => {
    setModalOpen(false)
    setActiveMenuButton(null)
  }

  // Handlle the manual user click
  const handleHarvestClick = () => {
    setCurrency(currency + currenyPerClick)
  }

  // setUpgradePing to display when user has a new upgrade avaliable
  const reachUpgrade = () => {
    console.log("reachUpgrade")
    setUpgradePing(true)
  }

  // Increment currency by currencyPerSecond every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrency((currency) => currency + currencyPerSecond)
    }, 1000)
    return () => clearInterval(interval)
  }, [currencyPerSecond])

  // Check if user reached a certain upgrade
  useEffect(() => {
    if (currency >= 100 && !firstUpgradeRef.current) {
      firstUpgradeRef.current = true
      reachUpgrade()
      console.log("first upgrade Ref when useEffect ran is", firstUpgradeRef)
    }
    if (currency >= 250 && !secondUpgradeRef.current) {
      secondUpgradeRef.current = true
      reachUpgrade()
      console.log("second upgrade Ref when useEffect ran is", secondUpgradeRef)
    }
    if (currency >= 500 && !thirdUpgradeRef.current) {
      thirdUpgradeRef.current = true
      reachUpgrade()
      console.log("third upgrade Ref when useEffect ran is", thirdUpgradeRef)
    }
    if (currency >= 1000 && !fourthUpgradeRef.current) {
      fourthUpgradeRef.current = true
      reachUpgrade()
      console.log("fourth upgrade Ref when useEffect ran is", fourthUpgradeRef)
    }
    if (currency >= 2000 && !fifthUpgradeRef.current) {
      fifthUpgradeRef.current = true
      reachUpgrade()
      console.log("fifth upgrade Ref when useEffect ran is", fifthUpgradeRef)
    }
    if (currency >= 5000 && !sixthUpgradeRef.current) {
      sixthUpgradeRef.current = true
      reachUpgrade()
      console.log("sixth upgrade Ref when useEffect ran is", sixthUpgradeRef)
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
            croptypes={croptypes}
            setCroptypes={setCroptypes}
            purchaseCroptype={purchaseCroptype}
          />
        )}
      </AnimatePresence>
      <div className="mt-2 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-gray-300 select-none">
          <span className="text-amber-600">Farm</span>prenuer
        </h1>
        <p className="mt-32 font-semibold text-5xl text-green-700 w-screen text-center select-none">
          ${currency.toFixed(2)}
        </p>
        {upgrades.some((u) => u.owned > 0) && (
          <p className=" text-xl w-screen text-center mt-6 select-none">
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
            setUpgradePing(false) && setActiveMenuButton(false) && modalOpen
              ? close()
              : open("upgrades")
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
