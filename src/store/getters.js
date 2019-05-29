const getters = {
  getHeart (state) {
    return state.heart
  },
  getBlood (state) {
    return state.blood
  },
  getStep (state) {
    return state.step
  },
  getDevicePosition (state) {
    return state.devicePosition
  },
  getCurrentDevicen (state) {
    return state.currentDevice.wearerDeviceId
  },
  getUser (state) {
    return state.user
  }
}

export default getters
