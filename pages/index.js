import Head from 'next/head'

import styles from '../styles/Home.module.css'
import Link from 'next/link'
import {FiMusic} from "react-icons/fi"
import {BsPlayCircleFill} from "react-icons/bs"

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Tunify</title>
        <meta name="description" content="Decentralized Music Streaming Site" />
        <link rel="icon" href="/headphones.png" />
      </Head>


      <div className={styles.mainCont}>
        <div className={styles.main}>
          <div className={styles.texts}>
            <h1>WELCOME TO TUNIFY 🎧,</h1>
            <h1> A DECENTRALIZED MUSIC HOSTING AND STREAMING PLATFORM <FiMusic/></h1>
            <p>Creatives can Upload their Music and get paid monthly on every stream</p>
            <p>Click to the button below to get started</p>
            <Link href="/Login" passHref><button>GET STARTED</button></Link>
          </div>
          <div>
          <div className={styles.cardContainer}>
            <div className={styles.card}>
              <img src='/luffy.png'></img>
              <h4>LUFFY #34</h4>
              <h5>PIRATE KING FLOW</h5>
              <p>Album</p>
              <div className={styles.playBtn}>
                <BsPlayCircleFill size={50}/>
              </div>
            </div>
            <div className={styles.card2}>
              <img src='/zoro.png'></img>
              <h4>PIRATE HUNTER #34</h4>
              <h5>SECOND IN COMMAND</h5>
              <p>Album</p>
              <div className={styles.playBtn}>
                <BsPlayCircleFill size={50}/>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
       
    </div>
  )
}
