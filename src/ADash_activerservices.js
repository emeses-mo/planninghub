import React ,{useState,useEffect}from 'react'
import { auth, db } from "./Firebase";
import { useStateValue } from './StateProvider'
import './ADash_activeservices.css'

function ADash_activerservices() {
    const [services, setServices]=useState([])
    const [{ user },dispatch]= useStateValue();
    const getAllServices=(e)=>{
        
        db.collection().onSnapshot((querySnapshot)=>{
            const items=[]
            querySnapshot.forEach((doc)=>{
                items.push(doc.data())
            })
            setServices(items)
        })
    }

    useEffect(()=>{
        db.collection("Services").where("Verified","==","Yes").onSnapshot((querySnapshot)=>{
            const items=[]
            querySnapshot.forEach((doc)=>{
                items.push(doc.data())
            })
            setServices(items)
        })
    },[])
    return (
        <div>
            <h1>Active Services</h1>
            <div className="adas_box">
            {
                           services.map((service)=>(
                               <div key={service.id} className="adas_wrapper">
                                   <div className="adas_b1">
                                       <div className="adas_cn">
                                           <h1>{service.CompanyName}</h1>
                                       </div>
                                       <div className="adas_infobox">
                                           <div className="adas_si">
                                      
                                       <h3>{service.ServiceName}</h3>
                                     <h4>{service.ServiceType}</h4>
                                   </div> 
                                   <div className="adas_sc">
                                       <h3>${service.ServiceCost}</h3>
                                   </div>
                                       </div>
                                       
                                  
                                   </div>
                                   
                               </div>
                           ))
             }

            </div>
            
        </div>
    )
}

export default ADash_activerservices
