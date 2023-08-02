
function getDurationTime(duration: number) {
  // 179226
  const minutes = Math.floor(duration/60000)
  const seconds = Math.floor(duration/1000) % 60
  return `0${minutes}:${seconds < 10 ? '0'+seconds : seconds}`
}

export default getDurationTime