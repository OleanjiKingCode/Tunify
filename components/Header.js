import React, {useState} from 'react'
import styles from './Header.module.css'
import Link from 'next/link'
import {RiMenu3Line, RiCloseLine} from "react-icons/ri"
import {motion} from 'framer-motion'
import { ConnectButton } from '@rainbow-me/rainbowkit';

function Header() {
  const [toggleMenu, setToggleMenu] = useState(false)




  return (
    <>
      <div className={styles.header}>
        <div className={styles.logo}>
          <img src='/head3.png' className={styles.logoImg}></img>
          <Link href="/" passHref><h1>TUNIFY</h1></Link>
        </div>

        <div className={styles.headerLinks}>
          <Link href="/Login" passHref><p>LOGIN</p></Link>
          <Link href="/Dashboard" passHref><p>Dashboard</p></Link>
          <Link href="/Tunes"passHref><p>Tunes</p></Link>
          <p>Albums</p>
          <Link href="/Upload" passHref><p>Upload to Tunify</p></Link>
        </div>

        <div className={styles.button}>
          <button>CONNECT</button>
          <RiMenu3Line size={26} onClick = {()=>{setToggleMenu(true)}} className={styles.menuLine}/>
        </div>

        {toggleMenu && (
                 <motion.div initial={{x:300}} animate={{x:0}} transition={{type:"spring", duration:1.5, bounce:0.3,}} className={styles.burgerNav}>
                 <div className={styles.closeDiv}> <RiCloseLine size={26} onClick = {()=>{setToggleMenu(false)}}/> </div>
                 <Link href="/Login" passHref><p>LOGIN</p></Link>
                <Link href="/Dashboard" passHref><p>Dashboard</p></Link>
                <Link href="/Tunes"passHref><p>Tunes</p></Link>
                <p>Albums</p>
                <Link href="/Upload" passHref><p>Upload to Tunify</p></Link>
                 {/* <button className={styles.burgerBtn}>CONNECT</button> */}
                 <ConnectButton />
               </motion.div>
        )}
 
      </div>
    </>
  )
}

export default Header