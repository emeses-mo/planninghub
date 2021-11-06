import LP_body from './LP_body'
import './App.css';
import React, {useEffect} from 'react';
import LP_header from './LP_header';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import AdminLogin from './AdminLogin';
import Adminservices from './Adminservices';
import ServicesMain from './ServicesMain';
import { useStateValue } from './StateProvider';
import { auth } from './Firebase';
import ServicesDash from './ServicesDash';
import ServicePartnerLogin from './ServicePartnerLogin';
import AdminDash from './AdminDash';
import EventReg_process from './EventReg_process';
import UserDash from './UserDash';
import UserLogin from './UserLogin';
import DashTest from './DashTest';
import SPDashboard from './SPDashboard';
import ADash_main from './ADash_main';

function App() {
  const [{},dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged((authUser)=>{
      console.log("User is>" , authUser);
      if(authUser){
        dispatch({
          type:'SET_USER',
          user:authUser,
        });
      }
      else{
        dispatch({
          type:'SET_USER',
          user:null,
        });

      }
    })
  }, [])



  return (
  <Router>
    <div className="app">
        <Switch>
        <Route path="/admin-dashboard">
         <ADash_main />
        
        </Route>
        <Route path="/service-partner-dashboard">
        <SPDashboard />
        
        </Route>
        <Route path="/dashtest">
        <DashTest />
        
        </Route>
        <Route path="/user-login">
        <UserLogin />
        
        </Route>
        <Route path="/user-dashboard">
         <UserDash />
        
        </Route>
        <Route path="/event-registration">
         <EventReg_process />
        
        </Route>

        <Route path="/admin-dash">
         <AdminDash />
        
        </Route>

        <Route path="/services-login">
          <ServicePartnerLogin />
        
        </Route>
        <Route path="/services">
          <ServicesMain />
        
        </Route>
        <Route path="/services-dash">
          <ServicesDash />
        
        </Route>
    

        <Route path="/admin-login">
          <AdminLogin />
        
        </Route>
        <Route path="/admin-services">
          <Adminservices />
        
        </Route>
        
        
        
        <Route path="/">
          
        <LP_header />
        <div className="containerr">
          <LP_body />
        </div>
        </Route>
        </Switch>
    </div>
    </Router>
  );
}

export default App;
