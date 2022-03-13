<template>
	<div class="layer_wrap" v-if="status == 'show'">
		<div class="layer__mask" @click="hide"></div>
		<div class="layer">
		</div>
	</div>
</template>

<script>
export default {
	name: 'layer',
	data() {
		return {
			status: 'show',
		}
	},
	methods: {
		show() {
			this.status = 'show'
		},
		hide() {
			this.status = 'hide'
		},
	},
	components: {},
	computed: {},
	watch: {},
	props: [],
}
</script>

<style lang="scss" scoped>
.layer_wrap {
	@include pfull();
	z-index: 1993100337;
}

.layer__mask {
	@include pfull();
	z-index: 1;
	background: rgba(255, 255, 255, 0.25);
}

.layer {
	@include bg(rem(499), rem(365), './assets/layerbg.png');
	@include center;
	z-index: 2;
	color: #fff;
}
</style>
