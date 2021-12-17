import React from "react";
import "components/Appointment/styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";
import Status from "./Status";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE"
  const SAVING = "SAVING"
  let timeout;
  
  const { mode, transition, back } = useVisualMode(
      props.interview ? SHOW : EMPTY
     );

  function  save (name, interviewer) {
    // console.log("Save function ", name, interviewer);
    const interview = {
        student: name,
        interviewer
      }
      transition(SAVING)
      props.bookInterview(props.id, interview)
      console.log("I am ", props.id,interview);
      transition(SHOW);

    }

    function deleteAppointment() {
      props.cancelInterview(props.id)
      transition(EMPTY)

      }

  return (

    <article className="appointment">
      <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
      <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={deleteAppointment}
          />
      )} 
      {mode=== CREATE && <Form interviewers={props.interviewer} onCancel = {() => back()} onSave= {save}/>}
      {mode === SAVING && <Status msg={"Saving"} />}

    </article>

  );
}