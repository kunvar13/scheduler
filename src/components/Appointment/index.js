import React from "react";
import "components/Appointment/styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

export default function Appointment(props) {

  console.log("I am Appointment props", props);


  return (

    <article className="appointment">
      <Header time={props.time} />
      {props.interview ? <Show interview={props.interview}/>:<Empty/>}

    </article>

  );
}