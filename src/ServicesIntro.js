import React from 'react'
import cooking from './Images/Cooking-cuate.svg'
import hotel from './Images/Hotel Booking-rafiki.svg'
import travel from './Images/Trip-bro.svg'
import { Link } from 'react-router-dom'
function ServicesIntro() {
    return (
        <section id="projects">
      <div class="projects container">
        <div class="projects-header">
          <h1 class="section-title">Services</h1>
        </div>
        <div className="erp_move">
                 <Link to="/"><h3>Register Service</h3></Link>   
                </div>
                
        <div class="all-projects">
          <div class="project-item">
            <div class="project-info">
              <h1>Catering</h1>
              <h2>Brings everyone together  </h2>
              <p>We can deliver food within your budget based on your demands. Our team can travel to any location 
                within the city to provide our services. Our aim is to relive you of the stress
                from the preperations allowing you to save money and time and make your 
                party one of our kind
              </p>
            </div>
            <div class="project-img">
            <img src={cooking} alt="" />
            </div>
          </div>
           <div class="project-item">
            <div class="project-info">
              <h1>Hotel Booking</h1>
              <h2>Best Stay</h2>
              <p>We provide best room for you within your budget. Our service is more secure and safe like you think. 
              </p>
            </div>
            <div class="project-img">
            <img src={hotel} alt="" />
          </div>
          </div>
          <div class="project-item">
            <div class="project-info">
              <h1>Travel booking</h1>
              <h2>Go where ever you want</h2>
              <p>We will weave unforgatable stories into each thread that joins together to 
                create your trip plns. We understand your needs and excpectations,we provide best trip within your budget and give more memories.
                
              </p>
            </div>
            <div class="project-img">
            <img src={travel} alt="" />
            </div>
          </div>
         
         
        </div>
      </div>
    </section>
    )
}

export default ServicesIntro
