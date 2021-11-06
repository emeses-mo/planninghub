import React ,{useState,useEffect} from 'react'
import './EventReg_process.css'
import logo from './Images/D1.svg'
import { Link, useHistory } from "react-router-dom";
import wedding from './Images/EventReg-Wedding.svg'
import corp from './Images/EventReg-Corporate.svg'
import bday from './Images/EventReg-Birthday.svg'
import { auth, db } from "./Firebase";
import { v4 as uuidv4 } from "uuid";
function EventReg_process() {
    const [eventType,setEventType] = useState('')
    const [venue,setVenue] = useState('')
    const [services1, setServices1]=useState([])
    const [services, setServices]=useState([])
    const [serviceType,setServiceType] = useState('')
    const [email,setEmail] = useState('')
    const [name,setName] = useState('')
    const [password,setPassword] = useState('')
    const [getDate,setDate] =useState('')
    const [getTime,setTime] =useState('')
    const [companyName,setCompanyName] =useState('')
    const [phone,setPhone] =useState('')

    const history =useHistory()
    
    const send=e=>{
        e.preventDefault()
        


        const uid = uuidv4()
        db.collection("Event Requests").doc(uid).set({
            id:uid,
            Name: name,
            Email: email,
            PhoneNumber: phone,
            Event: eventType,
            ServiceCompany: companyName,
            ServiceName: serviceType,
            Date: getDate,
            Time: getTime,
            Venue:venue,
            Approval:"Pending",
            Estimate:"",
            
        }).then(()=>{
             alert("Event Sent For Approval")
        }).catch((error)=>{
            alert(error.message)
        })
        console.log("CompNAme>",companyName)
        
        auth.createUserWithEmailAndPassword(email,password).then(auth=>{
            auth.user.updateProfile({
                displayName: name
                
            })
            
            history.push('/user-dashboard')
        }).catch(error=> alert(error.message))
    }
    const getServices=(e)=>{
        db.collection(serviceType).onSnapshot((querySnapshot)=>{
            const items=[]
            querySnapshot.forEach((doc)=>{
                items.push(doc.data())
            })
            setServices(items)
        })
       
    }
    function callServs(){
        
        db.collection(companyName).onSnapshot((querySnapshot)=>{
            const items=[]
            querySnapshot.forEach((doc)=>{
                items.push(doc.data())
            })
            setServices(items)
        })
    }
    console.log("srvc>",services)
    useEffect(()=>{
        db.collection("Services").onSnapshot((querySnapshot)=>{
            const items=[]
            querySnapshot.forEach((doc)=>{
                items.push(doc.data())
            })
            setServices1(items)
        })
        
        
       },[])
       let uniqueObjArray = [
        ...new Map(services1.map((item) => [item["CompanyName"], item])).values(),
    ];
      console.log("Company>Service",companyName,serviceType)
    return (
        <div className="erp_main">
            <div className="erp_header">
                <div className="erp_logo">
                    <img src={logo} alt="" />
                </div>
                <div className="erp_login">
               <Link to="/user-login"> <button>Customer Login</button></Link>    
                </div>
            </div>
            <form action="">
                <div className="erp_step1">
                    <div className="erp_chooseet">
                    <h1>Choose The Type OF Event</h1>
                    <div className="erp_etypes">
                    <select name="et" id="et" value={eventType} className="eventSelector" onChange={e=>setEventType(e.target.value)}>
                    <option disabled selected value="">Select Event Type</option>
                        <option  value="Wedding" id="opt_wedding"> Wedding</option>
                        <option value="Corporate"> Corporate</option>
                        <option value="Birthday">Birthday</option>
                    </select>
                    </div>
                </div>
                <div className="erpDnd">
                    <h1>Select The Date And Time</h1>
                    <div className="erpdndin">
                    <input className="erp_date" type="date" value={getDate} onChange={e=> setDate(e.target.value)} />
                    <input className="erp_time" type="time" value={getTime} onChange={e=> setTime(e.target.value)} />
                    </div>
                    

                </div>
                <div className="erp_move">
                    <a href="#step2"><h3>Next</h3></a>
                </div>
                
                </div>
                <div className="erp_step2" id="step2">
                    <div className="erp_services">
                        <h1>Select A Service Provider </h1>
                        <select value={companyName} onChange={e=>setCompanyName(e.target.value)}  >
                            <option disabled selected>Services Providers Available</option>
                            {
                               
                                uniqueObjArray.map((service)=>(
                                    
                                        <option key={service.id}    value={service.CompanyName}>{service.CompanyName}</option>
                                    
                                ))

                                
                            }
                        </select>
                    </div>
                    <div className="erp_venue">
                    <div className="erp_chooseet">
                    <h1>Select a Service</h1>
                    <div className="erp_etypes">
                    <select name="et" id="et" value={serviceType} className="eventSelector" onClick={e=>callServs()} onChange={e=>setServiceType(e.target.value)}>
                    <option disabled selected value="">Services Available</option>
                        {
                                services.map((services)=>(
                                    <option key={services.id} value={services.ServiceName}>{services.ServiceName}</option>
    ))
                        }
                    </select>
                    </div>
                </div>
                    </div>
                    <div className="erp_venue">
                    <div className="erp_chooseet">
                    <h1>Select a venue for your event</h1>
                    <div className="erp_etypes">
                    <select name="et" id="et" value={venue} className="eventSelector" onChange={e=>setVenue(e.target.value)}>
                    <option disabled selected value="">Venues Available</option>
                        <option  value="Venue 1" id="opt_wedding"> Venue 1</option>
                        <option value="Venue 2"> Venue 2</option>
                        <option value="Venue 3">Venue 3</option>
                    </select>
                    </div>
                </div>
                    </div>
                    <div className="erp_move">
                    <a href="#step3"><h3>Next</h3></a>
                </div>
                

                    

                </div>
                <div id="step3" className="erp_step3">
                    <div className="erp_userdetails">
                          <h1>Enter Your Personal Details</h1>
                          <p></p>
                          <input placeholder="Name" type="text"  value={name} onChange={e=>setName(e.target.value)} />
                          <p></p>
                          <input placeholder="Phone" type="number"  value={phone} onChange={e=>setPhone(e.target.value)} />
                          <p></p>
                          <input  placeholder="Email" type="email"  value={email} onChange={e=>setEmail(e.target.value)} />
                          <p></p>
                          <input  placeholder="Password" type="password"  value={password} onChange={e=>setPassword(e.target.value)} />
                          
                    </div>
                         

                </div>
                <div className="eventreg_submit">
                    <button type="submit" onClick={send}>Register Event</button>
                </div>
                
                
            </form>
        </div>
    )
}

export default EventReg_process
