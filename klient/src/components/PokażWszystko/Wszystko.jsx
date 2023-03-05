import React, {useState,useEffect} from 'react';
import Box from '@mui/system/Box';
import styles from './style.module.css'
import {Link} from 'react-router-dom';
const axios = require('axios')

const Wszystko = () =>{
  const [allSales, setAllSales] = useState([]);
    useEffect(() => {
      axios.get("http://localhost:7500/sales/",{headers:{'x-access-token': localStorage.getItem("token")}})
      .then(response => {
       setAllSales(response.data)}
      );
    },[]);

    const [allComments, setAllComments] = useState([]);
    useEffect(() => {
      axios.get("http://localhost:7500/comments/",{headers:{'x-access-token': localStorage.getItem("token")}})
      .then(response => {
       setAllComments(response.data)}
      );
    },[]);

    const [allUsers, setAllUsers] = useState([]);
    useEffect(() => {
      axios.get("http://localhost:7500/users/",{headers:{'x-access-token': localStorage.getItem("token")}})
      .then(response => {
       setAllUsers(response.data)}
      );
    },[]);

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
                <Link to = "/">
                    <button className={styles.back_btn}>Wróc na stronę główną</button>
                </Link>
                <button className={styles.white_btn} onClick={handleLogout}>Wyloguj się</button>
            </nav>
            <h1 className={styles.hello}>Wszystkie posty:</h1>
            {allSales.map(sale => (
              <div>
                <Box name={styles.bigbox} color="black" marginLeft={15} marginBottom={1} width={1350} bgcolor="white" p={1} sx={{ borderRadius: 5 }}>
                <h3 className={styles.podpis}>Tytuł ogłoszenia:</h3>
                <h2 className={styles.wpis}>{sale.title}</h2>
                <h3 className={styles.podpis}>Opis ogłoszenia:</h3> 
                <h2 className={styles.wpis}>{sale.description}</h2>
                <h3 className={styles.podpis}>Informacje do kontaktu:</h3> 
                <h2 className={styles.wpis}>{sale.contact_details}</h2>
                <h3 className={styles.podpis}>Rodzaj ogłoszenia:</h3> 
                <h2 className={styles.wpis}>{sale.type}</h2>
                <h1 className={styles.komentarze}>Komentarze:</h1>
                {allComments.map(c => (
                  (c.sale === sale._id) &&
                  <div className={styles.kom}>
                    
                    {allUsers.map(u => (
                    (c.user === u._id) &&
                    <div>
                      <h3>Użytkownik:  {u.login}</h3>
                    </div>
                ))}
                <Box name={styles.smallbox} color="black" marginLeft={-2} marginBottom={1} width={750} bgcolor="lightblue" p={1} sx={{ borderRadius: 5 }}>
                <h3>Treść komentarza: {c.content} </h3><h5>{c.publication_date}</h5>
                </Box>
                  </div>
                ))}
                </Box>
              </div>
          ))}

</div>
    )
  
  }
  
  export default Wszystko