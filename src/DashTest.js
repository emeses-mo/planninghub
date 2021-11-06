import React from 'react'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import { Link, useHistory } from "react-router-dom";
import DT1 from './DT1'
import DT2 from './DT2'
function DashTest() {
    return (
        <Router >
        <div>
            <h1>Dashmain</h1>
           <Switch>
               <Route path="/dashtest/dt1">
                <DT1 />
               </Route>
               <Route path="/dashtest/dt2">
                <DT2 />
               </Route>
           </Switch>
            <Link to="/dashtest/dt1">Goto DT1</Link><br />
            <Link to="/dashtest/dt2">Goto DT2</Link>
        </div>
        </Router>
    )
}

export default DashTest
