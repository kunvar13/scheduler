import React from "react";
import "components/Application.scss";
import DayList from "./DayList";
import "components/Appointment";
import Appointment from "components/Appointment";
import { getAppointmentsForDay } from "helpers/selectors";
import { getInterview } from "helpers/selectors";
import { getInterviewersForDay } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";
//import PropTypes from 'prop-types';
//import getAppointmentsForDay from "helpers/selectors";

export default function Application(props) {

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

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
