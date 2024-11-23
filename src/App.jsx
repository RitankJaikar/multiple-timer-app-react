import { useState } from "react";
import TimerForm from "./Components/TimerForm";
import TimerDisplay from "./Components/TimerDisplay";

function App() {
  const [formData, setFormData]= useState({hour: "", min: "", sec: ""});
  const [timers, setTimers]= useState([]);

  function handleAddTimer() {
    if(formData.hour || formData.min || formData.sec) {
      const totalSeconds = (parseInt(formData.hour || 0))*60*60 + (parseInt(formData.min || 0))*60 + (parseInt(formData.sec || 0));
      //console.log(totalSeconds);
      if(totalSeconds>0) {
        const id= crypto.randomUUID();
        setTimers([...timers, {totalSeconds, id}]);
      }
      setFormData({ hour: "", min: "", sec: "" });
    }
  }

  return (
    <div className="main">
      <h1>Multiple Timers App React</h1>
      <TimerForm formData={formData} setFormData={setFormData} onAddTimer={handleAddTimer} />
      <div className="current-timers">
            Current Timers
      </div>
      {
        timers.length===0 
        ?
        (<p className="para-no-timer">You have no timers currently!</p>)
        :
        (
          timers.map((timer) => {
            return <TimerDisplay key={timer.id} timer={timer} setTimers={setTimers} />
          })
        )
      }
    </div>
  )
}

export default App;