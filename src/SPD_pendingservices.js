import React ,{useState,useEffect}from 'react'
import { useStateValue } from './StateProvider'
import { auth, db } from "./Firebase";
import './SPD_pendingservices.css'
function SPD_pendingservices() {
    const [{ user },dispatch]= useStateValue();
    const [services, setServices]=useState([])
    
    useEffect(()=>{
        auth.onAuthStateChanged((authUser)=>{
            console.log("user on here is" ,authUser)
            const dname = authUser.displayName
            db.collection(dname).where("Verified","==","No").onSnapshot((querySnapshot)=>{
                const items=[]
                querySnapshot.forEach((doc)=>{
                    items.push(doc.data())
                })
                setServices(items)
            })
        })
        
        
       },[])
       function deleteService(service){
        console.log("vserv Id>",service.id)
     db.collection(user.displayName).doc(service.id).delete().catch((err)=>{
         console.error(err)
     })
    }
    return (
        <div>
          <h1>Services Pending Approval</h1>
            <div className="SDP_PendingDisplay">
            {
                           services.map((service)=>(
                               <div key={service.id} className="spd_wrapper">
                                   <div className="spd_box">
                                       <div className="spd_serviceinfo">
                                      
                                       <h3>{service.ServiceName}</h3>
                                     <h3>{service.ServiceType}</h3>
                                   </div>
                                   <div className="spd_servicecost">
                                       <h3>${service.ServiceCost}</h3>
                                   </div>
                                   </div>
                                   
                                   <button className="spd_removeBtn" onClick={()=>deleteService(service)}>Remove Service</button>
                               </div>
                           ))
                       }
            </div>
        </div>
    )
}

export default SPD_pendingservices
