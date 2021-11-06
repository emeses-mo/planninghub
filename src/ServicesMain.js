import React ,{useState}from 'react'
import './ServicesMain.css'
import logo from "./Images/D1.svg"
import ills1 from "./Images/ServicesMain1.svg"
import scroll from "./Images/ScrollDown1.gif"
import regIl from "./Images/ServicesMainRegister1.svg"
import { auth } from "./Firebase";
import { useStateValue } from './StateProvider'

import { Link ,useHistory} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
function ServicesMain() {
    const history =useHistory()
    const [{ user },dispatch]= useStateValue();
    const [namereg, setNamereg] = useState('')
    const [emailreg, setEmailreg] = useState('')
    const [passreg, setPassreg] = useState('')
 
    const registerService = e=>{
        e.preventDefault()
        auth.createUserWithEmailAndPassword(emailreg,passreg).then(auth=>{
            auth.user.updateProfile({
                displayName: namereg
            })
            history.push('/service-partner-dashboard')
        }).catch(error=> alert(error.message))

    }
    return (
        <div className="services_main">
            <div className="servicesMain_logo">
                <img src={logo} alt="" /> 
            </div>
            <div className="servicesMain_content">
                <div className="servicesMain_cta">
                    <h2>Join us in providing better customer satisfaction. <br />Help us by outsourcing your services. </h2>
                    <div className="servicesMain_ctaButton">
                   <a href="#registerBlock"> <button>Register Now</button></a>
                    </div>
                </div>
                <div className="servicesMain_illustration">
                    <img src={ills1} alt="" />
                </div>
            </div>
            <div className="servicesMain_scroll">
                <img src={scroll} alt="" />
            </div>
            <div className="servicesMain_registerBlock" id="registerBlock">
            <div className="servicesMain_registerIllustration">
                <img src={regIl} alt="" />
            </div>
            <div className="servicesMain_registration">
                <h3>Register Your Business Now!</h3>
                <div className="servicesMain_registerInputs">
                    <form action="">
                         <p>Company Name</p>
                    <input type="text" value={namereg} onChange={e=> setNamereg(e.target.value)} />
                    <p>Company Email</p>
                    <input type="text" value={emailreg} onChange={e=> setEmailreg(e.target.value)} />
                    <p>Password</p>
                    <input type="password" value={passreg} onChange ={e=> setPassreg(e.target.value)} />
                    <button onClick={registerService} type="submit">Register</button>
                    </form>
                    <div className="servicesMain_ahac">
                    <p >Have An Account? {user?.displayName ? <Link to="/service-partner-dashboard/add-service" >Sign In</Link> : <Link to="/services-login" >Sign In</Link> } </p>
                    </div>
                   
                   
                </div>
            </div>
            </div>
            
        </div>
    )
}

export default ServicesMain
