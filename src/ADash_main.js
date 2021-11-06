import React from 'react'
import logo from './Images/D1.svg'
import home from './Images/add.png'
import evtreq from './Images/evtreq.png'
import active from './Images/active.png'
import reject from './Images/cancel.png'
import activeservices from './Images/activeservices.png'
import serappr from './Images/serviceappr.png'
import request from './Images/request.png'
import accnt from './Images/user.png'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import { Link, useHistory } from "react-router-dom";
import { useStateValue } from './StateProvider'
import { auth, db } from "./Firebase";
import AdminActiveProjects from './AdminActiveProjects'
import AdminEventsPending from './AdminEventsPending'
import ADash_activerservices from './ADash_activerservices'
import AD_pendingServices from './AD_pendingServices'

function ADash_main() {
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
            <h2>Hello Admin, Welcome To Your Dashboard</h2>
            <div className="spd_content">
                <div className="spd_nav">
                    <div className="spd_navItems ">
                    <Link to="/admin-dashboard/active-projects" className="dec_off"><div className="spd_nvi"><img src={active} alt="" /><h1>Active Projects</h1></div></Link>
                    <Link to="/admin-dashboard/event-requests" className="dec_off"><div className="spd_nvi"><img src={evtreq} alt="" /><h1>Event Requests</h1></div></Link>
                    <Link to="/admin-dashboard/active-services" className="dec_off"><div className="spd_nvi"><img src={activeservices} alt="" /><h1>Active Services</h1></div></Link>
                    <Link to="/admin-dashboard/services-approval" className="dec_off"><div className="spd_nvi"><img src={serappr} alt="" /><h1>Services Approval</h1></div></Link>
                   
                    </div>
               
                </div>
                <div className="spd_disp">
                    <Switch>
                    <Route path="/admin-dashboard/active-projects">
                    <AdminActiveProjects />
                </Route>
                    <Route path="/admin-dashboard/event-requests">
                  <AdminEventsPending />
                </Route>
                    <Route path="/admin-dashboard/active-services">
                 <ADash_activerservices />
                </Route>
                <Route path="/admin-dashboard/services-approval">
                   <AD_pendingServices />
                </Route>
                <Route path="/service-partner-dashboard/pendingservices">
                   
                </Route>
                </Switch>
                </div>
                
            
            </div>
            
        </div>
        </Router>
    )
}

export default ADash_main
