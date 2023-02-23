import React from 'react'
import {motion} from 'framer-motion'
const AuthFailedPopup = () => {
  return (
    <motion.div initial={ { opacity: 0, y :-20 } } animate={{ y: 0 , opacity: 1 }} className='auth-failed-popup popup'>
        Invalid username/email or password, please try again
    </motion.div>
  )
}

export default AuthFailedPopup