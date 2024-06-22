export const roundToNearestHalf = (weight, percentage) => {

    const value = weight * (percentage / 100)
    const roundedValue = Math.round(value * 2) / 2
    return roundedValue
}