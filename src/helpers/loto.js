import _ from 'lodash'

export const calculateTiket = (number, field) => {
  let result
  if (!field.includes(number)) {
    result = [...field, number]
  } else {
    result = field.filter(ele => {
      return ele !== number
    })
  }
  return result
}

export const rendomNumber = (size = 8) => _.shuffle(_.range(1, size))
