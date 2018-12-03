module.exports = (state, load) => {
  switch (load.type) {
    case 'ADD_1':
      state += 1
      break
    case 'ADD_2':
      state += 2
      break
    case 'ADD_3':
      state += 3
      break
    default:
      state += load.value
  }
  return state
}