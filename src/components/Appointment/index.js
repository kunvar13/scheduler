import React from "react";
import "components/Appointment/styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";
import Status from "./Status";
import Confirm from "./Confirm";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETE = "DELETE";
  const EDIT = "EDIT"
  
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
      .then(() =>
      transition(SHOW)
      );

    }

    function deleteAppointment() {

      transition(DELETE)
      props.cancelInterview(props.id)
      .then(() => transition(EMPTY));
      }

  return (

    <article className="appointment">
      <Header time={props.time} />
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
      <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={() => transition(CONFIRM)}
            onEdit={() => transition(EDIT)}
          />
      )} 
      {mode=== CREATE && <Form interviewers={props.interviewer} onCancel = {() => back()} onSave= {save}/>}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === CONFIRM && <Confirm onCancel ={() => back()} onConfirm={deleteAppointment}/>}
      {mode === DELETE && <Status message={"Deleting"} />}
      {mode === EDIT && <Form student={props.interview.student} interviewers={props.interviewer} interviewer={props.interview.interviewer.id} onCancel = {() => back()} onSave= {save} />}

    </article>

  );
}