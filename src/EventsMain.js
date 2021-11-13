import React from 'react'
import birthday from './Images/EventReg-Birthday.svg'
import corporate from './Images/EventReg-Corporate.svg'
import wedding from './Images/EventReg-Wedding.svg'
import baptism from './Images/baptism.svg'
import { Link } from 'react-router-dom'
import house from './Images/People celebrating Thanksgiving-rafiki.svg'
function EventsMain() {
    return (
        
            
    <section id="projects">
      <div class="projects container">
        <div class="projects-header">
          <h1 class="section-title">Events</h1>
        </div>
        <div className="erp_move">
            <Link to="/event-registration">  <h3>Register Events</h3></Link>     
                </div>
                
        <div class="all-projects">
          <div class="project-item">
            <div class="project-info">
              <h1>Marriage</h1>
              <h2> Making Memories</h2>
              <p>We can deliver your dream weddings within your budget based on your demands
                and by offering tailor-made packages. Our team can travel to any location 
                within the city to provide our services. Our aim is to relive you of the stress
                from the preperations allowing you to save money and time and make your 
                wedding one of our kind
              </p>
            </div>
            <div class="project-img">
            <img src={wedding} alt="" />
            </div>
          </div>
           <div class="project-item">
            <div class="project-info">
              <h1>Corporate Events</h1>
              <h2>Conferences</h2>
              <p>Every step of planning and execution for a sucessfull conference will be taken 
                care by us. Our dedicated team manages end to end execution of package deals which
                are desigened specifically to suit your objectves.
              </p>
            </div>
            <div class="project-img">
            <img src={corporate} alt="" />
          </div>
          </div>
          <div class="project-item">
            <div class="project-info">
              <h1>Birthday</h1>
              <h2>Today, we celebrate you</h2>
              <p>We will weave unforgatable stories into each thread that joins together to 
                create your event. We understand your needs and excpectations, we relive you of the stress
                from the preperations allowing you to save money and time and make your 
                birthday one of our kind 
              </p>
            </div>
            <div class="project-img">
            <img src={birthday} alt="" />
            </div>
          </div>
          <div class="project-item">
            <div class="project-info">
              <h1>Baptism</h1>
              <h2>Faith</h2>
              <p>We create uniquely themed and beautiful parties for your little one. we love what we do.
                And we share the same belief and values when it comes to you and your child's special day.
                We guarantee extra ordinary ideas for your little one's christening, completely tailored to your wishes.
              </p>
            </div>
            <div class="project-img">
            <img src={baptism} alt="" />
            </div>
          </div>
          <div class="project-item">
            <div class="project-info">
              <h1>House Warming</h1>
              <h2>Kingdom Of Heaven</h2>
              <p>We give a range of creative plans that can be highly costomised depending on your budget.
                we make all the planning from start to finish inorder to put together an unforgettable house warming ceremoney
              </p>
            </div>
            <div class="project-img">
            <img src={house} alt="" />
            </div>
          </div> 
        </div>
      </div>
    </section>
            
        
    )
}

export default EventsMain
