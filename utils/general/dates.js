const formatDate = (dateString) => {
  const date = new Date(dateString)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")

  return `${day}-${month}-${year}`
}

const formattedDateToValidDate = (date) => {
  const [day, month, year] = date.split("-")
  return new Date(`${year}/${month}/${day}`)
}

module.exports = {
  formatDate: formatDate,
  formattedDateToValidDate: formattedDateToValidDate
}
