import React from 'react'
import { easeIn, motion } from 'framer-motion'

export default function Loader() {
  return (
    <div className="flex justify-center items-center h-full">
      <motion.div className=' loading-lg loading loading-spinner text-primary'
      animate={
        {
            scale:[1,1.5,1]
        }
      }
      transition={
        {
            duration:1.5,
            ease:'easeInOut',
        repeat:Infinity
        }
      }
      ></motion.div>
    </div>
  )
}
