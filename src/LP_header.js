import React from 'react'
import  "./LP_header.css"
import logo from "./Images/D1.svg"
import { Link } from 'react-router-dom'
import { useStateValue } from './StateProvider'
function LP_header() {
    const [{ user },dispatch]= useStateValue();
    return (
        <div className="lph">
            
            <img src={logo} alt="" />
             
             <div className="lph_nav">
             <Link to="/event-registration" className="lph_links"><h1>Events</h1></Link>    
                <h1>Services</h1>
              <Link to="/services" className="lph_links">    <h1>Partner Up</h1></Link>
              <div className="lph_loginBtn">
         {user?.email ?  <Link to="/admin-dashboard/active-projects">    <button className="lph_loginButton">Login</button></Link> : <Link to="/admin-login">    <button className="lph_loginButton">Login</button></Link> }    
              </div>
              
                 
                 
             </div>
        </div>
    )
}

export default LP_header
