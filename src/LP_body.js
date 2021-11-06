import React from 'react'
import lpIll from './Images/Wedding-illustration1.svg'
import './LP_body.css'
function LP_body() {
    return (
        <div className="lpb">
                <div className="lpb_sub1">
                    <h2>Let's discuss your <br /> event!</h2>
                    <button>Get Started!</button>
                </div>
                <div className="lpb_sub2">
                    <img src={lpIll} alt="" />
                </div>
        </div>
    )
}

export default LP_body
