export default {
  props: {
    selectedDate: {
      type: Date,
      default: () => new Date()
    },
  }
}