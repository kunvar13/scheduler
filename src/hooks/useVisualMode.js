import { useState } from "react";

export default function useVisualMode(initial) {

  const[mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(next, replace) {
    if (replace) {

      const newHistoryWithReplace = [...history.slice(0,-1), next]
      console.log("newHistoryWithReplace", newHistoryWithReplace)
      setHistory(newHistoryWithReplace);
      setMode(next);

    } if (!replace){
    const newHistoryNoReplace = [...history,next]
    setHistory(newHistoryNoReplace)
    setMode(next);
    }
  }
  
  function back () {
    if(history.length < 2) {

      return;
    }
    const historyBack = history.splice(history.length-1);
    setHistory(history);
    const newMode = history[history.length-1];
    console.log("newMode", newMode)
    setMode(newMode);
  }


  return {mode, transition, back};
  
}