export const formatTime = (date: string) => {
  const dateObj = new Date(date)
  // Convert to Japan time (UTC+9)
  const jpDate = new Date(dateObj.getTime() + (9 * 60 * 60 * 1000))
  const hours = jpDate.getHours()
  const minutes = jpDate.getMinutes()
  return `${hours}:${minutes.toString().padStart(2, '0')}`
}