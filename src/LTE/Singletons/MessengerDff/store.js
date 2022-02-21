import SenderScene from "./SenderScene/store";
import ToolsScene from "./ToolsScene/store";

export default {
  namespaced: true,
  state: {
    status: false
  },
  getters: {
    status: (state) => state.status
  },
  mutations: {
    show: (state) => state.status = true,
    close: (state) => state.status = false,
  },

  modules: {
    SenderScene,
    ToolsScene
  }
}