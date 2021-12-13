import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss"


export default function InterviewerList(props) {

  console.log("I am interviewer props from interviewList", props);

  const Interviewer = (props.interviewers).map(interviewer =><InterviewerListItem 
    key={interviewer.id} 
    {...interviewer} 
    setInterviewer= {() => props.onChange(interviewer.id)} 
    selected={interviewer.id===props.value} />);


  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list"> {Interviewer} </ul>
    </section>
  );

}