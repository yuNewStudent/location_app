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
  }
}

export default mutations
