import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

export default function DayListItem(props) {

  //console.log("I am DaylistItems props", props);

  const dayListClass = classNames("day-list",
  {"day-list__item":props.name,
  "day-list__item--selected":props.selected,
  "day-list__item--full":props.spots===0
  })

  function formatPost(num) {

    if(num===1) {
      return "1 spot remaining";
    } else if (num===0) {
      return `no spots remaining`;
    } else {
      return `${num} spots remaining`;
    }

  }


  return (
    <li className={dayListClass} onClick={() => props.setDay(props.name)}>
      <h2 > {props.name} </h2> 
      <h3> {formatPost(props.spots)}</h3>
    </li>
  );
}