import React from "react";

export default function Error(props) {

  return(
    //Provides Error message when there is an issue in saving/deleting the appointment
    <main className="appointment__card appointment__card--error">
      <section className="appointment__error-message">
        <h1 className="text--semi-bold">Error</h1>
        <h3 className="text--light">{props.message}</h3>
      </section>
      <img
        onClick={props.onClose}
        className="appointment__error-close"
        src="images/close.png"
        alt="Close"
      />
    </main>
  );
}