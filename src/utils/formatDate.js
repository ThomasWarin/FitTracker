export const formatDateFR = (dateString) => {
    const dateObject = new Date(dateString)
    const options = { day: '2-digit', month: '2-digit', year: '2-digit' }
    return dateObject.toLocaleDateString('fr-FR', options)
}

export const formatDateISO = (dateString) => {
    const dateParts = dateString.split('/')
    const year = `20${dateParts[2]}`
    const month = dateParts[1]
    const day = dateParts[0]
    return `${year}-${month}-${day}`
}