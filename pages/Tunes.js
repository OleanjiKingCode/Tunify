import React from 'react'
import styles from "../styles/Tunes.module.css"
import {BsPlayCircleFill, BsSuitHeart} from "react-icons/bs"
import {ImStarEmpty} from "react-icons/im"

function Tunes() {
  return (
    <div className={styles.tunesHome}>
        <div className={styles.head}>
            <h1>Discover</h1>
        </div>
        <div className={styles.music}>
            <div className={styles.card}>
              <img src='/luffy.png'></img>
              <div className={styles.cardHeader}>
                <h4>LUFFY #34</h4>
                <ImStarEmpty size={25}/>
              </div>
              <h5>PIRATE KING FLOW</h5>
              <p>card description</p>
              <div className={styles.playBtn}>
                <BsPlayCircleFill size={50}/>
              </div>
            </div>
            <div className={styles.card}>
              <img src='/luffy.png'></img>
              <div className={styles.cardHeader}>
                <h4>LUFFY #34</h4>
                <ImStarEmpty size={25}/>
              </div>
              <h5>PIRATE KING FLOW</h5>
              <p>card description</p>
              <div className={styles.playBtn}>
                <BsPlayCircleFill size={50}/>
              </div>
            </div>
            <div className={styles.card}>
              <img src='/luffy.png'></img>
              <div className={styles.cardHeader}>
                <h4>LUFFY #34</h4>
                <ImStarEmpty size={25}/>
              </div>
              <h5>PIRATE KING FLOW</h5>
              <p>card description</p>
              <div className={styles.playBtn}>
                <BsPlayCircleFill size={50}/>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Tunes