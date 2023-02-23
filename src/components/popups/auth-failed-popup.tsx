import React from 'react'
import {motion} from 'framer-motion'
const AuthFailedPopup = () => {
  return (
    <motion.div className='auth-failed-popup'>
        Invalid username/email or password
    </motion.div>
  )
}

export default AuthFailedPopup