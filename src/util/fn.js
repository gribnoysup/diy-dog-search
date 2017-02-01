export const scrollTop = () => (window.pageYOffset || document.scrollTop || 0) - (document.clientTop || 0)

// toFixedFloat(1234.5678, 2) -> 1234.57
export const toFixedFloat = (number = 0, decimalCount = 0) => Math.round(number * Math.pow(10, decimalCount)) / Math.pow(10, decimalCount)

export function getGallons({unit, value}) {
  switch (unit) {
    case 'liters':
      return (value * 0.264172).toFixed(2)
    case 'gallons':
    default:
      return (value).toFixed(2)
  }
}

export function getLbs({unit, value}) {
  switch (unit) {
    case 'kilograms':
      return (value * 2.20462).toFixed(2)
    case 'lbs':
    default:
      return (value).toFixed(2)
  }
}

export function getFarenheit({unit, value}) {
  switch (unit) {
    case 'celsius':
      return (value * 1.8 + 32).toFixed(2)
    case 'farenheit':
    default:
      return (value).toFixed(2)
  }
}
