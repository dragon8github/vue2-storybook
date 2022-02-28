<template>
	<div class="Layer">
        Layer
    </div>
</template>

<script>
export default {
	name: 'Layer',
	data() {
		return {
			items: [],
			keyword: '',
			active: -1,
		}
	},
	methods: {
		go() {
			console.log('go')
		},
	},
	components: {},
	computed: {},
	watch: {},
	props: [],
	beforeMount() {},
}
</script>

<style lang='scss' scoped>
@import './Layer.scss';
.Layer {
}
</style>
