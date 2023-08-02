
function formatTime(currentTime: number) {
  let num = currentTime.toFixed(0)
  const minutes = Math.floor(Number(num)/60)
  const seconds = Number(num) % 60
  return `0${minutes}:${seconds < 10 ? '0'+seconds : seconds}`
}

export default formatTime