<template>
	<div class="mapCard posr" :class="'mapCard-' + TYPE" ref="mapCard">
		<div class="title">{{ NAME }}</div>
		<div class="body">
			{{ ADDRESS }}
		</div>
	</div>
</template>

<script>
export default {
	name: 'mapCard',
	data() {
		return {}
	},
	props: {
		// 标题
		NAME: { type: String, default: '社区/村名称' },
		// 内容
		ADDRESS: { type: [String, Number], default: '东莞市大岭山' },
	},
	methods: {
		close(v) {
			window.$blurMarker()
		},
	},
}
</script>

<style lang='scss' scoped>
.mapCard {
	padding: rem(0) rem(35) rem(40) rem(35);
	display: flex !important;
	flex-direction: column;
	@include bg(rem(266), rem(132), './assets/林区弹框.png');
	color: #fff;

	.title {
		padding-left: rem(30);
		height: rem(30);
		line-height: rem(32);
		font-size: rem(16);
	}

	.body {
		flex: 1;
		@include flex(s, c);
		padding-left: rem(30);
	}
}
</style>
