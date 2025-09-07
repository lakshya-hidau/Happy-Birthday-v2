"use client"

import { motion } from "motion/react"

export default function HeartbeatLoader({ size = 64, color = "#ec4899" }) {
  return (
    <div className="flex items-center justify-center">
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.2, 1] }}
        transition={{
          repeat: Infinity,
          duration: 0.8,
          ease: "easeInOut"
        }}
      >
        <path
          d="M32 58s-22-13.7-22-30A14 14 0 0132 14a14 14 0 0122 14c0 16.3-22 30-22 30z"
          fill={color}
          stroke="#fff"
          strokeWidth="2"
        />
      </motion.svg>
    </div>
  )
}