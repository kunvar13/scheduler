import axios from "axios"
import { useEffect } from "react";
import "components/Application.scss";
import { useState } from "react";
import "components/Appointment";

export default function useApplicationData() {
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

  return {state, setDay, bookInterview, cancelInterview};
}
