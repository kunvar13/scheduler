
function getAppointmentsForDay(states, day) {

  //console.log("I am selector argument", states, day)


  const appointmentsDays = states.days.filter(findDay => findDay.name===day)
  //console.log("I am stat and day appo", appointmentsDays);

  if(appointmentsDays.length === 0) {

    return [];

  }
  const appointments1=appointmentsDays[0];
 // console.log("I am appointments1", appointments1);
  const arr = appointments1.appointments
  //console.log("Appointments ", arr);

  return arr.map((appointment) => states.appointments[appointment] );

}

function getInterview(states, interviewer) {
 let fountInterviewer = {}

  if(interviewer === null) {
    return null;
  }

  if(interviewer !== null) {

      for (let key in states.interviewers) {

      if(states.interviewers[key].id === interviewer.interviewer){

        fountInterviewer= states.interviewers[key];
          const interview ={
            "student":interviewer.student,
            "interviewer":fountInterviewer
          };
          return interview;
      }
    }

  }


}

export {getAppointmentsForDay, getInterview};