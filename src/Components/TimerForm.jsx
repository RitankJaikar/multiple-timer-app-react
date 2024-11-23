export default function TimerForm({formData, setFormData, onAddTimer }) {

    function handleSubmit(e) {
        e.preventDefault();
        onAddTimer();
    }

    return (
        <form className="timer-div" id="set-timer-form" onSubmit={handleSubmit}>
            <div>Set Time:</div>
            <div className="timer-wrapper">
                <input type="number" placeholder="hh" min="0" max="99" id="hour" className="time hour" value={formData.hour} onChange={e => setFormData({...formData, hour: e.target.value})} />
                <span>:</span>
                <input type="number" placeholder="mm" min="0" max="59" id="min" className="time min" value={formData.min} onChange={e => setFormData({...formData, min: e.target.value})} />
                <span>:</span>
                <input type="number" placeholder="ss" min="0" max="59" id="sec" className="time sec" value={formData.sec} onChange={e => setFormData({...formData, sec: e.target.value})} />
            </div>
            <button>Set</button>
        </form>
    )
}