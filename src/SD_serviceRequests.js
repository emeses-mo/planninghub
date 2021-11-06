import React ,{useState,useEffect}from 'react'
import { Link, useHistory } from "react-router-dom";
import { auth, db } from "./Firebase";
import { useStateValue } from './StateProvider'
import "./SD_serviceREquests.css"
function SD_serviceRequests() {
    const history =useHistory()
    const [{ user },dispatch]= useStateValue();
    const [events, setEvents]=useState('')
    const [services, setServices]=useState([])
    useEffect(()=>{
        auth.onAuthStateChanged((authUser)=>{
            console.log("user on here is" ,authUser)
            const dname = authUser.displayName
            db.collection("Event Requests").where("ServiceCompany","==",dname).onSnapshot((querySnapshot)=>{
                const items=[]
                querySnapshot.forEach((doc)=>{
                    items.push(doc.data())
                })
                setServices(items)
            })
        })
        
    },[])
    return (
        <div className="sr_main">
           <h2>Service Requests</h2>
           <div className="sr_mainBox">
                {
                    services.map((service)=>(
                        <div key={service.id} className="sr_box">
                            <h3>Status : {service.Approval} </h3>
                            <h3>Email :{service.Email} </h3>
                            <h3>Scheduled Date : {service.Date}</h3>
                            <h3>Event Type : {service.Event} </h3>
                            <h3>Service Provider : {service.ServiceCompany}</h3>
                            <h3>Service Selected : {service.ServiceName}</h3>
                            <h3>Venue : {service.Venue}</h3>
                            
                            <h3>Estimate : {service.Estimate ? service.Estimate : "Pending"}</h3>
                            
                        </div>
                    ))
                }
           </div>
            
        </div>
    )
}

export default SD_serviceRequests
