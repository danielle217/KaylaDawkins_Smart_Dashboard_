import React, { useState, useEffect } from 'react';

function Clock() {
    const [time, setTime] = useState(new Date());
    
    // Update time every second
    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);
    
    return (
        <div className="card">
            <h2>Live Clock</h2>
            <p className="clock-time">{time.toLocaleTimeString()}</p>
            <p className="clock-date">{time.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
    );
}

export default Clock;