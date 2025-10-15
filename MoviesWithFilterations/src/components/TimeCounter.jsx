import React, { useEffect, useState } from 'react'

export default function TimeCounter() {
      const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return (
    <div className='timer'>
       ⏱️ Time on site: {minutes.toString().padStart(2, "0")}:{remainingSeconds.toString().padStart(2, "0")}
    </div>
  )
}
