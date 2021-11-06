import React ,{useState,useEffect}from 'react'
import './AdminEventsPending.css'
import { Link, useHistory } from "react-router-dom";
import { auth, db } from "./Firebase";
import { useStateValue } from './StateProvider'
import './AdminActiveProjects.css'
function AdminActiveProjects() {
    const history =useHistory()
    const [{ user },dispatch]= useStateValue();
    const [events, setEvents]=useState('')
    const [services, setServices]=useState([])
    useEffect(()=>{
        auth.onAuthStateChanged((authUser)=>{
            console.log("user on here is" ,authUser)
            const dname = authUser.email
            db.collection("Event Requests").where("Approval","==","Approved").onSnapshot((querySnapshot)=>{
                const items=[]
                querySnapshot.forEach((doc)=>{
                    items.push(doc.data())
                })
                setServices(items)
            })
        })
        
    },[])
    function approveEvent(service){
        const up={
            Approval: "Approved"
        }
        db.collection("Event Requests").doc(service.id).update(up).catch((err)=>{
            console.error(err)
        })
    }
    function rejectEvent(service){
        const up={
            Approval: "Rejected"
        }
        db.collection("Event Requests").doc(service.id).update(up).catch((err)=>{
            console.error(err)
        })
    }
    return (
        <div className="">
            <h1>Active Events</h1>
            <div className="adash_box">
                {
                        services.map((service)=>(
                            <div key={service.id} className="adash_wrapper">
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

export default AdminActiveProjects
