import React from 'react'
import styles from "../styles/Dashboard.module.css"
import {BsSuitHeart} from "react-icons/bs"
import {FiPlay} from "react-icons/fi"

function Dashboard() {
  return (
    <div className={styles.dashHome}>
        <div className={styles.head}>
            <h1>Discover</h1>
        </div>
        <div className={styles.discover}>
            <div className={styles.library}>
                <h4>Your Library</h4>
                <div className={styles.songs}>
                    <p>1.</p>
                    <p>The Divine Feminine </p>
                    <p> Mac Miller</p>
                    <p>3:57</p>
                    <FiPlay/>
                </div>
            </div>
            <div className={styles.uploads}>
                <h4>New uploads</h4>
                <div className={styles.songs}>
                    <p>1.</p>
                    <p>The Divine Feminine </p>
                    <p> Mac Miller</p>
                    <p>3:57</p>
                    <BsSuitHeart/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard