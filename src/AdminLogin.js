import React ,{useState} from 'react'
import { auth } from './Firebase';
import { Link, useHistory } from "react-router-dom";
import './AdminLogin.css'
function AdminLogin() {
    const history = useHistory();
    const [email, setEmail]=useState('')
    const [password,setPassword] = useState('')
    const signIn = e=>{
        e.preventDefault();
        auth.signInWithEmailAndPassword(email,password).then(auth =>{
            history.push('/admin-dashboard/active-projects')
        }).catch(error => alert(error.message))
    }
    return (

        <div className="container">
           <div className="box1">
           <form>
            <h2>Login</h2>
            <div className="input-fields">
                <p>Email</p>
            <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
            <p>Password</p>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            
            <button type="submit" onClick={signIn}>Login</button>
            </form>
            </div> 
            
        </div>
    )
}

export default AdminLogin
