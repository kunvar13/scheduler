import { useState } from "react";

export default function useVisualMode(initial) {

  const[mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  //console.log("history", history);
  let newHistory = [...history];

  function transition(next, replace) {
    if (replace) {
      newHistory.pop();
      newHistory.push(next);
      //console.log("replace",newHistory);
      setHistory([...newHistory]);
      setMode(newHistory[newHistory.length - 1])
      return {transition};

    } if (!replace){
      newHistory = [...history,next]
      //console.log("no replace", newHistory)
    setHistory(newHistory)
    setMode(next);
    return { transition };
    }
  }
  
  function back () {
    if(history.length < 2) {

      return;
    }
    const historyBack = [...history];
    historyBack.pop();
    //console.log("historyBack", historyBack);
    setHistory([...historyBack]);
    setMode(historyBack[historyBack.length-1]);
    return { back };
  }
  return {mode, transition, back};
  
};