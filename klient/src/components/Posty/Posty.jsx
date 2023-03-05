import React, {useEffect, useState} from "react";
import Boks from '../RamkaNaPost/Boks'
import styles from './style.module.css'
import Box from '@mui/system/Box';
import {Link} from 'react-router-dom';
import jwt_decode from 'jwt-decode'
const axios = require('axios')

const Posty = () =>{
  const [sales, setSales] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:7500/sales/",{headers:{'x-access-token': localStorage.getItem("token")}})
    .then(response => {
     setSales(response.data)}
    );
  },[]);

  function pokazSzczegoly(id){
    
    console.log("123")
  }
  async function usuwanko(id){
    await axios.delete("http://localhost:7500/sales/"+id,{headers:{'x-access-token': localStorage.getItem("token")}})
    window.location.reload();
  }
  
  function weryfikacja(){
    const token = jwt_decode(localStorage.getItem("token"))
    const id = token._id
    return id
  }
  return (
    <div className="parentposts">
        <h1 className={styles.posts_title}>LISTA OGŁOSZEŃ</h1>
        <Link to = "/addpost">
          <button className={styles.button_post}>Dodaj ogłoszenie</button>
        </Link>
        
        <Box name={styles.bigbox} color="white" marginLeft={15} width={1350} bgcolor="aqua" p={1} sx={{ borderRadius: 5 }}>
        <div className={styles.posts}>
        <h1>Wszystkie sprzedaże:</h1>
            {sales.map(sale => (
              (sale.type === "sprzedaż" && weryfikacja() === sale.user) &&
              <div>
                <Link to={{pathname: `/szczegoly/${sale._id}`}}>
                <Boks name={sale.title} name2={sale.description}/>
                </Link>
                   <Link to={{pathname: `/editPost/${sale._id}`}}>
                  <button className={styles.edit_btn}>Edytuj ogłoszenie</button>
                  </Link>
                  <button className={styles.delete_btn} onClick={() => { usuwanko(sale._id) }}>Usuń ogłoszenie</button>
               </div>
          ))}
          {sales.map(sale => (
              (sale.type === "sprzedaż" && weryfikacja() !== sale.user) &&
              <div>
               <Link to={{pathname: `/szczegoly/${sale._id}`}}>
                <Boks name={sale.title} name2={sale.description}/>
                </Link>
               </div>
          ))}
        <h1>Wszystkie oferty kupna:</h1>
          {sales.map(sale => (
              (sale.type === "Kupno" && weryfikacja() === sale.user) &&
              <div>
               <Link to={{pathname: `/szczegoly/${sale._id}`}}>
                <Boks name={sale.title} name2={sale.description}/>
                </Link>
               <Link to={{pathname: `/editPost/${sale._id}`}}>
                    <button className={styles.edit_btn}>Edytuj ogłoszenie</button>
                  </Link>
                  <button className={styles.delete_btn} onClick={() => { usuwanko(sale._id) }}>Usuń ogłoszenie</button>
               </div>
          ))}
          {sales.map(sale => (
              (sale.type === "Kupno" && weryfikacja() !== sale.user) &&
              <div>
               <Link to={{pathname: `/szczegoly/${sale._id}`}}>
                <Boks name={sale.title} name2={sale.description}/>
                </Link>
               </div>
          ))}
        </div></Box>
        
    </div>
  )

}

export default Posty