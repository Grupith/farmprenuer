import React from "react"
import { motion } from "framer-motion"

export default function Backdrop({ children, onClick }) {
  return (
    <motion.div
      onClick={onClick}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  )
}
