import React ,{useState,useEffect}from 'react'
import { auth, db } from "./Firebase";
import { useStateValue } from './StateProvider'
import './ADash_pendingservices.css'
import SD_ApprovedServices from './SD_ApprovedServices';
function AD_pendingServices() {
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
        db.collection("Services").where("Verified","==","No").onSnapshot((querySnapshot)=>{
            const items=[]
            querySnapshot.forEach((doc)=>{
                items.push(doc.data())
            })
            setServices(items)
        })
    },[])
    function approveService(service){
        const as={
            Verified: "Yes",
        }
        db.collection("Services").doc(service.id).update(as).catch((err)=>{
            console.error(err)
        })
        
        db.collection(service.CompanyName).doc(service.id).update(as).catch((err)=>{
            console.error(err)
        })
    }
    function rejectService(service){
        const as={
            Verified: "Rejected",
        }
        db.collection("Services").doc(service.id).update(as).catch((err)=>{
            console.error(err)
        })
        
        db.collection(service.CompanyName).doc(service.id).update(as).catch((err)=>{
            console.error(err)
        })
    }
    return (
        <div className="adps_main">
            <div className="adps_title">
                 <h1>Services Pending Approval</h1>
            </div>
           
            <div className="adsa">
            {
                           services.map((service)=>(
                               <div key={service.id} className="adsa_wrapper">
                                   <div className="adsa_box1">
                                       <div className="adsa_cn">
                                           <h1>{service.CompanyName}</h1>
                                       </div>
                                       <div className="adsa_infobox">
                                           <div className="adsa_si">
                                      
                                       <h3>{service.ServiceName}</h3>
                                     <h4>{service.ServiceType}</h4>
                                   </div> 
                                   <div className="adsa_sc">
                                       <h3>${service.ServiceCost}</h3>
                                   </div>
                                       </div>
                                       
                                  
                                   </div>
                                   <div className="adsa_ar">
                                        <button className="adsa_approve" onClick={()=> approveService(service)}>Approve</button>
                                        <button className="adsa_reject" onClick={()=> rejectService(service)}>Reject </button>
                                   </div>
                                  
                               </div>
                           ))
             }

            </div>
        </div>
    )
}

export default AD_pendingServices
