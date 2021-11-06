import React ,{useState,useEffect}from 'react'
import { v4 as uuidv4 } from "uuid";
import { auth, db } from "./Firebase";
import { useStateValue } from './StateProvider'
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
function SPD_addservice() {
    const [serviceName,setServiceName]=useState('')
    const [{ user },dispatch]= useStateValue();
    const [serviceType,setServiceType]=useState('')
    const [serviceCost,setServiceCost]=useState('')
  


  const  createNotification = (type) => {
        return () => {
          switch (type) {
            
            case 'success':
              NotificationManager.success('Service Added', 'Success!');
              break;
            case 'warning':
              NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
              break;
            case 'error':
              NotificationManager.error('Could Not Add To Database, Please contact the Dev', '', 5000, () => {
                alert('callback');
              });
              break;
          }
        };
      };


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
            alert("Service Added")
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
        createNotification('success')
        setServiceName("")
        setServiceCost("")
        setServiceType('')
    }

    
    
    return (
        <div className="addservice_main">
           <h1>Add A New Service</h1>
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
                    <NotificationContainer/>

                </div>
        </div>
    )
}

export default SPD_addservice
