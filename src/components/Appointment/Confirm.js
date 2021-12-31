import React from "react";
import Button from "components/Button";

export default function Confirm(props) {


  return(

    //brings the confirmation window befor deleting

    <main className="appointment__card appointment__card--confirm">
        <h1 className="text--semi-bold">Are you sure you would like to delete?</h1>
        <section className="appointment__actions">
          <Button onClick={props.onCancel} danger>Cancel</Button>
          <Button onClick={props.onConfirm} danger>Confirm</Button>
        </section>
    </main>

  );
}