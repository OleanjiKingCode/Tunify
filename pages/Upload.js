import React from 'react'
import styles from '../styles/Upload.module.css'

function Upload() {
  return (
    <div className={styles.uploadMain}>
        <h1>Upload Your Own Music and Get Paid for Every Stream, MONTHLY!</h1>
        <input type="file" accept="audio/*"/>
        <button>Upload to Tunify NOW!</button>
    </div>
  )
}

export default Upload