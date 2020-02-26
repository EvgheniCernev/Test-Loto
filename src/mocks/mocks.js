export const fakeApi = (url, params) =>
  new Promise((res, rej) => {
    const { firstField, secondField } = params.body
    if (firstField.length === 8 && secondField.length === 1) {
      setTimeout(() => {
        res({ status: 200 })
      }, 300)
    } else {
      setTimeout(() => {
        rej({ status: 304 })
      }, 300)
    }
  })
