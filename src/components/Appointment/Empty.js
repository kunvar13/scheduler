import React from "react";


export default function Empty(props){

  return(
    //form in its ideal state
    <main className="appointment__add">
      <img
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={props.onAdd}
      />
    </main>
  );
}