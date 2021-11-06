import React ,{useState,useEffect}from 'react'
import './ServicesDash.css'
import { useStateValue } from './StateProvider'
import firebase from "./Firebase";
import logo from './Images/D1.svg'
import { Link, useHistory } from "react-router-dom";
import { auth, db } from "./Firebase";
import { uuid } from 'uuidv4';
import { v4 as uuidv4 } from "uuid";
import SD_ApprovedServices from './SD_ApprovedServices';
import SD_RejectedServices from './SD_RejectedServices';
import SD_serviceRequests from './SD_serviceRequests';
function ServicesDash() {
    const history =useHistory()
    const [{ user },dispatch]= useStateValue();
    const [serviceName,setServiceName]=useState('')
    const [serviceType,setServiceType]=useState('')
    const [serviceCost,setServiceCost]=useState('')

    const [services, setServices]=useState([])
    
    
   const addService=(e)=>{
        e.preventDefault()
        const uid = uuidv4()
        console.log("Handled >", serviceName)
        console.log("uid>",uid)
        db.collection("Services").doc(uid).set({
            id:uid,
            CompanyName: user.displayName,
            CompanyEmail : user.email,
            ServiceName: serviceName,
            ServiceType: serviceType,
            ServiceCost: serviceCost,
            Verified:"No",
        }).then(()=>{
            alert("Service Has Been Added")
        }).catch((error)=>{
            alert(error.message)
        })
            console.log("user 1>",user.displayName)
        // db.collection("Services").add({
        //     id:uuidv4(),
        //     CompanyName: user.displayName,
        //     CompanyEmail : user.email,
        //     ServiceName: serviceName,
        //     ServiceType: serviceType,
        //     ServiceCost: serviceCost,
        // }).then(()=>{
        //     alert("Service Has Been Added")
        // }).catch((error)=>{
        //     alert(error.message)
        // })

        db.collection(user.displayName).doc(uid).set({
            id:uid,
            CompanyName: user.displayName,
            CompanyEmail : user.email,
            ServiceName: serviceName,
            ServiceType: serviceType,
            ServiceCost: serviceCost,
            Verified:"No",
        }).then(()=>{
           
        }).catch((error)=>{
            alert(error.message)
        })
    }
    

    
    
    const handleAuthentication =()=>{
        if(user){
            auth.signOut();
            history.push('/')
        }
    }
    
    
    const getAllServices=(e)=>{
        const dname = user.displayName
        db.collection(dname).onSnapshot((querySnapshot)=>{
            const items=[]
            querySnapshot.forEach((doc)=>{
                items.push(doc.data())
            })
            setServices(items)
        })
    }

   

   function deleteService(service){
       console.log("vserv Id>",service.id)
    db.collection(user.displayName).doc(service.id).delete().catch((err)=>{
        console.error(err)
    })
   }
   useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
        console.log("user on here is" ,authUser)
        const dname = authUser.displayName
        db.collection(dname).onSnapshot((querySnapshot)=>{
            const items=[]
            querySnapshot.forEach((doc)=>{
                items.push(doc.data())
            })
            setServices(items)
        })
    })
    
    
   },[])

    return (
        <div className="servicesDash">
            <div className="servicesDash_header">
                <div className="servicesDash_logo">
                    <img src={logo} alt="" />
                </div>
                
                <div className="servicesDash_logout">
                    <button onClick={handleAuthentication}>Logout</button>
                </div>
            
            </div>
            <div className="servicesDash_user">
                 <h2>Hello {user?.displayName} , Welcome to your Dashboard.</h2>
                
            </div>
            <div className="servicesDash_approvedServices">
               
            <SD_ApprovedServices />
            <SD_RejectedServices />
            <SD_serviceRequests />
            </div>
            <div className="servicesDash_display">
            <div className="servicesDash_addservice">
                <h3>Add A New Service</h3>
                <div className="servicesDash_inputs">
                    <form action="">
                    <p>Service Name</p>
                    <input type="text" value={serviceName} onChange={e=>setServiceName(e.target.value)} />
                    <p>Service Type</p>
                    <select name="cars" id="cars" value={serviceType} onChange={e=>setServiceType(e.target.value)}>
                    <option disabled selected value="">Select Service Type</option>
                        <option  value="Catering">Catering</option>
                        <option value="Decor">Decor</option>
                    </select>
                    <p>Charge Per Hour</p>
                    
                    <input type="number"  value={serviceCost} onChange={e=> setServiceCost(e.target.value)}/>
                    <br />
                    <div className="servicesDash_addBtn">
                    <button type="submit" onClick={addService}>Add Service</button>

                    </div>

                    </form>
                    

                </div>
            </div>
            <div className="servicesDash_show">
               <div className="servicesDash_outer">
               <h4>All Services</h4>
                   <div className="servicesDash_Scrollable">
                      
                      
                       {
                           services.map((service)=>(
                               <div key={service.id} className="servicesDash_sbox">
                                   <div className="serivceDisplayBox">
                                       <div className="serviceInfo">
                                      
                                       <h3>{service.ServiceName}</h3>
                                     <h3>{service.ServiceType}</h3>
                                   </div>
                                   <div className="serviceCost">
                                       <h3>${service.ServiceCost}</h3>
                                   </div>
                                   </div>
                                   
                                   <button className="removeServicebtn" onClick={()=>deleteService(service)}>Remove Service</button>
                               </div>
                           ))
                       }


                   </div>
               </div>
            </div>
            </div>
            
           
        </div>
    )
}

export default ServicesDash
