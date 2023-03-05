import React, {useState,useEffect} from 'react';
import {useLocation } from 'react-router-dom';
import Box from '@mui/system/Box';
import {Link} from 'react-router-dom';
import styles from './style.module.css'
import jwt_decode from 'jwt-decode'
const axios = require('axios')
 
const Szczegóły = () =>{
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [specificSale, setSpecificSale] = useState([]);
    const id1 = useLocation().pathname.substring(11);
    useEffect(() => {
      axios.get("http://localhost:7500/sales/"+id1,{headers:{'x-access-token': localStorage.getItem("token")}})
      .then(response => {
       setSpecificSale(response.data)}
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
      function weryfikacja(){
        const token = jwt_decode(localStorage.getItem("token"))
        const id = token._id
        return id
      }
      const handleSubmit = async(e) => {
        const token = jwt_decode(localStorage.getItem("token"))
        const id = token._id
        
        e.preventDefault();
        try{
            let res = await axios.post("http://localhost:7500/comments",{
                content: title,
                sale: id1,
                user: id
            },
            {headers:{'x-access-token': localStorage.getItem("token")}})
            console.log(res)
            if (res.status === 200) {
                setMessage("Dodano komentarz!");
                console.log(res)
                window.location.reload()
              } else {
                setMessage("Spróbuj jeszcze raz");
                
              }
            } catch (err) {
              console.log(err);
            }
    }

    async function usuwanko(id){
      await axios.delete("http://localhost:7500/comments/"+id,{headers:{'x-access-token': localStorage.getItem("token")}})
      window.location.reload();
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
          <h1 className={styles.oglo}>Szczegóły ogłoszenia </h1>
          <Box name={styles.bigbox} color="white" marginLeft={15} width={1350} bgcolor="aqua" p={1} sx={{ borderRadius: 5 }}>
          <h3 className={styles.podpis}>Tytuł ogłoszenia:</h3>
                <h2 className={styles.wpis}>{specificSale.title}</h2>
                <h3 className={styles.podpis}>Opis ogłoszenia:</h3> 
                <h2 className={styles.wpis}>{specificSale.description}</h2>
                <h3 className={styles.podpis}>Informacje do kontaktu:</h3> 
                <h2 className={styles.wpis}>{specificSale.contact_details}</h2>
                <h3 className={styles.podpis}>Rodzaj ogłoszenia:</h3> 
                <h2 className={styles.wpis}>{specificSale.type}</h2>
                <h1 className={styles.komentarze}>Komentarze:</h1>
                <Box name={styles.bigbox} color="black" marginLeft={46} width={600} bgcolor="white" p={1} sx={{ borderRadius: 5 }}>
            {allComments.map(com => (
              (weryfikacja() === com.user) &&
              (specificSale._id === com.sale) &&
              <div className={styles.kom}>
              {allUsers.map(u => (
                    (com.user === u._id) &&
                    <div>
                      <h3>Użytkownik:  {u.login}</h3>
                    </div>
                ))}
                <h3>Treść komentarza: {com.content} </h3><h5>{com.publication_date}</h5>
                <button className={styles.delete_btn} onClick={() => { usuwanko(com._id) }}>Usuń komentarz</button>
                </div>
                
                ))}

              {allComments.map(com => (
              (weryfikacja() !== com.user) &&
              (specificSale._id === com.sale) &&
              <div className={styles.kom}>
              {allUsers.map(u => (
                    (com.user === u._id) &&
                    <div>
                      <h3>Użytkownik:  {u.login}</h3>
                    </div>
                ))}
                <h3>Treść komentarza: {com.content} </h3><h5>{com.publication_date}</h5>
                </div>
                
                ))}
                
                </Box>
          <form onSubmit={handleSubmit}>
            <div className ={styles.field1}>
                <div><label className={styles.field1_label}> Treść komentarza  </label></div>
                <input className={styles.input} placeholder="Treść"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} 
                />
            </div>
            <button type = "submit" id= "submitBtn" className ={styles.sub_btn}> Dodaj Komentarz</button>
            <div className={styles.message}>{message ? <p>{message}</p> : null}</div>
        </form>
          </Box>
        </div>
    )
}

export default Szczegóły