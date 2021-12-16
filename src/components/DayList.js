import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {

  const eachDay = (props.days).map(day => <DayListItem key={day.id} {...day} setDay={props.onChange} selected={props.value===day.name? true : false} />)

  return (
    <ul> {eachDay} </ul>
  );

};