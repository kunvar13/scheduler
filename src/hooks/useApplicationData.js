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
      console.log("all", all[0].data);
      setState(prev => ({...prev, days:all[0].data, appointments:all[1].data, interviewers:all[2].data}));
    });
  },[]);

  function bookInterview(id, interview) {
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
              //console.log(res)
              updateSpots(id,true)
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
              //console.log(res)
              updateSpots(id, false);
              setState(prev => ({ ...prev, appointments}))
          })
      )
  }

  function updateSpots(id,scheduled) {

    if(scheduled) {
      if(state.appointments[id].interview === null) {
        state.days.forEach(day => {
          if(day.name === state.day) {
            day.spots--;
            } 
           })
      }
    } else {
        state.days.forEach(day => {
        if(day.name === state.day) {
            day.spots++;
          }
       })
     } 
}

  return {state, setDay, bookInterview, cancelInterview,updateSpots};
}
