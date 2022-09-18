import React from 'react'
import styles from "../styles/Login.module.css"

function Login() {
  return (
        <div className={styles.loginMain}>
                <div>
                    <div className={styles.loginImg}>
                        <img src='/listen.png'/>
                    </div>
                </div>
                <div className={styles.content}>
                    <h1>Welcome to Tunify</h1>
                    <h3>Register to become a member or Connect your Wallet</h3>
                    <input type="text" placeholder="Enter your Name"></input>
                    <button>Register</button>
                    <h4>OR</h4>
                    <button>Connect Wallet</button>
                </div>
        </div>
  )
}

export default Login