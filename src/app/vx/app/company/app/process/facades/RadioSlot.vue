<template>
  <div class="facade-radio-slot">
    <div><slot name="title"/></div>
    <checkbox-round :viewType="2"
                    :model="model"
                    :disable="disable"
                    class="radio-slot-checkbox"
                    @onClick="$emit('onClick')"
    />
  </div>
</template>

<script>
import CheckboxRound from "@Facade/Input/Checkbox";

export default {
  name: 'vx.process.facade.radio.slot',
  components: {
    CheckboxRound
  },
  props: {
    model: Boolean,
    disable: Boolean,
  },
}
</script>

<style lang="scss" scoped>
.facade-radio-slot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: rem(12);
  margin-bottom: 8px;
  background: $grey-scale-400;
  border-radius: 12px;
  color: #FFF;
  padding: rem(20) rem(16);
  font-size: rem(15);
  line-height: rem(20);
  .radio-slot-checkbox{
    margin-right: 4px;
  }
}
</style>