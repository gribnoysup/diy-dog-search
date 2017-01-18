export const scrollTop = () => (window.pageYOffset || document.scrollTop || 0) - (document.clientTop || 0)

// toFixedFloat(1234.5678, 2) -> 1234.57
export const toFixedFloat = (number = 0, decimalCount = 0) => Math.round(number * Math.pow(10, decimalCount)) / Math.pow(10, decimalCount)
