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
import { renderHook, act } from "@testing-library/react-hooks";
import useVisualMode from "hooks/useVisualMode";
//import getAppointmentsForDay from "helpers/selectors";

export default function Application(props) {

  const [state, setState] = useState({day: "Monday", days:[], appointments:{}, interviewers:{}})

  const setDay = day => setState(prev => ({ ...prev, day }));
  //const setAppointments = appointments =>setState(prev => ({...prev, appointments}))

  useEffect(() => {
  Promise.all([
  axios.get("http://localhost:8001/api/days"),
  axios.get("http://localhost:8001/api/appointments"),
  axios.get("http://localhost:8001/api/interviewers")
  ]).then(all => {
    console.log("all1",all[1]);
    setState(prev => ({...prev, days:all[0].data, appointments:all[1].data, interviewers:all[2].data}));
  });
  },[]);
  //console.log(state);
  console.log("Interviewers", state.interviewers);

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const appoint = dailyAppointments.map(appointment => {
  const interview = getInterview(state, appointment.interview);
  return <Appointment key={appointment.id}{...appointment}interview={interview}/> 
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
