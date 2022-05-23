<template>
  <div 
		class="button-switch"
		:class="{'on': switchNotify}"
		@click="$emit('change-switch')"
	>
    <div class="button-round"></div>
  </div>
</template>

<script>
  export default {
    name: 'Facade.Button.Switch',
		props: {
      switchNotify: Boolean,
    },
  }
</script>


<style lang="scss" scoped>
.button-switch {
	box-sizing: border-box;
	display: flex;
	padding: rem(2);
	width: 36px;
	border-radius: 16px;
	background-color: rgba(130, 150, 170, 0.2);
	cursor: pointer;
	transition: all .2s;
	.button-round {
		height: 16px;
		width: 16px;
		border-radius: 50%;
		background-color: #fff;
	}
	&.on {
		background-color: $blue;
		justify-content: flex-end;
	}
}
</style>