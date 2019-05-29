const mutations = {
  setHeart (state, hertInfo) {
    state.heart = hertInfo
  },
  setBlood (state, bloodInfo) {
    state.blood = bloodInfo
  },
  setStep (state, stepInfo) {
    state.step = stepInfo
  },
  setDevicePosition (state, position) {
    state.devicePosition = position
  },
  setCurrentDevice (state, device) {
    state.currentDevice = device
  },
  setUser (state, user) {
    state.user = user
  }
}

export default mutations
