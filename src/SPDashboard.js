import React from 'react'
import logo from './Images/D1.svg'
import home from './Images/add.png'
import pending from './Images/time.png'
import active from './Images/checked.png'
import reject from './Images/cancel.png'

import request from './Images/request.png'
import accnt from './Images/user.png'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from './StateProvider'
import './SPDashboard.css'
import { auth, db } from "./Firebase";
import SPD_addservice from './SPD_addservice'
import SPD_pendingservices from './SPD_pendingservices'
import SPD_activeservices from './SPD_activeservices'
import SPD_rejectedservices from './SPD_rejectedservices'
import SPD_servicerequests from './SPD_servicerequests'
function SPDashboard() {
    const history =useHistory()
    const [{ user },dispatch]= useStateValue();
    const handleAuthentication =()=>{
        if(user){
            auth.signOut();
            history.push('/')
        }
    }
    
    return (
        <Router>
            
        <div className="spd_main">
            <div className="spd_header">
                <div className="spd_logo">
                    <Link to="/"><img src={logo} alt="" /></Link>
                </div>
                <div className="spd_logout">
                    <button onClick={handleAuthentication}>Logout</button>
                </div>
            </div>
            <h2>Hello {user?.displayName}, Welcome To Your Dashboard</h2>
            <div className="spd_content">
                <div className="spd_nav">
                    <div className="spd_navItems ">
                    <Link to="/service-partner-dashboard/add-service" className="dec_off"><div className="spd_nvi"><img src={home} alt="" /><h1>Add Service</h1></div></Link>
                    <Link to="/service-partner-dashboard/pendingservices" className="dec_off"><div className="spd_nvi"><img src={pending} alt="" /><h1>Pending Approval</h1></div></Link>
                    <Link to="/service-partner-dashboard/active-services" className="dec_off"><div className="spd_nvi"><img src={active} alt="" /><h1>Active Services</h1></div></Link>
                    <Link to="/service-partner-dashboard/rejected-services" className="dec_off"><div className="spd_nvi"><img src={reject} alt="" /><h1>Rejected Services</h1></div></Link>
                    <Link to="/service-partner-dashboard/service-requests" className="dec_off"><div className="spd_nvi"><img src={request} alt="" /><h1>Service Requests</h1></div></Link>
                    <Link className="dec_off"><div className="spd_nvi"><img src={accnt} alt="" /><h1>Account</h1></div></Link>
                    </div>
               
                </div>
                <div className="spd_disp">
                    <Switch>
                    <Route path="/service-partner-dashboard/service-requests">
                  <SPD_servicerequests />
                </Route>
                    <Route path="/service-partner-dashboard/rejected-services">
                  <SPD_rejectedservices />
                </Route>
                    <Route path="/service-partner-dashboard/active-services">
                  <SPD_activeservices />
                </Route>
                <Route path="/service-partner-dashboard/add-service">
                    <SPD_addservice />
                </Route>
                <Route path="/service-partner-dashboard/pendingservices">
                   <SPD_pendingservices />
                </Route>
                </Switch>
                </div>
                
            
            </div>
            
        </div>
        </Router>
    )
}

export default SPDashboard
