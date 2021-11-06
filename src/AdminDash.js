import React ,{useState,useEffect}from 'react'
import Adminservices from './Adminservices'
import AD_pendingServices from './AD_pendingServices'
import './AdminDash.css'
import { useStateValue } from './StateProvider'
import { Link, useHistory } from "react-router-dom";
import { auth, db } from "./Firebase";
import logo from './Images/D1.svg'
import AdminEventsPending from './AdminEventsPending'
import AdminActiveProjects from './AdminActiveProjects'
function AdminDash() {
    const history =useHistory()
    const [{ user },dispatch]= useStateValue();
  
   
    const [events, setEvents]=useState('')
    const [services, setServices]=useState([])
    const handleAuthentication =()=>{
        if(user){
            auth.signOut();
            history.push('/')
        }
    }
    
    return (
        <div className="ad_main">
            <div className="ad_header">
                <div className="adh_logo">
                    <img src={logo} alt="" />
                </div>
                <div className="adh_logout">
                     <button onClick={handleAuthentication}>Logout</button>
                </div>
               
            </div>
            <div className="ad_intro">
                <h1>Hello Admin, Welcome to your dashboad.</h1>
            </div>
            <AdminActiveProjects />
            <AdminEventsPending />
            <AD_pendingServices />
        </div>
    )
}

export default AdminDash
