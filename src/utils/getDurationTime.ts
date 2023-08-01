
function getDurationTime(duration: number) {
  const minutes = Math.floor(duration/60000)
  const seconds = duration % 60
  return `0${minutes}:${seconds}`
}

export default getDurationTime