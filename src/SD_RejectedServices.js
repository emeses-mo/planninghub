import React ,{useState,useEffect} from 'react'
import { useStateValue } from './StateProvider'
import { auth, db } from "./Firebase";
function SD_RejectedServices() {
    const [{ user },dispatch]= useStateValue();
    const [services, setServices]=useState([])
    const getSpecServices=(e)=>{
        const dname = user.displayName
        db.collection(dname).where('Verified','==','Rejected').onSnapshot((querySnapshot)=>{
            const items=[]
            querySnapshot.forEach((doc)=>{
                items.push(doc.data())
            })
            setServices(items)
        })
    }
    useEffect(() => {
        auth.onAuthStateChanged((authUser)=>{
            console.log("user on here is" ,authUser)
            const an= authUser.displayName
            db.collection(an).where('Verified','==','Rejected').onSnapshot((querySnapshot)=>{
                const items=[]
                querySnapshot.forEach((doc)=>{
                    items.push(doc.data())
                })
                setServices(items)
            })
        })
        
     
    }, [])
    function deleteService(service){
        console.log("vserv Id>",service.id)
     db.collection(user.displayName).doc(service.id).delete().catch((err)=>{
         console.error(err)
     })
    }
    return (
        <div>
             <div className="SDA_top">
                <h2>Rejected Services</h2>
            </div>
            
                <div className="sd_showAS">
                <div className="SDApproved_Scrollable">
                      
                      
                      {
                          services.map((service)=>(
                              <div key={service.id} className="SDA_bigbox">
                                  <div className="SDApproved_box">
                                      <div className="SDA_info">
                                     
                                      <h3>{service.ServiceName}</h3>
                                    <h3 className="SDA_servicetype">{service.ServiceType}</h3>
                                  </div>
                                  <div className="SDA_cost">
                                      <h3>${service.ServiceCost}</h3>
                                  </div>
                                  </div>
                                  
                                  <button className="SDA_remove" onClick={()=>deleteService(service)}>Remove Service</button>
                              </div>
                          ))
                      }


                  </div>
                </div>

        </div>
    )
}

export default SD_RejectedServices
