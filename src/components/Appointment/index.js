import React from "react";
import "components/Appointment/styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import useVisualMode from "hooks/useVisualMode";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

export default function Appointment(props) {
  //console.log("Appointment props", props);
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETE = "DELETE";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  
  //Setting initial value for mode
  const { mode, transition, back } = useVisualMode(
      props.interview ? SHOW : EMPTY
     );

  function save (name, interviewer) {
    // console.log("Save function ", name, interviewer);
    const interview = {
        student: name,
        interviewer
      }
      transition(SAVING);
      props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true))

    }

    function deleteAppointment() {

      //Adding true to replace the mode with transition
      transition(DELETE, true); 
      props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true))
      }

  return (

    <article className="appointment">
      {/*Adding modes as the values in appointment  */}

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
      {mode === ERROR_SAVE && <Error message={"Server could not SAVE the Appointment"} onClose={() => back()}/>}
      {mode === ERROR_DELETE && <Error message={"Server could not DELETE the Appointment"} onClose={() => back()}/>}

    </article>

  );
}