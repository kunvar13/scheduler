
function getAppointmentsForDay(states, day) {

  const dayFound = states.days.find(findDay => findDay.name===day)
  
  if(dayFound === undefined || states.days.length === 0 ) {
    return [];
  }

  return dayFound.appointments.map((appointment) => states.appointments[appointment] );

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

  function getInterviewersForDay(states, day) {
  
    const dayFound = states.days.find(findDay => findDay.name===day)
    
    if(dayFound === undefined || states.days.length === 0 ) {
      return [];
    }
    return dayFound.interviewers.map((interviewer) => states.interviewers[interviewer] );
  
  }

export {getAppointmentsForDay, getInterview, getInterviewersForDay};