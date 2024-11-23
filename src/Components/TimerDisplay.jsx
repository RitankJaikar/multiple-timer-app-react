import { useEffect, useRef, useState } from "react";

export default function TimerDisplay({timer, setTimers}) {
    const [timerInSec, setTimerInSec]= useState(timer.totalSeconds);
    const intervalRef = useRef(null); // Reference to store the interval ID
    const audio= useRef(new Audio("https://cdn.uppbeat.io/audio-files/13a6d3c9e914de5ab3fb451786993718/4e02f27c587347d1a09a4e08032cac08/bc76aea3e026e422ae25b2553b1a479b/STREAMING-alarm-danger-alert-big-smartsound-fx-1-00-24.mp3"));
    const hourValue= Math.floor(timerInSec/(60*60));
    const minValue= Math.floor((timerInSec%(60*60))/60); // inSec%(60*60)- Remaining seconds after extracting hours
    const secValue= Math.floor(timerInSec%60); // Remaining seconds
    //console.log(hourValue, minValue, secValue, timer);

    function handleDelete() {
        clearInterval(intervalRef.current);
        audio.current.pause();
        audio.current.currentTime= 0;
        setTimers(timers => {
            return timers.filter((t) => t.id!==timer.id);
        })
    }

    useEffect(() => {
        intervalRef.current= setInterval(() => {
            setTimerInSec(prevTimer => {
                if(prevTimer===0) {
                    audio.current.play();
                    clearInterval(intervalRef.current);
                    return 0;
                }
                return prevTimer-1;
            });
        } , 1000);
        // Cleanup on unmount or timer change
        return () => clearInterval(intervalRef.current);
    }, []);

    return timerInSec===0 ?
        (<div className="timer-div time-up-div">
            <span className="time-up">Time Is Up 🔊</span>
            <button className="stop" onClick={handleDelete}>Stop</button>
        </div>)
        :
        (<div className="timer-div">
            <div>Time Left:</div>
            <div className="timer-wrapper">
                <span className="time hour">{String(hourValue).padStart(2, '0')}</span>
                <span>:</span>
                <span className="time min">{String(minValue).padStart(2, '0')}</span>
                <span>:</span>
                <span className="time sec">{String(secValue).padStart(2, '0')}</span>
            </div>
            <button className="delete-btn" onClick={handleDelete}>Delete</button>
        </div>)
}