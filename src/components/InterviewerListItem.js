import React from "react";
import classNames from "classnames";
import "components/InterviewerList"
import "components/InterviewerListItem.scss"


export default function InterviewerListItem(props) {

  const Interviwer = classNames("interviewers",
  {
    "interviewers__item": props.id,
    "interviewers__item-image": props.avatar,
    "interviewers__item--selected": props.selected
})

 return (
  <li className={Interviwer} onClick={props.setInterviewer}>
      <img className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
  </li>
  );

}