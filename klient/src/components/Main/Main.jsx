import Posty from '../Posty/Posty.jsx'
import React from 'react';
import {Link} from 'react-router-dom';
import styles from './style.module.css'

const Main = () => {
    const handleLogout = () => {
    localStorage.removeItem("token")
    window.location.reload()
    }
    const login = () => {
        return sessionStorage.getItem("login")
    }
    return (
        <div className={styles.main_container}>
            <nav className={styles.navbar}>
                <h1>Witaj, {login()}</h1>
                <Link to="/all">
                    <button className={styles.red_btn} >Zobacz wszystko!</button>
                </Link>
                <button className={styles.white_btn} onClick={handleLogout}>Wyloguj się</button>
            </nav>
            <Posty/>
</div>
)
}
export default Main