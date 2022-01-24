<template>
  <div class="singleton-messenger-contacts">
    <title-caps>
      <slot name="title"/>
      <span class="contacts-amount"><slot name="amount"/></span>
    </title-caps>
    <icon-add/>
  </div>
</template>

<script>
import TitleCaps from '@Facade/Title/Caps'
import IconAdd from '@Icon/Add'

export default {
  name: 'Singleton.Messenger.Contacts',
  components: {
    TitleCaps,
    IconAdd,
  }
}
</script>

<style lang="scss" scoped>
  .singleton-messenger-contacts{
    width: 100%;
    padding: 4px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: $grey;
    .contacts-amount{
      padding: 0 rem(3);
      color: $blue;
    }
    .icon-add{
      height: 24px;
      width: 24px;
      display: inherit;
      justify-content: center;
      align-items: center;
      color: #fff;
      background-color: $grey-scale-400;
      border-radius: 8px;
      cursor: pointer;
    }
  }
</style>