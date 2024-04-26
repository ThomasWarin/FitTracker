export const formatDateFR = (dateString) => {
    const dateObject = new Date(dateString)
    const options = { day: 'numeric', month: '2-digit', year: '2-digit' }
    return dateObject.toLocaleDateString('fr-FR', options)
}