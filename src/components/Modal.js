import React from "react"
import Backdrop from "./Backdrop"
import { motion } from "framer-motion"

export default function Modal({ handleClose }) {
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
      y: "100vh",
      opacity: 0,
    },
  }
  return (
    <Backdrop onClick={handleClose}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className="bg-gray-600 rounded fixed inset-0 h-80 w-64 m-auto p-3"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <p className="text-2xl text-center">Modal</p>
        <button onClick={handleClose}>Close</button>
      </motion.div>
    </Backdrop>
  )
}
