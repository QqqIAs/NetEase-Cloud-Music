function convertTimeToSeconds(timeString) {
  const [minutesStr, secondsStr] = timeString.split(':');
  const [secondsPart, millisecondsPart] = secondsStr.split('.');
  
  const minutes = parseInt(minutesStr, 10);
  const seconds = parseInt(secondsPart, 10);
  const milliseconds = parseInt(millisecondsPart, 10);
  
  const totalSeconds = minutes * 60 + seconds + milliseconds / 1000;
  return Number(totalSeconds.toFixed(2)); // 返回保留两位小数的秒数
}

export default convertTimeToSeconds