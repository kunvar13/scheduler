import React from "react";
import axios from "axios"
import { useEffect } from "react";
import "components/Application.scss";
import DayList from "./DayList";
import { useState } from "react";
import "components/Appointment";
import Appointment from "components/Appointment";
import { getAppointmentsForDay } from "helpers/selectors";
import { getInterview } from "helpers/selectors";
import { getInterviewersForDay } from "helpers/selectors";
//import getAppointmentsForDay from "helpers/selectors";

export default function Application(props) {

  const [state, setState] = useState({day: "Monday", days:[], appointments:{}, interviewers:{}})

  const setDay = day => setState(prev => ({ ...prev, day }));

  useEffect(() => {
  Promise.all([
  axios.get("http://localhost:8001/api/days"),
  axios.get("http://localhost:8001/api/appointments"),
  axios.get("http://localhost:8001/api/interviewers")
  ]).then(all => {
    setState(prev => ({...prev, days:all[0].data, appointments:all[1].data, interviewers:all[2].data}));
  });
  },[]);

  function bookInterview(id, interview) {
    console.log(interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }; 
    
    return (
    axios.put(`http://localhost:8001/api/appointments/${id}`,{interview})
    .then(res => {
          console.log(res)
          setState(prev => ({ ...prev, appointments}
        ))
    })
    )
  }

  function cancelInterview (id) {

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return (
      axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(res => {
            console.log(res)
            setState(prev => ({ ...prev, appointments}))
      })
      )
  }

 

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const appoint = dailyAppointments.map(appointment => {
  const interview = getInterview(state, appointment.interview);
  const interviewer = getInterviewersForDay(state, state.day)
  return <Appointment 
            key={appointment.id}
            {...appointment}
            interview={interview} 
            interviewer={interviewer}
            bookInterview={bookInterview} 
            cancelInterview={cancelInterview}
            /> 
  });
 
  
  return (
    <main className="layout">
      <section className="sidebar">
          <img
            className="sidebar--centered"
            src="images/logo.png"
            alt="Interview Scheduler"
          />
          <hr className="sidebar__separator sidebar--centered" />
          <nav className="sidebar__menu">
          <DayList 
              days={state.days}
              value={state.day}
              onChange={setDay} 
          />
          </nav>
          <img
            className="sidebar__lhl sidebar--centered"
            src="images/lhl.png"
            alt="Lighthouse Labs"
          />
      </section>
      <section className="schedule">
        {appoint}
      <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
