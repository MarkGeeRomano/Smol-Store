function createDispatch(state, reducers) {
  const mapped = Object.keys(state).map(property => ({ property, reducer: reducers[property] }))
  return (load) => {
    const newState = mapped.reduce((newState, { property, reducer }) => {
      const updatedState = Object.assign(newState, { [property]: reducer(newState[property], load) })
      return updatedState
    }, state)

    Object.values(global.smolStore.subscribers).forEach(renderer => renderer.webContents.send(global.smolStore.kRefresh))

    return newState
  }
}

module.exports = createDispatch