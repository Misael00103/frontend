"use client"

import type React from "react"

import { motion } from "framer-motion"

const variants = {
  hidden: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: 0.5 } },
  exit: { opacity: 0, transition: { duration: 0.5 } },
}

const PageTransition = ({ children }: { children: React.ReactNode }) => (
  <motion.div variants={variants} initial="hidden" animate="enter" exit="exit">
    {children}
  </motion.div>
)

export default PageTransition

