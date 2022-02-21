export default {
  props: {
    unitLevel: {
      type: Number,
      default: () => 0
    },
    unitData: {
      type: Object,
      validator: (data) => {
        return data !== null
          && (typeof data.avatar === "string" || data.avatar === null)
          && typeof data.id === "number"
          && typeof data.name === "string"
          && typeof data.lastname === "string";
      }
    },
    unitPosition: String,
  },
}