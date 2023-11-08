import React, { useState, useEffect } from "react";

function Timer() {
  // 초기 상태를 10초로 설정합니다.
  const [secondsLeft, setSecondsLeft] = useState(10);
  const [isActive, setIsActive] = useState(false);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setSecondsLeft(10);
    setIsActive(false);
  };

  useEffect(() => {
    let interval = null;

    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((seconds) => seconds - 1);
      }, 1000);
    } else if (!isActive && secondsLeft !== 0 && interval) {
      clearInterval(interval);
    }

    if (secondsLeft === 0) {
      resetTimer();
      alert("시간이 종료되었습니다!");
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, secondsLeft]);

  const formatTime = () => {
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <div>
      <p>{formatTime()}</p>
      <button onClick={toggleTimer}>{isActive ? "정지" : "시작"}</button>
      <button onClick={resetTimer}>리셋</button>
    </div>
  );
}

export default Timer;
