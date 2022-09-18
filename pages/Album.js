import React from 'react'
import styles from "../styles/Album.module.css";
import {FiPlay} from "react-icons/fi"

function Album() {
  return (
    <>
        <div className={styles.library}>
            <h1>Your Library</h1>
            <div className={styles.songs}>
                <p>1.</p>
                <p>The Divine Feminine </p>
                <p> Mac Miller</p>
                <p>3:57</p>
                <FiPlay />
            </div>
        </div>
    </>
  )
}

export default Album