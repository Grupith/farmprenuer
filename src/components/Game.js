import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Modal from "./Modal"
import canolaIcon from "../assets/canola-icon.png"
import wheatIcon from "../assets/wheat-icon.png"
import cornIcon from "../assets/corn-icon.png"
import tomatoIcon from "../assets/tomato-icon.png"
import backgroundImage from "../assets/farm-background.jpg"
import woodenSign from "../assets/wooden-sign.png"

export default function Game() {
  const [currency, setCurrency] = useState(0)
  const [currencyPerSecond, setCurrencyPerSecond] = useState(0)
  const [currencyPerClick, setCurrencyPerClick] = useState(0.1)
  const [modalOpen, setModalOpen] = useState(false)
  const [activeMenuButton, setActiveMenuButton] = useState(null)
  const [upgradePing, setUpgradePing] = useState(false)
  const [croptypePing, setCroptypePing] = useState(false)
  const [showClick, setShowClick] = useState(false)
  const [croptypeImage, setCroptypeImage] = useState("")

  const initialUpgrades = [
    {
      id: 1,
      name: "Tractor",
      price: 100,
      multiplier: 0.15,
      owned: 0,
      description: "Increases your farming efficiency by 15%.",
      firstVisit: true,
    },
    {
      id: 2,
      name: "Grain Bin",
      price: 250,
      multiplier: 0.25,
      owned: 0,
      description:
        "Stores more grain, allowing you to increase your profits by 25%.",
      firstVisit: true,
    },
    {
      id: 3,
      name: "Field",
      price: 500,
      multiplier: 0.4,
      owned: 0,
      description:
        "Expands your farming operations, providing a 40% boost to your earnings.",
      firstVisit: true,
    },
    {
      id: 4,
      name: "Greenhouse",
      price: 1000,
      multiplier: 0.65,
      owned: 0,
      description:
        "Enables you to grow crops year-round and increases profits by 65%.",
      firstVisit: true,
    },
    {
      id: 5,
      name: "Livestock Pen",
      price: 2000,
      multiplier: 1.05,
      owned: 0,
      description:
        "Allows you to raise animals and earn more money from their products, increasing profits by 105%.",
      firstVisit: true,
    },
    {
      id: 6,
      name: "Irrigation System",
      price: 5000,
      multiplier: 1.7,
      owned: 0,
      description:
        "Provides a steady supply of water to your crops, boosting profits by 170%.",
      firstVisit: true,
    },
  ]
  const [upgrades, setUpgrades] = useState(initialUpgrades)
  const initialCroptypes = [
    {
      id: 1,
      name: "Wheat",
      price: 500,
      multiplier: 0.3,
      owned: 0,
      description:
        "Boosts your manual clicking rate with the power of freshly harvested wheat.",
      firstVisit: true,
      icon: {
        name: "wheatIcon",
        src: wheatIcon,
        alt: "Harvest Wheat Icon",
      },
    },
    {
      id: 2,
      name: "Corn",
      price: 1000,
      multiplier: 0.5,
      owned: 0,
      description:
        "The power of corn helps you click faster and earn more coins.",
      firstVisit: true,
      icon: {
        name: "cornIcon",
        src: cornIcon,
        alt: "Harvest Corn Icon",
      },
    },
    {
      id: 3,
      name: "Tomato",
      price: 3000,
      multiplier: 0.8,
      owned: 0,
      description:
        "Use the juicy, ripe tomatoes to supercharge your clicking speed and earn coins even faster.",
      firstVisit: true,
      icon: {
        name: "tomatoIcon",
        src: tomatoIcon,
        alt: "Harvest Tomato Icon",
      },
    },
  ]
  const [croptypes, setCroptypes] = useState(initialCroptypes)
  // Checks which button is clicked to render the specific menu in Modal component
  const open = (button) => {
    setModalOpen(true)
    setActiveMenuButton(button)
  }
  const close = () => {
    setModalOpen(false)
    setActiveMenuButton(null)
  }

  // Increment currency by currencyPerSecond every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrency((currency) => currency + currencyPerSecond)
    }, 1000)
    return () => clearInterval(interval)
  }, [currencyPerSecond])

  // Handlle the manual user click
  const handleHarvestClick = () => {
    setCurrency(currency + currencyPerClick)
    setShowClick(true)
    setTimeout(() => {
      setShowClick(false)
    }, 150)
  }

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

    // Update how many croptypes a user has bought
    const updatedCroptypes = croptypes.map((crop) => {
      if (crop.id === croptypeId) {
        return {
          ...crop,
          owned: crop.owned + 1,
        }
      }
      return crop
    })

    setCroptypes(updatedCroptypes)

    // Change the croptypes multiplier to the currencyPerClick
    setCurrencyPerClick((prevCPC) => prevCPC + croptype.multiplier)
  }

  // Show upgradePing on button if user has reached upgrade for the first time
  useEffect(() => {
    upgrades.map((upgrade) => {
      if (currency >= upgrade.price && upgrade.firstVisit) {
        setUpgradePing(true)
        setUpgrades(
          upgrades.map((u) =>
            u.price === upgrade.price ? { ...u, firstVisit: false } : u
          )
        )
      }
      return upgrade
    })
  }, [currency, upgrades])

  // Show croptypePing on button if user has reached croptype for the first time
  useEffect(() => {
    croptypes.map((croptype) => {
      if (currency >= croptype.price && croptype.firstVisit) {
        setCroptypePing(true)
        setCroptypes(
          croptypes.map((crop) =>
            crop.price === croptype.price
              ? { ...crop, firstVisit: false }
              : crop
          )
        )
      }
      return croptype
    })
  }, [currency, croptypes])

  // Retreive the localStorage if it exists
  useEffect(() => {
    const storedCurrency = localStorage.getItem("currency")
    const storedCPS = localStorage.getItem("currencyPerSecond")
    const storedCPC = localStorage.getItem("currencyPerClick")
    const storedUpgrades = localStorage.getItem("upgrades")
    const storedCroptypes = localStorage.getItem("croptypes")
    storedCurrency && setCurrency(JSON.parse(storedCurrency))
    storedCPS && setCurrencyPerSecond(JSON.parse(storedCPS))
    storedCPC && setCurrencyPerClick(JSON.parse(storedCPC))
    storedUpgrades && setUpgrades(JSON.parse(storedUpgrades))
    storedCroptypes && setCroptypes(JSON.parse(storedCroptypes))
    console.log("get Items")
  }, [])

  // Set the localStorage when currency, CPS and CPC changes
  useEffect(() => {
    currency > 0 && localStorage.setItem("currency", JSON.stringify(currency))
    currencyPerSecond > 0 &&
      localStorage.setItem(
        "currencyPerSecond",
        JSON.stringify(currencyPerSecond)
      )
    currencyPerClick > 0.1 &&
      localStorage.setItem("currencyPerClick", JSON.stringify(currencyPerClick))
    console.log("set Items")
    upgrades.map((u) => {
      if (u.owned > 0) {
        localStorage.setItem("upgrades", JSON.stringify(upgrades))
      }
      return u
    })
    croptypes.map((crop) => {
      if (crop.owned > 0) {
        localStorage.setItem("croptypes", JSON.stringify(croptypes))
      }
      return crop
    })
  }, [currency, currencyPerSecond, currencyPerClick, upgrades, croptypes])

  const clearLocalStorage = () => {
    setCurrency(0)
    setUpgrades(initialUpgrades)
    setCroptypes(initialCroptypes)
    setCurrencyPerSecond(0)
    setCurrencyPerClick(0.1)
    localStorage.clear()
    close()
  }

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

  useEffect(() => {
    const ownedCroptypes = croptypes.filter((crop) => crop.owned >= 1)
    if (ownedCroptypes.length > 0) {
      const latestOwnedCrop = ownedCroptypes[ownedCroptypes.length - 1]
      setCroptypeImage(latestOwnedCrop.icon)
    }
  }, [croptypes])

  return (
    <div className="bg-gray-800 h-screen text-gray-300 flex flex-col justify-between items-center overflow-x-hidden relative">
      <img
        src={backgroundImage}
        alt="wallpaper"
        className="absolute w-fit h-full"
      />
      <div className="bg-black bg-opacity-60 h-screen w-screen absolute z-10"></div>
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
            clearLocalStorage={clearLocalStorage}
          />
        )}
      </AnimatePresence>
      <div className="mt-2 flex flex-col items-center relative z-20">
        <h1 className="text-5xl font-bold text-gray-400 select-none">
          <span className="text-amber-600">Farm</span>prenuer
        </h1>
        <div className="relative mt-28">
          <div className="relative">
            <div className="absolute inset-0 top-4 bottom-28 rounded-md shadow-xl bg-black opacity-40"></div>
            <img
              src={woodenSign}
              alt="wooden sign background"
              className="w-60 h-60 mix-blend-darken"
            />
          </div>
          <p className="font-bold text-4xl text-green-600 select-none absolute top-12 left-14">
            ${currency.toFixed(2)}
          </p>
        </div>
        {upgrades.some((u) => u.owned > 0) && (
          <p className=" text-xl w-screen text-center mt-6 select-none">
            Earns{" "}
            <span className="font-semibold">
              ${currencyPerSecond.toFixed(2)}
            </span>{" "}
            per second
          </p>
        )}
      </div>
      <div className="z-20">
        <motion.button
          onClick={handleHarvestClick}
          className="bg-none select-none relative"
          whileTap={{ scale: 1.05 }}
        >
          <img
            src={croptypeImage ? croptypeImage.src : canolaIcon}
            alt={croptypeImage ? croptypeImage.alt : "Harvest Canola Icon"}
            className="w-28 h-28 select-none"
          />
          {showClick && (
            <p className=" text-xl w-fit text-center select-none m-auto py-1 font-semibold absolute">
              +${currencyPerClick.toFixed(2)}
            </p>
          )}
        </motion.button>
      </div>
      <ul className="flex space-x-2 mb-20 z-20">
        <motion.li
          whileTap={{ scale: 1.05 }}
          className="cursor-pointer text-xl font-semibold p-4 rounded-xl bg-blue-700 shadow-md select-none relative"
          onClick={() =>
            setCroptypePing(false) && modalOpen ? close() : open("crop-type")
          }
        >
          Crop-type
          {croptypePing && (
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
          className="cursor-pointer text-xl font-semibold p-4 rounded-xl bg-blue-700 shadow-md select-none relative"
          onClick={() => (modalOpen ? close() : open("settings"))}
        >
          Settings
        </motion.li>
      </ul>
    </div>
  )
}
