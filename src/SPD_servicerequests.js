import React ,{useState,useEffect}from 'react'
import { Link, useHistory } from "react-router-dom";
import { auth, db } from "./Firebase";
import { useStateValue } from './StateProvider'
import './SPD_servicerequests.css'
function SPD_servicerequests() {
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
        <div>
            <h1>Service Requests</h1>
            <div className="spd_reqBox">
            {
                    services.map((service)=>(
                        <div key={service.id} className="spd_reqWrapper">
                            <h3>Status : {service.Approval == "Approved" ? <span className="spd_aprvd">Approved</span> : <span className="spd_pending">Pending Approval</span>  } </h3>
                            <h3>Email :{service.Email} </h3>
                            <h3>Scheduled Date : {service.Date}</h3>
                            <h3>Event Type : {service.Event} </h3>
                           
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

export default SPD_servicerequests
