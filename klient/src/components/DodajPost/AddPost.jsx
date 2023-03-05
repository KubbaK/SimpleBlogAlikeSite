import axios from 'axios';
import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import styles from './style.module.css'
import jwt_decode from 'jwt-decode'

const AddPost = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [contactDetails, setContactDetails] = useState("");
    const [message, setMessage] = useState("");
    const [rodzaj,setRodzaj] = useState("Kupno");
    const handleLog = () => {
        localStorage.removeItem("token")
        window.location.reload()
    }
    function handleChange(event) {
            setRodzaj(event.target.value);  
        }
    const login = () => {
        return sessionStorage.getItem("login")
    }
    const handleSubmit = async(e) => {
        const token = jwt_decode(localStorage.getItem("token"))
        const id = token._id
        e.preventDefault();
        try{
            let res = await axios.post("http://localhost:7500/sales",{
                title: title,
                description: description,
                contact_details: contactDetails,
                type: rodzaj,
                user: id
            },
            {headers:{'x-access-token': localStorage.getItem("token")}})
            console.log(res)
            if (res.status === 200) {
                setMessage("Dodano ogłoszenie!");
                console.log(res)
              } else {
                setMessage("Spróbuj jeszcze raz");
                
              }
            } catch (err) {
              console.log(err);
            }
    }
    return (
        <div className={styles.main_container}>
            <nav className={styles.navbar}>
                <h1>Witaj, {login()}</h1>
                <Link to = "/">
                    <button className={styles.back_btn}>Wróc na stronę główną</button>
                </Link>
                <button className={styles.white_btn} onClick={handleLog}>Wyloguj się</button>
            </nav>
        <div className={styles.page_title}>
            <h1>Dodaj nowy post</h1>
        </div>
        <div className = {styles.form_box}>
        <form onSubmit={handleSubmit}>
            <div className ={styles.field1}>
                <div><label className={styles.field1_label}> Tytuł ogłoszenia  </label></div>
                <input className={styles.input} placeholder="Tytuł"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} 
                />
            </div>

            <div className={styles.field2}>
            <div><label className={styles.field2_label}> Treść ogłoszenia </label> </div>
            <textarea className={styles.input2} placeholder="Treść" 
                value={description}
                onChange={(e) => setDescription(e.target.value)} 
             />
            </div>

            <div className={styles.field3}>    
            <div><label className={styles.field3_label}> Dane kontaktowe</label></div>
            <textarea className={styles.input3} placeholder="Kontakt"
                value={contactDetails}
                onChange={(e) => setContactDetails(e.target.value)} 
             />
            </div>

            <div className={styles.select}>
            <div><label>Wybierz rodzaj ogłoszenia:</label></div>
                <select className={styles.select} value={rodzaj} onChange={handleChange}>
                    <option value="kupno">Kupno</option>
                    <option value="sprzedaż">Sprzedaż</option>
                </select>
            </div>
            <button type = "submit" id= "submitBtn" className ={styles.sub_btn}> Dodaj Ogłoszenie</button>
            <div className={styles.message}>{message ? <p>{message}</p> : null}</div>
        </form>
    </div>
</div>
)
}
export default AddPost