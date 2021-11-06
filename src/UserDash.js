import React ,{useState,useEffect}from 'react'
import './UserDash.css'
import logo from './Images/D1.svg'
import { Link, useHistory } from "react-router-dom";
import { auth, db } from "./Firebase";
import { useStateValue } from './StateProvider'
function UserDash() {
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
    useEffect(()=>{
        auth.onAuthStateChanged((authUser)=>{
            console.log("user on here is" ,authUser)
            const dname = authUser.email
            db.collection("Event Requests").where("Email","==",dname).onSnapshot((querySnapshot)=>{
                const items=[]
                querySnapshot.forEach((doc)=>{
                    items.push(doc.data())
                })
                setServices(items)
            })
        })
        
    },[])
    return (
        <div className="ud_main">
            <div className="ud_header">
            <div className="ud_logo">
                <img src={logo} alt="" />
            </div>
            <div className="ud_logout">
                <button onClick={handleAuthentication}>Logout</button>
            </div>
            
            </div>
            <div className="ud_welcomeText">
                
            </div>
            
            <div className="ud_submitted">
                <h1>Events Pending Approval</h1>
                <div className="ud_indbox">
                    {
                        services.map((service)=>(
                            <div key={service.id} className="eventBox">
                                <h2>Approval : {service.Approval}</h2>
                                <h3>Scheduled Date : {service.Date}</h3>
                                <h3>Event Type : {service.Event} </h3>
                                <h3>Service Provider : {service.ServiceCompany}</h3>
                                <h3>Service Selected : {service.ServiceName}</h3>
                                <h3>Venue : {service.Venue}</h3>
                                
                                <h3>Estimate : {service.Estimate ? service.Estimate : "Pending"}</h3>
                                <h4>Unique Event ID : {service.id}</h4>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default UserDash
